import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import userRoutes from './routes/user.js';
import reviewRoutes from './routes/reviews.js';
import { prseMongoValidationErr } from './helpers/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDb...');
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN);
  res.set('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);
  res.set('Access-Control-Allow-Methods', [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
  ]);
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth/user', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/products/:id/reviews', reviewRoutes);

// ---------------------Catch All Route---------------------------------------
app.get('*', (req, res, next) => next(new ServerError('Bad Request!', 400)));

// ---------------------Error Handler---------------------------------------
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') err = prseMongoValidationErr(err);
  if (err.name === 'TokenExpiredError') err = new ServerError(err.message, 401);
  // default statuCode set to 500
  const { message, statusCode = 500, errors } = err;
  res.status(statusCode).json({ message, statusCode, errors });
});

app.listen(PORT, () => {
  console.log(`Server Started At Port: ${PORT}`);
});
