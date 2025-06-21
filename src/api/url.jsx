const PATH_URL = "/api/v1";
const PATH_AUTH_URL = PATH_URL + "/auth";

export const url = {
    login: PATH_AUTH_URL + "/login",
    logout: PATH_AUTH_URL + "/logout",
    registerUser: PATH_URL + "/register-user",
    validateEmailToken: PATH_URL + "/validate-email-token",
    resendEmailToken: PATH_URL + "/resend-validate-email-token",
};