import {Button, Card, CardContent, Container, Stack, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router";
import {
    checkEmailFormat,
    checkPasswordAndRePasswordInput,
    checkRequiredInput,
    checkValidDate
} from "../../common/ValidateFunction.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import MascotSvg from "../../component/svg/MascotSvg.jsx";
import ValidationTextField from "../../component/validateInput/ValidationTextField.jsx";
import {ValidateDatePicker} from "../../component/validateInput/ValidateDatePicker.jsx";
import {DATE_FORMAT, MESSAGE_TYPES} from "../../common/Constant.jsx";
import ValidateRadioGroup from "../../component/validateInput/ValidateRadioGroup.jsx";
import accountSettingApi from "../../api/service/accountSettingApi.jsx";
import {messageService} from "../../service/MessageService.jsx";
import Messages from "../../common/Message.jsx";
import {formatString} from "../../common/FormatFunction.jsx";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ValidatedIconTextField from "../../component/validateInput/ValidateIconTextField.jsx";


const RegisterUserPage = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        email: {value: "", error: ""},
        password: {value: "", error: ""},
        rePassword: {value: "", error: ""},
        fullName: {value: "", error: ""},
        phone: {value: "", error: ""},
        dob: {value: null, error: ""},
        gender: {value: "", error: ""},
    });
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

    const validateRePassword = (value, relatedValue) => {
        const fieldName = "Xác nhận mật khẩu";
        const relatedFieldName = "Mật khẩu";
        const error = checkRequiredInput(fieldName, value) || checkPasswordAndRePasswordInput(fieldName, value, relatedFieldName, relatedValue);
        if (error) {
            return error;
        }
        return null;
    }

    const validateFullName = (value) => {
        const fieldName = "Họ và tên";
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const validatePhone = (value) => {
        const fieldName = "Số điện thoại";
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const validateDob = (value) => {
        const fieldName = "Ngày sinh";
        const error = checkRequiredInput(fieldName, value) || checkValidDate(fieldName, value, DATE_FORMAT);
        if (error) {
            return error;
        }
        return null;
    }

    const validateGender = (value) => {
        const fieldName = "Giới tính";
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const submitForm = () => {
        const emailErr = validateEmail(formFields.email.value);
        const passwordErr = validatePassword(formFields.password.value);
        const rePasswordErr = validateRePassword(formFields.rePassword.value, formFields.password.value);
        const fullNameErr = validateFullName(formFields.fullName.value);
        const phoneErr = validatePhone(formFields.phone.value);
        const dobErr = validateDob(formFields.dob.value);
        const genderErr = validateGender(formFields.gender.value);
        updateError("email", emailErr || "");
        updateError("password", passwordErr || "");
        updateError("rePassword", rePasswordErr || "");
        updateError("fullName", fullNameErr || "");
        updateError("phone", phoneErr || "");
        updateError("dob", dobErr || "");
        updateError("gender", genderErr || "");
        if (emailErr || passwordErr || rePasswordErr || fullNameErr || phoneErr || dobErr || genderErr) {
            return;
        }
        const body = {
            email: formFields.email.value,
            password: formFields.password.value,
            fullName: formFields.fullName.value,
            phone: formFields.phone.value,
            dob: new Date(formFields.dob.value).getTime(), //convert to timestamp
            gender: formFields.gender.value,
        }
        setIsLoading(true);
        accountSettingApi.registerUser(body, registerSuccess, registerFail);
    };

    const registerSuccess = (data) => {
        messageService.showMessage(Messages.MSG_I_00002, MESSAGE_TYPES.INFO);
        navigate("/login");
    }
    const registerFail = (error) => {
        if (error.response.data.httpStatusCode !== "OK") {
            messageService.showMessage(formatString(Messages.MSG_E_00005, "Email"), MESSAGE_TYPES.ERROR);
            setIsLoading(false);
        }
    }

    return (
        <>
            <Container maxWidth="xl" sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "fit-content",
            }}>
                <Card sx={{width: "fit-content", minWidth: "700px", height: "fit-content", borderRadius: "16px",}}>
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
                                Đăng ký tài khoản
                            </Typography>
                            <MascotSvg/>
                        </Stack>
                        <Stack direction="column" spacing={3} sx={{width: "80%"}}>
                            <Stack direction="row" spacing={3} sx={{width: "100%"}}>
                                <div style={{width: "50%"}}>
                                    <ValidationTextField label="Email" fieldName="email" value={formFields.email.value}
                                                         setValue={updateField} error={formFields.email.error}
                                                         setError={updateError} isRequired={true} size="small"
                                                         type="text"
                                                         validatorFunction={validateEmail}/>
                                </div>
                                <div style={{width: "50%"}}></div>
                            </Stack>
                            <Stack direction="row" spacing={3} sx={{width: "100%"}}>
                                <ValidatedIconTextField label="Mật khẩu" fieldName="password"
                                                        value={formFields.password.value}
                                                        setValue={updateField} error={formFields.password.error}
                                                        setError={updateError} isRequired={true} size="small"
                                                        type="password"
                                                        validatorFunction={validatePassword}
                                                        endIcon={<VisibilityOffIcon/>}/>
                                <ValidatedIconTextField label="Xác nhận mật khẩu" fieldName="rePassword"
                                                        value={formFields.rePassword.value}
                                                        setValue={updateField} error={formFields.rePassword.error}
                                                        setError={updateError} isRequired={true} size="small"
                                                        type="password"
                                                        isRePasswordInput={true}
                                                        relatedValue={formFields.password.value}
                                                        validatorFunction={validateRePassword}
                                                        endIcon={<VisibilityOffIcon/>}/>
                            </Stack>
                            <Stack direction="row" spacing={3} sx={{width: "100%"}}>
                                <ValidationTextField label="Họ và tên" fieldName="fullName"
                                                     value={formFields.fullName.value}
                                                     setValue={updateField} error={formFields.fullName.error}
                                                     setError={updateError} isRequired={true} size="small" type="text"
                                                     validatorFunction={validateFullName}/>
                                <ValidationTextField label="Số điện thoại" fieldName="phone"
                                                     value={formFields.phone.value}
                                                     setValue={updateField} error={formFields.phone.error}
                                                     setError={updateError} isRequired={true} size="small" type="text"
                                                     validatorFunction={validatePhone}/>
                            </Stack>
                            <Stack direction="row" spacing={3} sx={{width: "100%"}}>
                                <div style={{width: "50%"}}>
                                    <ValidateDatePicker label="Ngày sinh" fieldName="dob"
                                                        value={formFields.dob.value}
                                                        setValue={updateField} error={formFields.dob.error}
                                                        setError={updateError} isRequired={true} size="small"
                                                        validatorFunction={validateDob}/>
                                </div>
                                <div style={{width: "50%"}}></div>
                            </Stack>
                            <ValidateRadioGroup label="Giới tính" fieldName="gender"
                                                listOptions={[
                                                    {value: "Male", label: "Nam"},
                                                    {value: "Female", label: "Nữ"},
                                                    {value: "Others", label: "Khác"}
                                                ]}
                                                value={formFields.gender.value}
                                                setValue={updateField} error={formFields.gender.error}
                                                setError={updateError} isRequired={true} size="small"
                                                validatorFunction={validateGender}/>
                        </Stack>
                        <Button variant="contained" color="primary" sx={{textTransform: "none", margin: "24px"}}
                                onClick={submitForm}>
                            <Typography variant="body1" component="div"
                                        sx={{color: "white", textAlign: "center"}}>
                                Đăng ký
                            </Typography>
                        </Button>
                    </CardContent>
                </Card>
            </Container>
            {isLoading && <LoadingComponent/>}
        </>
    )
}
export default RegisterUserPage;