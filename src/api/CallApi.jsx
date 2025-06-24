import axiosClient from "./axiosClient.jsx";
import {HTTP_METHOD} from "../common/Constant.jsx";

const fetch = (url, method, config, body) => {
    switch (method) {
        case HTTP_METHOD.GET:
            return axiosClient.get(url, config);
        case HTTP_METHOD.POST:
            return axiosClient.post(url, body, config);
        case HTTP_METHOD.DELETE:
            return axiosClient.delete(url, config);
        case HTTP_METHOD.PUT:
            return axiosClient.put(url, body, config);
        default:
            break;
    }
};

export const callApi = (
    url,
    method,
    params,
    body,
    tokenNeeded,
    successHandler,
    errorHandler,
    sendFile = false,
    extraHeaders = {},
) => {
    const token = localStorage.getItem("access_token");
    const headers = {
        ...extraHeaders,
    };
    if (token && tokenNeeded) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    if (!sendFile) {
        headers["Content-Type"] = "application/json";
    }
    const config = {
        params,
        headers,
    };

    fetch(url, method, config, body)
        .then((response) => response)
        .then((data) => {
            successHandler(data);
        })
        .catch((error) => {
            errorHandler(error);
        });
};