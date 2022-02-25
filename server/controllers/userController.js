import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Token from '../models/Token.js';
import { successRes } from '../helpers/index.js';
import ServerError from '../helpers/class/ServerError.js';
import userSchema from '../validation/userSchema.js';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  COOKIE_EXPIRY,
  generateTokenPayload,
} from '../config/token.config.js';

export const register = async (req, res) => {
  const { value, error } = userSchema.validate(req.body);
  if (error) throw new ServerError('Validation Error Occurred', 422, error);
  const foundUser = await User.findOne({ email: value.email });
  if (foundUser) throw new ServerError('Email already in use!', 422);
  const user = new User(value);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(value.password, salt);
  const newUser = await user.save();
  newUser.password = undefined;
  const tokenPayload = generateTokenPayload({
    userId: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  });
  const accessToken = await jwt.sign(tokenPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = await jwt.sign(tokenPayload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  await Token.create({ refreshToken, user: newUser._id });
  res
    .status(201)
    .cookie('refresh_token', refreshToken, {
      httpOnly: true,
      expires: COOKIE_EXPIRY,
      sameSite: 'none',
      secure: true,
    })
    .json(
      successRes('Registration successful', res.statusCode, {
        accessToken,
        expiresIn: ACCESS_TOKEN_EXPIRY,
      })
    );
};

export const login = async (req, res) => {
  const { value, error } = userSchema.validate(req.body);
  if (error) throw new ServerError('Validation Error Occurred', 422, error);
  const { email, password } = value;
  const foundUser = await User.findOne({ email });
  if (!foundUser) throw new ServerError('Email doesnot exist!', 404);
  const comparePassword = await bcrypt.compare(password, foundUser.password);
  if (!comparePassword) throw new ServerError('Incorrect password!', 422);
  foundUser.password = undefined;
  const tokenPayload = generateTokenPayload({
    userId: foundUser._id,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
  });
  const accessToken = await jwt.sign(tokenPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  await Token.deleteMany({ user: foundUser._id });
  const refreshToken = await jwt.sign(tokenPayload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  await Token.create({ refreshToken, user: foundUser._id });
  res
    .status(200)
    .cookie('refresh_token', refreshToken, {
      httpOnly: true,
      expires: COOKIE_EXPIRY,
      sameSite: 'none',
      secure: true,
    })
    .json(
      successRes('Login successful', res.statusCode, {
        accessToken,
        expiresIn: ACCESS_TOKEN_EXPIRY,
      })
    );
};

export const generateAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) throw new ServerError('Unauthorized', 401);
  await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  const foundRefreshToken = await Token.findOne({ refreshToken });
  if (!foundRefreshToken) throw new ServerError('Token Not Found', 404);
  const foundUser = await User.findById(foundRefreshToken.user);
  if (!foundUser) throw new ServerError('User not found!', 404);
  const tokenPayload = generateTokenPayload({
    userId: foundUser._id,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
  });
  const accessToken = await jwt.sign(tokenPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  res.status(201).json(
    successRes('Success', res.statusCode, {
      accessToken,
      expiresIn: ACCESS_TOKEN_EXPIRY,
    })
  );
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) throw new ServerError('Bad Request', 400);
  await Token.findOneAndDelete({ refreshToken: req.cookies.refresh_token });
  res
    .status(200)
    .clearCookie('refresh_token')
    .json(successRes('Success', res.statusCode));
};
