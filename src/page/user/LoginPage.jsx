import {Button, Card, CardContent, Container, Stack, Typography, useTheme} from "@mui/material";
import ValidationTextField from "../../component/validateInput/ValidationTextField.jsx";
import {useEffect, useState} from "react";
import {checkEmailFormat, checkRequiredInput} from "../../common/ValidateFunction.jsx";
import authSettingApi from "../../api/service/authSettingApi.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {useNavigate} from "react-router";
import MascotSvg from "../../component/svg/MascotSvg.jsx";
import {messageService} from "../../service/MessageService.jsx";
import Messages from "../../common/Message.jsx";
import {MESSAGE_TYPES, ROLES} from "../../common/Constant.jsx";
import ValidatedIconTextField from "../../component/validateInput/ValidateIconTextField.jsx";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ConfirmModal from "../../component/ConfirmModal.jsx";
import accountSettingApi from "../../api/service/accountSettingApi.jsx";

const LoginPage = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        email: {value: "", error: ""},
        password: {value: "", error: ""},
    });
    const [forgotPassword, setForgotPassword] = useState({
        email: "",
        error: "",
    })
    const [isOpen, setIsOpen] = useState(false);
    const {login, authorities} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(authorities === ROLES.USER){
            navigate("/");
        }
        if(authorities === ROLES.ADMIN){
            navigate("/admin/statistic");
        }
        if(authorities === ROLES.OPERATOR){
            navigate("/operator");
        }
    },[authorities])

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
        messageService.showMessage(Messages.MSG_I_00001, MESSAGE_TYPES.INFO);
        setIsLoading(false);
    }
    const loginFailure = (error) => {
        console.log(error);
        setIsLoading(false);
        messageService.showMessage(error.response.data.message, MESSAGE_TYPES.ERROR);
    }

    const handleForgotPassword = () => {
        const emailErr = validateEmail(forgotPassword.email);
        setForgotPassword({...forgotPassword, error: emailErr});
        if (emailErr) {
            return;
        }
        const body = {
            email: forgotPassword.email,
        }
        setIsLoading(true);
        accountSettingApi.forgotPasswordRequest(body, sendForgotPasswordRequestSuccess, sendForgotPasswordRequestFail);
    }
    const sendForgotPasswordRequestSuccess = (data) => {
        setIsLoading(false);
        setIsOpen(false);
        messageService.showMessage(Messages.MSG_I_00006, MESSAGE_TYPES.INFO);
    }
    const sendForgotPasswordRequestFail = (e) => {
        setIsOpen(false);
        setIsLoading(false);
        messageService.showMessage(e.response.data.message, MESSAGE_TYPES.ERROR);
    }

    return (
        <>
            <ConfirmModal title={"Quên mật khẩu"} open={isOpen} setOpen={setIsOpen} hasCancel={true} handleConfirmSubmit={handleForgotPassword}
                          content={
                              <Stack direction="column" spacing={2}>
                                  <Typography variant="subtitle1"> Hãy nhập email để nhận mã xác nhận </Typography>
                                  <ValidationTextField label="Email" fieldName="email"
                                                       value={forgotPassword.email}
                                                       setValue={(fieldName, value) => setForgotPassword({...forgotPassword, email: value})}
                                                       error={forgotPassword.error}
                                                       setError={(fieldName, value) => setForgotPassword({...forgotPassword, error: value})}
                                                       isRequired={true} size="small"
                                                       type="text"
                                                       validatorFunction={validateEmail}/>
                              </Stack>
                          }
            />
            <Container maxWidth="xl" sx={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                height: "fit-content",
            }}>
                <Card sx={{width: "fit-content", minWidth: "400px", height: "fit-content", borderRadius: "16px"}}>
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
                            <ValidatedIconTextField label="Mật khẩu" fieldName="password" value={formFields.password.value}
                                                 setValue={updateField} error={formFields.password.error}
                                                 setError={updateError} isRequired={true} size="small" type="password"
                                                 validatorFunction={validatePassword} endIcon={<VisibilityOffIcon/>}/>
                            <Button variant="text" color="success" onClick={() => setIsOpen(true)}
                                    sx={{textTransform: "none", justifyContent: "flex-start", marginTop: "8px !important", width: "fit-content"}}>
                                Quên mật khẩu?
                            </Button>
                        </Stack>
                        <Button variant="contained" color="primary" sx={{textTransform: "none", margin: "8px 24px"}}
                                onClick={submitForm}>
                            <Typography variant="body1" component="div"
                                        sx={{color: "white", textAlign: "center"}}>
                                Đăng nhập
                            </Typography>
                        </Button>
                        <Button
                            variant="text"
                            color="primary"
                            // fullWidth
                            sx={{textTransform: "none", marginTop: 1, marginBottom: 3}}
                            startIcon={<img src="https://developers.google.com/identity/images/g-logo.png" alt="G" style={{width: 20, height: 20}} />}
                            href="http://localhost:8080/ivent/oauth2/authorization/google"
                        >
                            <Typography variant="body1" component="div" sx={{textAlign: "center"}}>
                                Đăng nhập bằng Google
                            </Typography>
                        </Button>
                    </CardContent>
                </Card>
            </Container>
            {isLoading && <LoadingComponent/>}
        </>
    )
}
export default LoginPage;