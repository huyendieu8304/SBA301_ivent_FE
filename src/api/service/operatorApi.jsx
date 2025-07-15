import {HTTP_METHOD} from "../../common/Constant.jsx";
import {callApi} from "../CallApi.jsx";
import {url} from "../url.jsx";

const operatorApi = {
    getAllOperatorEvents: (successHandler, errorHandler) =>
    callApi(
        url.operatorEvent,
        HTTP_METHOD.GET,
        {},
        {},
        true,
        successHandler,
        errorHandler,
    ),
    getEventDetailsById: (id, successHandler, errorHandler) =>
    callApi(
        url.operatorEventDetails(id),
        HTTP_METHOD.GET,
        {},
        {},
        true,
        successHandler,
        errorHandler,
    ),
    getPendingEvent: (successHandler, errorHandler) =>
        callApi(
            url.pendingEvent,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
};

export default operatorApi;
