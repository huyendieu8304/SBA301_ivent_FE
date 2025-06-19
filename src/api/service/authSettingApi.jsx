import {callApi} from "../CallApi.jsx";
import {url} from "../url.jsx";
import {HTTP_METHOD} from "../../common/Constant.jsx";

const authSettingApi = {
    login: (body, successHandler, errorHandler) =>
        callApi(
            url.login,
            HTTP_METHOD.POST,
            {},
            body,
            false,
            successHandler,
            errorHandler,
        ),
    logout: (successHandler, errorHandler) =>
        callApi(
            url.logout,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
};

export default authSettingApi;