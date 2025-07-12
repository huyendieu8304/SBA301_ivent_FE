const PATH_URL = "/api/v1";
const PATH_AUTH_URL = PATH_URL + "/auth";
const PATH_EVENT_PUBLIC_URL = PATH_URL + "/event/public";
const PATH_ADMIN = PATH_URL + "/admin";
const PATH_CATEGORY = PATH_URL + "/category";
const PATH_MY_EVENT = PATH_URL + "/event/my-event";
const PATH_PAYMENT = PATH_URL + "/payment";

const PATH_OPERATOR = PATH_URL + "/operator";
export const url = {
    //AUTHENTICATE + user information
    login: PATH_AUTH_URL + "/login",
    logout: PATH_AUTH_URL + "/logout",
    registerUser: PATH_URL + "/register-user",
    validateEmailToken: PATH_URL + "/validate-email-token",
    resendEmailToken: PATH_URL + "/resend-validate-email-token",
    userProfile: PATH_URL + "/profile",
    updateProfile: PATH_URL + "/update-profile",
    forgotPasswordRequest: PATH_URL + "/forgot-password",
    setPassword: PATH_URL + "/set-password",

    //EVENT - USER dùng
    getMyEvents: (id, page = 0, size = 10) =>
        `${PATH_URL}/event/my_events/${id}?page=${page}&size=${size}`,
    getEventDetails: (id) => PATH_EVENT_PUBLIC_URL + `/${id}`,
    getEventAndTicketTypeDetails: (id) => PATH_URL+`/event/event-and-ticket-details/${id}`,
    createEvent: PATH_MY_EVENT + "/create",

    //EVENT - OPERATOR
    adminEvent : PATH_ADMIN + "/event",
    getAdminEventDetails: (id) => PATH_ADMIN + "/event"+ `/${id}`,

    //USER - ADMIN

    //PAYMENT
    payment: PATH_PAYMENT+"/vn-pay",
    getPaymentDetails: (txnRefCode) => PATH_PAYMENT + `/get-payment-details/${txnRefCode}`,
    operatorEvent : PATH_OPERATOR + "/event",
    getOperatorEventDetails: (id) => PATH_OPERATOR + "/event"+ `/${id}`,
};

    //COMMON
    getCategories: PATH_CATEGORY + "/",
};