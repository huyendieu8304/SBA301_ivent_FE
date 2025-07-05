const PATH_URL = "/api/v1";
const PATH_AUTH_URL = PATH_URL + "/auth";
const PATH_EVENT_PUBLIC_URL = PATH_URL + "/event/public";
const PATH_ADMIN = PATH_URL + "/admin";
const PATH_CATEGORY = PATH_URL + "/category";
const PATH_MY_EVENT = PATH_URL + "/event/my-event";

export const url = {
    login: PATH_AUTH_URL + "/login",
    logout: PATH_AUTH_URL + "/logout",
    registerUser: PATH_URL + "/register-user",
    validateEmailToken: PATH_URL + "/validate-email-token",
    resendEmailToken: PATH_URL + "/resend-validate-email-token",

    userProfile: PATH_URL + "/profile",
    updateProfile: PATH_URL + "/update-profile",

    getMyEvents: (id, page = 0, size = 10) =>
        `${PATH_URL}/event/my_events/${id}?page=${page}&size=${size}`,
    getEventDetails: (id) => PATH_EVENT_PUBLIC_URL + `/${id}`,
    createEvent: PATH_MY_EVENT + "/create",

    adminEvent : PATH_ADMIN + "/event",
    getAdminEventDetails: (id) => PATH_ADMIN + "/event"+ `/${id}`,

    getCategories: PATH_CATEGORY + "/",
};