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
    updateEventStatus: (id, status, reason, successHandler, errorHandler) =>
        callApi(
            url.updateEventStatus(id, status),
            HTTP_METHOD.PUT,
            {},
            reason || "",                         // Nếu có lý do thì truyền, không thì truyền chuỗi rỗng
            true,
            successHandler,
            errorHandler,
            true,
        )
};

export default operatorApi;
