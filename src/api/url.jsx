const PATH_URL = "/api/v1";
const PATH_AUTH_URL = PATH_URL + "/auth";
const PATH_EVENT_PUBLIC_URL = PATH_URL + "/event/public";

export const url = {
    login: PATH_AUTH_URL + "/login",
    logout: PATH_AUTH_URL + "/logout",
    getEventDetails: (id) => PATH_EVENT_PUBLIC_URL + `/${id}`,
};