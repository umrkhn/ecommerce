import React from "react";
import { Link } from "react-router-dom";

import { login } from "../../actions/user";
import AuthLayout from "../../components/layouts/AuthLayout";
import Field from "../../components/misc/Field";
import useAuthForm from "../../hooks/useAuthForm";
import "./Login.css";

const initialState = {
    email: "",
    password: "",
    errors: {},
};

const Login = () => {
    const { formValues, onChange, onSubmit } = useAuthForm(initialState, login);
    const { email, password, errors } = formValues;

    return (
        <AuthLayout title="login" message="Not a member?" btnText="Sign Up" btnLink="/auth/register">
            <form onSubmit={(e) => onSubmit(e)}>
                <Field label="Email" name="email" value={email} onChange={onChange} error={errors ? errors.email : null} />
                <Field label="Password" name="password" value={password} onChange={onChange} type="password" error={errors ? errors.password : null} />
                <div className="Login__group">
                    <button className="PrimaryBtn">Login</button>
                    <Link className="Login__link" to="/auth/forgot">
                        Forgot Password
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
