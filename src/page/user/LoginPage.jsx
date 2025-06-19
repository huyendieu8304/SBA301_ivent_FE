import {Button, Card, CardContent, Container, Stack, Typography, useTheme} from "@mui/material";
import ValidationTextField from "../../component/validateInput/ValidationTextField.jsx";
import {useState} from "react";
import {checkEmailFormat, checkRequiredInput} from "../../common/ValidateFunction.jsx";
import authSettingApi from "../../api/service/authSettingApi.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {useNavigate} from "react-router";
import MascotSvg from "../../component/svg/MascotSvg.jsx";
import {messageService} from "../../service/MessageService.jsx";
import Messages from "../../common/Message.jsx";
import {MESSAGE_TYPES} from "../../common/Constant.jsx";

const LoginPage = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        email: {value: "", error: ""},
        password: {value: "", error: ""},
    });
    const {login} = useAuth();
    const navigate = useNavigate();

    const updateField = (fieldName, newValue) => {
        setFormFields((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                value: newValue,
            },
        }));
    };

    const updateError = (fieldName, errorMsg) => {
        setFormFields((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                error: errorMsg,
            },
        }));
    };

    const validateEmail = (value) => {
        const fieldName = "Email";
        const error = checkRequiredInput(fieldName, value) || checkEmailFormat(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const validatePassword = (value) => {
        const fieldName = "Mật khẩu";
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const submitForm = () => {
        const emailErr = validateEmail(formFields.email.value);
        const passwordErr = validatePassword(formFields.password.value);
        updateError("email", emailErr || "");
        updateError("password", passwordErr || "");
        if (emailErr || passwordErr) {
            return;
        }
        const body = {
            email: formFields.email.value,
            password: formFields.password.value,
        }
        setIsLoading(true);
        authSettingApi.login(body, loginSuccess, loginFailure);
    };

    const loginSuccess = (data) => {
        login(data.jwtToken);
        navigate("/");
        messageService.showMessage(Messages.MSG_I_00001, MESSAGE_TYPES.INFO);
        // setIsLoading(false);
    }
    const loginFailure = (error) => {
        console.log(error);
        setIsLoading(false);
    }

    if (isLoading) return <LoadingComponent/>
    return (
        <Container maxWidth="xl" sx={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            height: "fit-content",
            margin: "24px 0",
        }}>
            <Card sx={{width: "fit-content", minWidth: "400px", height: "fit-content", borderRadius: "16px",}}>
                <CardContent sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 !important"
                }}>
                    <Stack sx={{
                        width: "100%",
                        height: "80px",
                        marginBottom: "24px",
                        backgroundColor: theme.palette.primary.main,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "end"
                    }}>
                        <Typography variant="h5" component="div"
                                    sx={{fontWeight: "bold", color: "white", textAlign: "center", marginBottom: 2}}>
                            Đăng nhập
                        </Typography>
                        <MascotSvg/>
                    </Stack>
                    <Stack direction="column" spacing={3} sx={{width: "80%"}}>
                        <ValidationTextField label="Email" fieldName="email" value={formFields.email.value}
                                             setValue={updateField} error={formFields.email.error}
                                             setError={updateError} isRequired={true} size="small" type="text"
                                             validatorFunction={validateEmail}/>
                        <ValidationTextField label="Mật khẩu" fieldName="password" value={formFields.password.value}
                                             setValue={updateField} error={formFields.password.error}
                                             setError={updateError} isRequired={true} size="small" type="password"
                                             validatorFunction={validatePassword}/>
                    </Stack>
                    <Button variant="contained" color="primary" sx={{textTransform: "none", margin: "24px"}}
                            onClick={submitForm}>
                        <Typography variant="body1" component="div"
                                    sx={{color: "white", textAlign: "center"}}>
                            Đăng nhập
                        </Typography>
                    </Button>
                </CardContent>
            </Card>
        </Container>
    )
}
export default LoginPage;