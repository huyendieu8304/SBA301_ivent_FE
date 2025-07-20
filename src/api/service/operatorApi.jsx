import {HTTP_METHOD} from "../../common/Constant.jsx";
import {callApi} from "../CallApi.jsx";
import {url} from "../url.jsx";

const operatorApi = {
    getAllOperatorEvents: ( page, size, eventName,successHandler, errorHandler) =>
    callApi(
        url.operatorEvent,
        HTTP_METHOD.GET,
        {},
        {},
        true,
        successHandler,
        errorHandler,
    ),
    getEventDetailsById: (eventId, successHandler, errorHandler) =>
    callApi(
        url.operatorEventDetails(eventId),
        HTTP_METHOD.GET,
        {},
        {},
        true,
        successHandler,
        errorHandler,
    ),
    getPendingEvent: ( page, size, eventName, successHandler, errorHandler) =>
        callApi(
            url.pendingEvent,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),

    updateEventStatus: (eventId, status, reason, successHandler, errorHandler) =>
        callApi(
            url.updateEventStatus(eventId, status),
            HTTP_METHOD.PUT,
            {},
            reason || "",                         // Nếu có lý do thì truyền, không thì truyền chuỗi rỗng
            true,
            successHandler,
            errorHandler,
            true,
        ),
    getProvinceStatistic: (successHandler, errorHandler) =>
        callApi(
            url.getProvinceStatistic,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
    getStatusStatistic: (successHandler, errorHandler) =>
        callApi(
            url.getStatusStatistic,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
    getMonthStatistic: (successHandler, errorHandler) =>
        callApi(
            url.getMonthStatistic,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
    getCategoryStatistic: (successHandler, errorHandler) =>
        callApi(
            url.getCategoryStatistic,
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
};

export default operatorApi;
