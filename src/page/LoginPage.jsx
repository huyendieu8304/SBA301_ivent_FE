import {Button, Card, CardContent, Container, Stack, Typography, useTheme} from "@mui/material";
import ValidationTextField from "../component/ValidationTextField.jsx";
import {useState} from "react";
import {checkEmailFormat, checkRequiredInput} from "../common/ValidateFunction.jsx";
import authSettingApi from "../api/service/authSettingApi.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import LoadingComponent from "../component/LoadingComponent.jsx";
import {useNavigate} from "react-router";

const LoginPage = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        email: { value: "", error: "" },
        password: { value: "", error: "" },
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
        const error = checkRequiredInput(fieldName,value) || checkEmailFormat(fieldName, value);
        if(error) {
            return error;
        }
        return null;
    }

    const validatePassword = (value) => {
        const fieldName = "Mật khẩu";
        const error = checkRequiredInput(fieldName,value);
        if(error) {
            return error;
        }
        return null;
    }

    const submitForm = () => {
        const emailErr = validateEmail(formFields.email.value);
        const passwordErr = validatePassword(formFields.password.value);
        updateError("email", emailErr || "");
        updateError("password", passwordErr || "");
        if(emailErr || passwordErr) {
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
        // setIsLoading(false);
    }
    const loginFailure = (error) => {
        console.log(error);
        setIsLoading(false);
    }

    if(isLoading) return <LoadingComponent/>
    return (
        <Container maxWidth="xl" sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", backgroundColor: theme.palette.backgroundColor.main}}>
            <Card sx={{ width: "fit-content", minWidth: "400px", height: "fit-content" }}>
                <CardContent sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: "bold", color: theme.palette.primary.main, textAlign: "center", margin:"24px 0"}}>
                        Đăng nhập
                    </Typography>
                    <Stack direction="column" spacing={4} sx={{width:"100%"}}>
                        <ValidationTextField label="Email" fieldName="email" value={formFields.email.value} setValue={updateField} error={formFields.email.error} setError={updateError} isRequired={true} size="small" type="text" validatorFunction={validateEmail} />
                        <ValidationTextField label="Mật khẩu" fieldName="password" value={formFields.password.value} setValue={updateField} error={formFields.password.error} setError={updateError} isRequired={true} size="small" type="password" validatorFunction={validatePassword} />
                    </Stack>
                    <Button variant="contained" color="primary" sx={{ textTransform: "none", margin:"24px 0 0" }} onClick={submitForm}>
                        <Typography gutterBottom variant="body1" component="div" sx={{color: "white", textAlign: "center"}}>
                            Đăng nhập
                        </Typography>
                    </Button>
                   </CardContent>
            </Card>
        </Container>
    )
}
export default LoginPage;