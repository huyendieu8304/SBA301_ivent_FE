import {callApi} from "../CallApi.jsx";
import {url} from "../url.jsx";
import {HTTP_METHOD} from "../../common/Constant.jsx";

const categoryApi = {
    getCategories: (successHandler, errorHandler) =>
        callApi(
            url.getCategories,
            HTTP_METHOD.GET,
            {},
            {},
            false,
            successHandler,
            errorHandler,
        )
}

export default categoryApi;