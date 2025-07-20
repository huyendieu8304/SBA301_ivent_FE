import { useRef, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    IconButton,
    Stack,
    Typography,
    styled,
    useTheme
} from "@mui/material";
import Badge from "@mui/material/Badge";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router-dom";
import ValidationTextField from "../../component/validateInput/ValidationTextField.jsx";
import { ValidateDatePicker } from "../../component/validateInput/ValidateDatePicker.jsx";
import ValidateRadioGroup from "../../component/validateInput/ValidateRadioGroup.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import Messages from "../../common/Message.jsx";
import { messageService } from "../../service/MessageService.jsx";
import {
    checkRequiredInput,
    checkEmailFormat,
    checkValidDate
} from "../../common/ValidateFunction.jsx";
import { DATE_FORMAT, MESSAGE_TYPES } from "../../common/Constant.jsx";
import MascotSvg from "../../component/svg/MascotSvg.jsx";
import adminApi from "../../api/service/adminApi.jsx";


const CreateAdminAccount = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const inputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const [formFields, setFormFields] = useState({
        email: { value: "", error: "" },
        password: { value: "", error: "" },
        fullName: { value: "", error: "" },
        phone: { value: "", error: "" },
        dob: { value: null, error: "" },
        gender: { value: "", error: "" }
    });

    const updateField = (fieldName, newValue) => {
        setFormFields((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                value: newValue
            }
        }));
    };

    const updateError = (fieldName, errorMsg) => {
        setFormFields((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                error: errorMsg
            }
        }));
    };

    const validateAll = () => {
        const emailErr = checkRequiredInput("Email", formFields.email.value) || checkEmailFormat("Email", formFields.email.value);
        const passwordErr = checkRequiredInput("Mật khẩu", formFields.password.value);
        const fullNameErr = checkRequiredInput("Họ và tên", formFields.fullName.value);
        const phoneErr = checkRequiredInput("Số điện thoại", formFields.phone.value);
        const dobErr = checkRequiredInput("Ngày sinh", formFields.dob.value) || checkValidDate("Ngày sinh", formFields.dob.value, DATE_FORMAT);
        const genderErr = checkRequiredInput("Giới tính", formFields.gender.value);

        updateError("email", emailErr || "");
        updateError("password", passwordErr || "");
        updateError("fullName", fullNameErr || "");
        updateError("phone", phoneErr || "");
        updateError("dob", dobErr || "");
        updateError("gender", genderErr || "");

        return !(emailErr || passwordErr || fullNameErr || phoneErr || dobErr || genderErr);
    };

    const handleSubmit = () => {
        if (!validateAll()) return;

        const formData = new FormData();
        formData.append("email", formFields.email.value);
        formData.append("password", formFields.password.value);
        formData.append("fullName", formFields.fullName.value);
        formData.append("phone", formFields.phone.value);
        formData.append("dob", new Date(formFields.dob.value).getTime());
        formData.append("gender", formFields.gender.value);
        if (imageFile) {
            formData.append("avatarFile", imageFile);
        }

        setIsLoading(true);
        adminApi.createAdminAccount(formData, handleSuccess, handleFail);
    };

    const handleSuccess = () => {
        messageService.showMessage(Messages.MSG_I_00013, MESSAGE_TYPES.INFO);
        setIsLoading(false);
        navigate("/admin/create-admin-account");
    };

    const handleFail = () => {
        messageService.showMessage(Messages.MSG_E_00018, MESSAGE_TYPES.ERROR);
        setIsLoading(false);
    };

    const handleUploadClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setAvatarPreview(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const validateDob = (value) => {
        const fieldName = "Ngày sinh";
        const error = checkRequiredInput(fieldName, value) || checkValidDate(fieldName, value, DATE_FORMAT);
        return error || null;
    }

    const validateGender = (value) => {
        const fieldName = "Giới tính";
        const error = checkRequiredInput(fieldName, value);
        return error || null;
    }

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 32,
        height: 32,
        backgroundColor: theme.palette.primary.main,
        color: "#fff"
    }));

    return (
        <>
            <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Card sx={{ minWidth: 700, borderRadius: 3 }}>
                    <CardContent sx={{ padding: 0 }}>
                        <Stack
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                height: 80,
                                px: 3,
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "row"
                            }}
                        >
                            <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
                                Tạo tài khoản quản trị viên
                            </Typography>
                            <MascotSvg />
                        </Stack>

                        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{ p: 3 }}>
                            {/* Left: form */}
                            <Stack spacing={2} sx={{ width: "60%" }}>
                                <ValidationTextField
                                    label="Email"
                                    fieldName="email"
                                    value={formFields.email.value}
                                    setValue={updateField}
                                    error={formFields.email.error}
                                    setError={updateError}
                                    isRequired={true}
                                    size="small"
                                    type="text"
                                />
                                <ValidationTextField
                                    label="Mật khẩu"
                                    fieldName="password"
                                    value={formFields.password.value}
                                    setValue={updateField}
                                    error={formFields.password.error}
                                    setError={updateError}
                                    isRequired={true}
                                    size="small"
                                    type="password"
                                />
                                <ValidationTextField
                                    label="Họ và tên"
                                    fieldName="fullName"
                                    value={formFields.fullName.value}
                                    setValue={updateField}
                                    error={formFields.fullName.error}
                                    setError={updateError}
                                    isRequired={true}
                                    size="small"
                                    type="text"
                                />
                                <ValidationTextField
                                    label="Số điện thoại"
                                    fieldName="phone"
                                    value={formFields.phone.value}
                                    setValue={updateField}
                                    error={formFields.phone.error}
                                    setError={updateError}
                                    isRequired={true}
                                    size="small"
                                    type="text"
                                />
                                <ValidateDatePicker
                                    label="Ngày sinh"
                                    fieldName="dob"
                                    value={formFields.dob.value}
                                    setValue={updateField}
                                    error={formFields.dob.error}
                                    setError={updateError}
                                    isRequired={true}
                                    size="small"
                                    validatorFunction={validateDob}
                                />
                                <ValidateRadioGroup
                                    label="Giới tính"
                                    fieldName="gender"
                                    listOptions={[
                                        { value: "Male", label: "Nam" },
                                        { value: "Female", label: "Nữ" },
                                        { value: "Others", label: "Khác" }
                                    ]}
                                    value={formFields.gender.value}
                                    setValue={updateField}
                                    error={formFields.gender.error}
                                    setError={updateError}
                                    isRequired={true}
                                    size="small"
                                    validatorFunction={validateGender}
                                />
                                <Box textAlign="center">
                                    <Button variant="contained" onClick={handleSubmit}>
                                        Tạo tài khoản
                                    </Button>
                                </Box>
                            </Stack>

                            {/* Right: Avatar */}
                            <Stack alignItems="center" spacing={2} sx={{ width: "40%" }}>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                    badgeContent={
                                        <IconButton onClick={handleUploadClick}>
                                            <SmallAvatar>
                                                <CameraAltIcon fontSize="small" />
                                            </SmallAvatar>
                                        </IconButton>
                                    }
                                >
                                    <Avatar
                                        src={avatarPreview}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                </Badge>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={inputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
            {isLoading && <LoadingComponent />}
        </>
    );
};

export default CreateAdminAccount;
