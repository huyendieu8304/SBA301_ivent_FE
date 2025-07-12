const PATH_URL = "/api/v1";
const PATH_AUTH_URL = PATH_URL + "/auth";
const PATH_EVENT_PUBLIC_URL = PATH_URL + "/event/public";
const PATH_OPERATOR = PATH_URL + "/operator";
export const url = {
    login: PATH_AUTH_URL + "/login",
    logout: PATH_AUTH_URL + "/logout",
    registerUser: PATH_URL + "/register-user",
    validateEmailToken: PATH_URL + "/validate-email-token",
    resendEmailToken: PATH_URL + "/resend-validate-email-token",
    userProfile: PATH_URL + "/profile",
    updateProfile: PATH_URL + "/update-profile",
    getEventDetails: (id) => PATH_EVENT_PUBLIC_URL + `/${id}`,
    operatorEvent : PATH_OPERATOR + "/event",
    getOperatorEventDetails: (id) => PATH_OPERATOR + "/event"+ `/${id}`,
};
