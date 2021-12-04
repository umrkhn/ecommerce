import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authValidation from "../validation/authValidation";

const useAuthForm = (initialState, ac) => {
    const [formValues, setFormValues] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        const errors = authValidation({ [name]: value });
        const newErrors = { ...formValues.errors, ...errors };
        if (!errors[name]) delete newErrors[name];
        setFormValues({ ...formValues, [name]: value, errors: newErrors });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        delete formValues.errors;
        const errors = authValidation(formValues);
        if (Object.keys(errors).length) return setFormValues({ ...formValues, errors });
        dispatch(ac(formValues, navigate));
    };
    return {
        formValues,
        onChange,
        onSubmit,
    };
};

export default useAuthForm;
