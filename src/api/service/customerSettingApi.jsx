import {callApi} from "../CallApi.jsx";
import {url} from "../url.jsx";
import {HTTP_METHOD} from "../../common/Constant.jsx";


const customerSettingApi = {
    getAllCustomer: (params, successHandler, errorHandler) =>
        callApi(
            url.path,
            HTTP_METHOD.GET,
            params,
            {},
            successHandler,
            errorHandler,
        ),
    getAllData: (successHandler, errorHandler) =>
        callApi(
            url.path,
            HTTP_METHOD.GET,
            {},
            {},
            successHandler,
            errorHandler,
        ),
    getCustomerDetail: (id, successHandler, errorHandler) =>
        callApi(
            `${url.path}${id}`,
            HTTP_METHOD.GET,
            {},
            {},
            successHandler,
            errorHandler,
        ),
    addCustomer: (body, successHandler, errorHandler) =>
        callApi(
            url.path,
            HTTP_METHOD.POST,
            {},
            body,
            successHandler,
            errorHandler,
        ),
    editCustomer: (body, successHandler, errorHandler) =>
        callApi(
            `${url.path}${body.id}`,
            HTTP_METHOD.PUT,
            {},
            body,
            successHandler,
            errorHandler,
        ),
    deleteCustomer: (id, successHandler, errorHandler) =>
        callApi(
            `${url.path}${id}`,
            HTTP_METHOD.DELETE,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
};

export default customerSettingApi;