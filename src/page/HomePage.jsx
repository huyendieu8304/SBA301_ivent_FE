import {useEffect} from "react";
import {messageService} from "../service/MessageService.jsx";
import {MESSAGE_TYPES} from "../common/Constant.jsx";

const HomePage = () => {
    useEffect(() => {
        messageService.showMessage("hello",MESSAGE_TYPES.INFO)
        console.log("hello");
    },[])
    return(
        <div>Hello</div>
    )
}
export default HomePage;