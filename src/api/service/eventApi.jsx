import {callApi} from "../CallApi.jsx";
import {HTTP_METHOD} from "../../common/Constant.jsx";
import {url} from "../url.jsx";

const eventApi={
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
}

export default eventApi;