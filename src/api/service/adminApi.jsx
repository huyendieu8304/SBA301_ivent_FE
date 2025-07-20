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
};

export default adminApi;
