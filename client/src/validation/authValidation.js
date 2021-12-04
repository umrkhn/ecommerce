const authValidation = (formValues) => {
    const { email, password, firstName, lastName } = formValues;
    const errors = {};
    for (const key in formValues) {
        if (formValues[key].length === 0) errors[key] = "Required";
    }
    if (email && email.length >= 1) {
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z]+\.)+[a-zA-Z]{2,})$/;
        if (!emailRegEx.test(email)) errors.email = "Must be valid";
    }

    if (password && password.length >= 1) {
        if (!/^[a-zA-Z0-9]{8,30}$/.test(password)) errors.password = "Can only contain alphanumeric characters";
        if (password.length < 8) errors.password = "Must be 8 characters or more";
        if (password.length > 30) errors.password = "Must not exceed 30 characters";
    }

    if (firstName && firstName.length >= 1) {
        if (!/^[a-zA-Z]{3,20}$/.test(firstName)) errors.firstName = "Can only contain alphabets";
        if (firstName.length < 3) errors.firstName = "Must be 3 characters or more";
        if (firstName.length > 20) errors.firstName = "Must not exceed 20 characters";
    }

    if (lastName && lastName.length >= 1) {
        if (!/^[a-zA-Z]{3,20}$/.test(lastName)) errors.lastName = "Can only contain alphabets";
        if (lastName.length < 3) errors.lastName = "Must be 3 characters or more";
        if (lastName.length > 20) errors.lastName = "Must not exceed 20 characters";
    }
    return errors;
};

export default authValidation;
