import {callApi} from "../CallApi.jsx";
import {url} from "../url.jsx";
import {HTTP_METHOD} from "../../common/Constant.jsx";

const accountSettingApi = {
    registerUser: (body, successHandler, errorHandler) =>
        callApi(
            url.registerUser,
            HTTP_METHOD.POST,
            {},
            body,
            false,
            successHandler,
            errorHandler,
        ),
    validateEmailToken: (body, successHandler, errorHandler) =>
        callApi(
            url.validateEmailToken,
            HTTP_METHOD.POST,
            {},
            body,
            false,
            successHandler,
            errorHandler,
        ),
    resendEmailToken: (body, successHandler, errorHandler) =>
        callApi(
            url.resendEmailToken,
            HTTP_METHOD.POST,
            {},
            body,
            false,
            successHandler,
            errorHandler,
        ),
    userProfile: (successHandler, errorHandler) =>
        callApi(
            url.userProfile,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
    updateProfile: (body, successHandler, errorHandler) =>
        callApi(
            url.updateProfile,
            HTTP_METHOD.POST,
            {},
            body,
            true,
            successHandler,
            errorHandler,
            true,
        ),
};

export default accountSettingApi;