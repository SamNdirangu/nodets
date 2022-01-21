import errorsCustom from "../utils/errors/errors.custom";

const validateEmail = (email: string) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const validateEmailandPasswordExists = (email: string, password: string) => {
    if (!email || !password)
        throw new errorsCustom.BadRequest('Please provide email and password');
    return;
};

export default {
    validateEmail,
    validateEmailandPasswordExists
};