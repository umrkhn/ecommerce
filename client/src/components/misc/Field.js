import React from "react";
import { ErrorIcon } from "../../assets/icon";
import "./Field.css";

const Field = ({ label, value, onChange, name, type = "text", error }) => {
    const labelClass = error ? "Field__label Field__label--error" : "Field__label";
    const inputClass = error ? "Field__input Field__input--error" : "Field__input";

    return (
        <div className="Field">
            <div className="Field__header">
                <label className={labelClass} htmlFor={name}>
                    {label}
                </label>
                {error ? <p className="Field__message">{error}</p> : null}
            </div>
            {error ? <ErrorIcon className="Field__icon" color="#ee4266" /> : null}
            <input name={name} className={inputClass} type={type} id={name} value={value} onChange={(e) => onChange(e)} autoComplete="off" />
        </div>
    );
};

export default Field;
