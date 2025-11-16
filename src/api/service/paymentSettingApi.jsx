import {callApi} from "../CallApi.jsx";
import {url} from "../url.jsx";
import {HTTP_METHOD} from "../../common/Constant.jsx";

const paymentSettingApi = {
    payment: (body, successHandler, errorHandler) =>
        callApi(
            url.payment,
            HTTP_METHOD.POST,
            {},
            body,
            true,
            successHandler,
            errorHandler
        ),
    getPaymentDetails: (txnRefCode, successHandler, errorHandler) =>
        callApi(
            url.getPaymentDetails(txnRefCode),
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler
        ),
}

export default paymentSettingApi;