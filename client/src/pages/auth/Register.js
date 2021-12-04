import React from "react";
import { Link } from "react-router-dom";

import { register } from "../../actions/user";
import AuthLayout from "../../components/layouts/AuthLayout";
import Field from "../../components/misc/Field";
import useAuthForm from "../../hooks/useAuthForm";
import "./Register.css";

const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    errors: {},
};

const Register = () => {
    const { formValues, onChange, onSubmit } = useAuthForm(initialState, register);
    const { email, password, firstName, lastName, errors } = formValues;
    return (
        <AuthLayout title="register" message="Already a member?" btnText="Sign In" btnLink="/auth/login">
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="Register__group">
                    <Field label="First Name" name="firstName" value={firstName} onChange={onChange} error={errors ? errors.firstName : null} />
                    <Field label="Last Name" name="lastName" value={lastName} onChange={onChange} error={errors ? errors.lastName : null} />
                </div>
                <Field label="Email" name="email" value={email} onChange={onChange} error={errors ? errors.email : null} />
                <Field label="Password" name="password" value={password} onChange={onChange} type="password" error={errors ? errors.password : null} />
                <p className="Register__terms">
                    By creating an account you agree to the{"  "}
                    <Link className="Register__link" to="/">
                        Terms and Conditions
                    </Link>
                </p>
                <button className="PrimaryBtn">sign up</button>
            </form>
        </AuthLayout>
    );
};

export default Register;
