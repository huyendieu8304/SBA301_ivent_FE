import { callApi } from "../CallApi.jsx";
import { HTTP_METHOD } from "../../common/Constant.jsx";
import { url } from "../url.jsx";

const ticketApi = {
    getMyTickets: (accountId, page, size, eventName, successHandler, errorHandler) =>
        callApi(
            url.getMyTickets(accountId, page, size),
            HTTP_METHOD.GET,
            {
                eventName: eventName?.trim() || undefined
            },
            {},
            true,
            successHandler,
            errorHandler
        ),

    getTicketDetail: (paymentId, successHandler, errorHandler) =>
        callApi(
            url.getTicketDetail(paymentId),
            HTTP_METHOD.GET,
            {},
            {},
            true,
            successHandler,
            errorHandler
        ),

};



export default ticketApi;
