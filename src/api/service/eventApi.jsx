import { callApi } from "../CallApi.jsx";
import { HTTP_METHOD } from "../../common/Constant.jsx";

const eventApi = {
    getMyEvents: (id, page, size, successHandler, errorHandler) =>
        callApi(
            url.getMyEvents(id, page, size),
            HTTP_METHOD.GET,
            {},  
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
        )
};

export default eventApi;