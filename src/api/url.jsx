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
    changePassword: PATH_URL + "/change-password",
    //EVENT - USER dùng
    searchEvent: PATH_EVENT_PUBLIC_URL + "/search",
    getMyEvents: (id, page = 0, size = 10) =>
        `${PATH_URL}/event/my_events/${id}?page=${page}&size=${size}`,
    getEventDetails: (id) => PATH_EVENT_PUBLIC_URL + `/${id}`,
    getEventAndTicketTypeDetails: (id) => PATH_URL+`/event/event-and-ticket-details/${id}`,
    createEvent: PATH_MY_EVENT + "/create",
    getMyTickets: (accountId, page = 0, size = 10) =>
        `${PATH_URL}/ticket/my_tickets/${accountId}?page=${page}&size=${size}`,
    getTicketDetail: (paymentId) =>
        `${PATH_URL}/ticket/detail/${paymentId}`,
    getMyEventDetail: (id) => `${PATH_MY_EVENT}/${id}`,
    updateMyEventDetail: PATH_MY_EVENT,

    //EVENT - OPERATOR  
    operatorEvent: (page = 0, size = 10)=> `${PATH_OPERATOR}/event?page=${page}&size=${size}`,
    operatorEventDetails: (eventId) => PATH_OPERATOR +`/${eventId}`,
    pendingEvent: ( page = 0, size = 10) => `${PATH_OPERATOR}/approve?page=${page}&size=${size}`,
    updateEventStatus: (eventId, status) => PATH_OPERATOR + `/${eventId}/status?status=${status}`,
    getProvinceStatistic: PATH_OPERATOR + "/by-province",
    getStatusStatistic: PATH_OPERATOR + "/by-status",
    getMonthStatistic: PATH_OPERATOR + "/by-month",
    getCategoryStatistic: PATH_OPERATOR + "/by-category",

    // ADMIN
    adminAccount: ( page = 0, size = 10)=> `${PATH_ADMIN}/account?page=${page}&size=${size}`,
    getRoleStatistic: PATH_ADMIN + "/by-role",
    getStatusAccountStatistic: PATH_ADMIN + "/by-status",
    getOrganizerStatistic: PATH_ADMIN + "/organizer-event-count",
    getPaymentStatistic: PATH_ADMIN + "/total-payment-by-account",
    createAdminAccount: PATH_ADMIN + "/create",
    banUser: "/api/v1/admin/ban",
    getUserAccounts: "/api/v1/admin/users-ban-list",

    //PAYMENT
    payment: PATH_PAYMENT+"/vn-pay",
    getPaymentDetails: (txnRefCode) => PATH_PAYMENT + `/get-payment-details/${txnRefCode}`,

    //COMMON
    getCategories: PATH_CATEGORY + "/",
    getHomePageData: PATH_EVENT_PUBLIC_URL + `/home`,
};