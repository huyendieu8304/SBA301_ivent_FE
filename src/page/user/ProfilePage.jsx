import {useEffect, useRef, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container, Divider, IconButton,
    Stack,
    styled,
    Typography,
    useTheme
} from "@mui/material";
import Badge from '@mui/material/Badge';
import MascotSvg from "../../component/svg/MascotSvg.jsx";
import ValidationTextField from "../../component/validateInput/ValidationTextField.jsx";
import {ValidateDatePicker} from "../../component/validateInput/ValidateDatePicker.jsx";
import ValidateRadioGroup from "../../component/validateInput/ValidateRadioGroup.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import {useNavigate} from "react-router";
import {
    checkRequiredInput,
    checkValidDate
} from "../../common/ValidateFunction.jsx";
import {DATE_FORMAT, MESSAGE_TYPES} from "../../common/Constant.jsx";
import accountSettingApi from "../../api/service/accountSettingApi.jsx";
import {messageService} from "../../service/MessageService.jsx";
import Messages from "../../common/Message.jsx";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import dayjs from "dayjs";
import {useAuth} from "../../context/AuthContext.jsx";
import {formatVNDateFromISO} from "../../common/FormatFunction.jsx";

const ProfilePage = () => {
    const theme = useTheme();
    const {login} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        email: {value: "", error: ""},
        fullName: {value: "", error: ""},
        phone: {value: "", error: ""},
        dob: {value: null, error: ""},
        gender: {value: "", error: ""},
    });
    const [subInformation, setSubInformation] = useState({
        createdAt: "",
        updatedAt: "",
    })
    const [avatar, setAvatar] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();
    const inputRef = useRef();

    useEffect(() => {
        setIsLoading(true);
        accountSettingApi.userProfile(getDataSuccess, getDataFail);
    }, [])

    const getDataSuccess = (data) => {
        updateField("email", data.email ?? "");
        updateField("fullName", data.fullName ?? "");
        updateField("phone", data.phone ?? "");
        updateField("dob", data.dob ? dayjs(data.dob) : null);
        updateField("gender", data.gender ?? "");
        setSubInformation({
            createdAt: formatVNDateFromISO(data.createdAt),
            updatedAt: formatVNDateFromISO(data.updatedAt),
        })
        setAvatar(data.avatarUri)
        setIsLoading(false);
    }

    const getDataFail = (error) => {
        console.log(error);
        setIsLoading(false);
    }

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
        const fullNameErr = validateFullName(formFields.fullName.value);
        const phoneErr = validatePhone(formFields.phone.value);
        const dobErr = validateDob(formFields.dob.value);
        const genderErr = validateGender(formFields.gender.value);
        updateError("fullName", fullNameErr || "");
        updateError("phone", phoneErr || "");
        updateError("dob", dobErr || "");
        updateError("gender", genderErr || "");
        if (fullNameErr || phoneErr || dobErr || genderErr) {
            return;
        }
        const formData = new FormData();
        formData.append("fullName", formFields.fullName.value);
        formData.append("phone", formFields.phone.value);
        formData.append("dob", new Date(formFields.dob.value).getTime());
        formData.append("gender", formFields.gender.value);

        if (imageFile) {
            formData.append("avatarFile", imageFile);
        }
        setIsLoading(true);
        accountSettingApi.updateProfile(formData, updateSuccess, updateFail);
    };

    const updateSuccess = (data) => {
        login(data.jwtToken);
        messageService.showMessage(Messages.MSG_I_00005, MESSAGE_TYPES.INFO);
        setIsLoading(false);
    }

    const updateFail = (error) => {
        if (error.response.data.httpStatusCode !== "OK") {
            messageService.showMessage(error.response.data.message, MESSAGE_TYPES.ERROR);
            setIsLoading(false);
        }
    }

    const handleUploadClick = () => {
        inputRef.current.click(); // kích file picker
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const previewURL = URL.createObjectURL(file);
            setAvatar(previewURL);
            setImageFile(file);
        }
    };

    const SmallAvatar = styled(Avatar)(({theme}) => ({
        width: "32px",
        height: "32px",
        color: "#fff",
        backgroundColor: theme.palette.primary.main,
    }));

    return (
        <>
            <Container maxWidth="xl" sx={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                width: "100%",
                height: "100%"
            }}>
                <Card sx={{
                    width: "fit-content",
                    minWidth: "700px",
                    height: "100%",
                    maxHeight: "fit-content",
                    borderRadius: "16px",
                }}>
                    <CardContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0 !important",
                        height: "100%",
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
                                Thông tin tài khoản
                            </Typography>
                            <MascotSvg/>
                        </Stack>
                        <Stack direction="row"
                               divider={<Divider orientation="vertical" flexItem sx={{margin: "0 !important"}}/>}
                               spacing={3} sx={{
                            width: "90%",
                            alignItems: "flex-start",
                            justifyContent: "space-around",
                            margin: "0 24px 24px",
                            height: "100%"
                        }}>
                            <Stack direction="column" spacing={3}
                                   sx={{width: "55%", margin: 3, justifyContent: "center", alignItems: "flex-start"}}>
                                <ValidationTextField label="Email" fieldName="email" value={formFields.email.value}
                                                     setValue={updateField} error={formFields.email.error}
                                                     setError={updateError} isRequired={true} size="small"
                                                     isDisabled={true}
                                                     type="text"/>
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
                                <ValidateDatePicker label="Ngày sinh" fieldName="dob"
                                                    value={formFields.dob.value}
                                                    setValue={updateField} error={formFields.dob.error}
                                                    setError={updateError} isRequired={true} size="small"
                                                    validatorFunction={validateDob}/>
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
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Button variant="contained" color="primary" sx={{textTransform: "none"}}
                                            onClick={submitForm}>
                                        <Typography variant="body1"
                                                    sx={{color: "white", textAlign: "center"}}>
                                            Hoàn thành
                                        </Typography>
                                    </Button>
                                </Box>
                            </Stack>
                            <Stack direction="column" spacing={3} sx={{
                                width: "35%",
                                height: "100%",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                margin: "0 !important"
                            }}>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                    badgeContent={
                                        <IconButton onClick={handleUploadClick}>
                                            <SmallAvatar>
                                                <CameraAltIcon fontSize="small" sx={{width: "24px", height: "24px"}}/>
                                            </SmallAvatar>
                                        </IconButton>
                                    }
                                    sx={{width: "60%"}}
                                >
                                    <Box sx={{width: "100%", position: "relative", aspectRatio: "1 / 1"}}>
                                        <Avatar
                                            alt="user avatar"
                                            src={avatar}
                                            sx={{width: "100%", height: "100%", position: "absolute", top: 0, left: 0}}
                                        />
                                    </Box>
                                </Badge>
                                <Typography variant="body1" sx={{ textAlign: "center" }}>
                                    <strong>Tạo ngày:</strong><br />
                                    {subInformation.createdAt ? subInformation.createdAt : ""}
                                </Typography>
                                <Typography variant="body1" sx={{ textAlign: "center" }}>
                                    <strong>Lần chỉnh sửa gần nhất:</strong><br />
                                    {subInformation.updatedAt ? subInformation.updatedAt : ""}
                                </Typography>
                                {/* input file ẩn */}
                                <input
                                    type="file"
                                    accept=".png, .jpg, .jpeg, .webp"
                                    ref={inputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
            {isLoading && <LoadingComponent/>}
        </>
    )
}
export default ProfilePage;