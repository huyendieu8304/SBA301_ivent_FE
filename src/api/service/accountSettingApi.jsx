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
};

export default accountSettingApi;