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
};

export default eventApi;