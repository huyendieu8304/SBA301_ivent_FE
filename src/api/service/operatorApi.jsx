import {HTTP_METHOD} from "../../common/Constant.jsx";
import {callApi} from "../CallApi.jsx";
import {url} from "../url.jsx";

const operatorApi = {
    getAllOperatorEvents: (page, size, eventName, successHandler, errorHandler) =>
        callApi(
            url.operatorEvent(page, size),
            HTTP_METHOD.GET,
            {
                name: eventName?.trim() || "",
            },
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
    getPendingEvent: (page, size, eventName, successHandler, errorHandler) =>
        callApi(
            url.pendingEvent(page, size),
            HTTP_METHOD.GET,
            { name: eventName?.trim() || "",},
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
            reason ? reason : "",                     // Nếu có lý do thì truyền, không thì truyền chuỗi rỗng
            true,
            successHandler,
            errorHandler,
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
