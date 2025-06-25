import {HTTP_METHOD} from "../../common/Constant.jsx";
import {callApi} from "../CallApi.jsx";
import {url} from "../url.jsx";

const eventAdminApi = {
    getAllAdminEvents: (successHandler, errorHandler) =>
    callApi(
        url.adminEvent,
        HTTP_METHOD.GET,
        {},
        {},
        true,
        successHandler,
        errorHandler,
    ),
    getEventDetailsById: (id, successHandler, errorHandler) =>
    callApi(
        url.getEventDetails(id),
        HTTP_METHOD.GET,
        {},
        {},
        true,
        successHandler,
        errorHandler,
    ),
};

export default eventAdminApi;
