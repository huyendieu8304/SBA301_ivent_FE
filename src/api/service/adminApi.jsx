import { callApi } from "../CallApi.jsx";
import { HTTP_METHOD } from "../../common/Constant.jsx";
import { url } from "../url.jsx";

const adminApi = {
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
