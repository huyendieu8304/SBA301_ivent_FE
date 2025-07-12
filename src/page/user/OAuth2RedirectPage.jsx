import {useLocation, useNavigate} from "react-router";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {useEffect} from "react";
import {messageService} from "../../service/MessageService.jsx";
import {MESSAGE_TYPES} from "../../common/Constant.jsx";
import Messages from "../../common/Message.jsx";
import {useAuth} from "../../context/AuthContext.jsx";

const OAuth2RedirectPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {login} = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const error = params.get("error");

        if (token) {
            login(token);
            navigate("/");
            messageService.showMessage(Messages.MSG_I_00001, MESSAGE_TYPES.INFO);
        } else if (error) {
            console.log(error);
            navigate("/login");
            messageService.showMessage(Messages.MSG_E_00007, MESSAGE_TYPES.ERROR);
        }
    }, [location, navigate]);

    return (
        <>
            <LoadingComponent/>
        </>
    )
}
export default OAuth2RedirectPage;