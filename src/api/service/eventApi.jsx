import {callApi} from "../CallApi.jsx";
import {HTTP_METHOD} from "../../common/Constant.jsx";
import {url} from "../url.jsx";

const eventApi = {
    getMyEvents: (id, page, size, name, successHandler, errorHandler) =>
        callApi(
            url.getMyEvents(id, page, size),
            HTTP_METHOD.GET,
            {
                name: name?.trim() || undefined,
            },
            {},
            true,
            successHandler,
            errorHandler
        ),

    getEventDetails: (id, successHandler, errorHandler) =>
        callApi(
            url.getEventDetails(id),
            HTTP_METHOD.GET,
            {},
            {},
            false,
            successHandler,
            errorHandler,
        ),
    getEventAndTicketTypeDetails: (id, successHandler, errorHandler) =>
        callApi(
            url.getEventAndTicketTypeDetails(id),
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
    createEvent: (formData, successHandler, errorHandler) =>
        callApi(
            url.createEvent,
            HTTP_METHOD.POST,
            {},
            formData,
            true,
            successHandler,
            errorHandler,
            true,
        ),
    getMyEventDetails: (id, successHandler, errorHandler) =>
        callApi(
            url.getMyEventDetail(id),
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler,
        ),
    updateMyEventDetails: (formdata, successHandler, errorHandler) =>
        callApi(
            url.updateMyEventDetail,
            HTTP_METHOD.PUT,
            {},
            formdata,
            true,
            successHandler,
            errorHandler,
            true
        ),
    searchEventDetails: (params, successHandler, errorHandler) =>
        callApi(
            url.searchEvent,
            HTTP_METHOD.GET,
            params,
            {},
            false,
            successHandler,
            errorHandler,
            false,
        ),
    getHomePageData: (successHandler, errorHandler) =>
        callApi(
            url.getHomePageData,
            HTTP_METHOD.GET,
            {},
            {},
            false,
            successHandler,
            errorHandler,
            false,
        )
};

export default eventApi;