import {HTTP_METHOD} from "../../common/Constant.jsx";
import {callApi} from "../CallApi.jsx";
import {url} from "../url.jsx";

const adminApi = {
    getAllAccount: ( page, size, name,successHandler, errorHandler) =>
        callApi(
            url.adminAccount(page, size),
            HTTP_METHOD.GET,
            {name: name?.trim() || "",},
            {},
            true,
            successHandler,
            errorHandler,
        ),
    getRoleStatistic: (successHandler, errorHandler) =>
        callApi(
            url.getRoleStatistic,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
    getStatusAccountStatistic: (successHandler, errorHandler) =>
        callApi(
            url.getStatusAccountStatistic,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
    getOrganizerStatistic: (successHandler, errorHandler) =>
        callApi(
            url.getOrganizerStatistic,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
    getPaymentStatistic: (successHandler, errorHandler) =>
        callApi(
            url.getPaymentStatistic,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
          ),
    createAdminAccount: (formData, successHandler, errorHandler) =>
        callApi(
            url.createAdminAccount,
            HTTP_METHOD.POST,
            {},
            formData,
            true,
            successHandler,
            errorHandler,
            true,
        ),

    banUser: (accountId, successHandler, errorHandler) =>
        callApi(
            `${url.banUser}/${accountId}`,
            HTTP_METHOD.PUT,
            {},
            null,
            true,
            successHandler,
            errorHandler
        ),

    getUserAccounts: (keyword, page, size, successHandler, errorHandler) =>
        callApi(
            url.getUserAccounts,
            HTTP_METHOD.GET,
            { keyword, page, size },
            null,
            true,
            successHandler,
            errorHandler
        ),
};

export default adminApi;
