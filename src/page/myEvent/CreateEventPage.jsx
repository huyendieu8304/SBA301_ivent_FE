import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import {Stack, useTheme} from "@mui/material";
import EventTicket from "../../component/eventDetail/EventTicket.jsx";
import EventInfo from "../../component/eventDetail/EventInfo.jsx";
import EventPayment from "../../component/eventDetail/EventPayment.jsx";
import LoadingComponent from "../../component/LoadingComponent.jsx";
import categoryApi from "../../api/service/categoryApi.jsx";
import dayjs from "dayjs";
import {DATETIME_FORMAT, MESSAGE_TYPES} from "../../common/Constant.jsx";
import {messageService} from "../../service/MessageService.jsx";
import Messages from "../../common/Message.jsx";
import eventApi from "../../api/service/eventApi.jsx";
import {checkAllFieldsValid} from "../../common/ValidateFunction.jsx";
import {useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const STEPS = [
    {
        id: 0,
        label: 'Thông tin sự kiện',
        param: "info"
    }, {
        id: 1,
        label: 'Loại vé',
        param: "ticket"
    }, {
        id: 2,
        label: 'Thông tin thanh toán',
        param: "payment"
    }
];

const CATEGORY_TEMP= [
    {
        "id": "1",
        "name": "Nh?c s?ng"
    },
    {
        "id": "2",
        "name": "Sân kh?u & ngh? thu?t"
    },
    {
        "id": "3",
        "name": "Th? thao"
    },
    {
        "id": "4",
        "name": "Khác"
    }
];

// todo tách ra cho từng page, sau mỗi page lại validate lại, tới tận cuối mới tạo form data
function CreateEventPage(props) {
    const [activeStepId, setActiveStepId] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const theme = useTheme();

    const [formFields, setFormFields] = useState({
        name: {needToCheckBeForSubmit: true, label: "Tên sự kiện", value: "", error: ""},
        isOnline: {needToCheckBeForSubmit: true, label: "Hình thức sự kiện", value: false, error: ""},
        province: {needToCheckBeForSubmit: true, label: "Tỉnh", value: "", error: ""},
        ward: {needToCheckBeForSubmit: true, label: "Quận/Huyện", value: "", error: ""},
        location: {needToCheckBeForSubmit: true, label: "Địa chỉ ", value: "", error: ""},

        description: {needToCheckBeForSubmit: true, label: "Mô tả sự kiện ", value: "", error: ""},

        startTime: {needToCheckBeForSubmit: true, label: "Thời gian bắt đầu sự kiện", value: null, error: ""},
        endTime: {needToCheckBeForSubmit: true, label: "Thời gian kết thúc sự kiện", value: null, error: ""},
        startSellingTicketTime: {needToCheckBeForSubmit: true,label: "Thời gian bắt đầu bán vé", value: null, error: ""},
        endSellingTicketTime: {needToCheckBeForSubmit: true, label: "Thời gian kết thúc bán vé", value: null, error: ""},

        eventLogoUri: {needToCheckBeForSubmit: true, label: "Logo sự kiện", value: null, error: ""},
        bannerUri: {needToCheckBeForSubmit: true, label: "Banner sự kiện", value: null, error: ""},

        organizerName: {needToCheckBeForSubmit: true, label: "Tên ban tổ chức", value: "", error: ""},
        organizerInformation: {needToCheckBeForSubmit: true, label: "Thông tin ban tổ chức", value: "", error: ""},
        organizerLogoUri: {needToCheckBeForSubmit: true, label: "Logo ban tổ chức", value: null, error: ""},

        bankName: {needToCheckBeForSubmit: true, label: "Tên ngân hàng", value: "", error: ""},
        bankBranch: {needToCheckBeForSubmit: true, label: "Chi nhánh", value: "", error: ""},
        bankNumber: {needToCheckBeForSubmit: true, label: "Số tài khoản", value: "", error: ""},
        bankAccountOwner: {needToCheckBeForSubmit: true, label: "Chủ tài khoản", value: "", error: ""},

        category: {needToCheckBeForSubmit: true, label: "Thể loại sự kiện", value: "", error: ""},
        ticketType: {needToCheckBeForSubmit: true, label: "Loại vé", value: [], error: ""},

    //     just for frontend
        isFree: {needToCheckBeForSubmit: true, label: "Sự kiện miễn phí", value: false, error: ""},
    });

    useEffect(() => {
        setFormFields((prev) => ({
            ...prev,
            province: {
                ...prev.province,
                needToCheckBeForSubmit: !prev.isOnline.value,
            },
            ward: {
                ...prev.ward,
                needToCheckBeForSubmit: !prev.isOnline.value,
            },
        }));
    }, [formFields.isOnline.value]);

    useEffect(() => {
        setFormFields((prev) => ({
            ...prev,
            startSellingTicketTime: {
                ...prev.startSellingTicketTime,
                needToCheckBeForSubmit: !prev.isFree.value,
            },
            endSellingTicketTime: {
                ...prev.endSellingTicketTime,
                needToCheckBeForSubmit: !prev.isFree.value,
            },
            ticketType: {
                ...prev.ticketType,
                needToCheckBeForSubmit: !prev.isFree.value,
            },
        }));
    }, [formFields.isFree.value]);

    const [categories, setCategories] = useState(CATEGORY_TEMP);
    useEffect(() => {
        setIsLoading(true);
        categoryApi.getCategories(getCategoriesSuccess, getCategoriesFail)
    }, [])

    const getCategoriesSuccess = (data) => {
        setCategories(data)
        setIsLoading(false);
    }

    const getCategoriesFail = (data) => {
        console.log("get categories fail")
        console.error(data)
        setIsLoading(false);
    }


    useEffect(() => {
        const stepParam = searchParams.get("step");
        const foundStep = STEPS.find((step) => step.param === stepParam)

        if (foundStep) {
            setActiveStepId(foundStep.id);
        } else {
            // Không có stepParam hoặc không hợp lệ → reset về step 0 và cập nhật URL
            setActiveStepId(0);
            navigate(`?step=${STEPS[0].param}`, { replace: true });
        }

    }, [searchParams]);

    //FUNCTION FOR NAVIGATION
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        // todo: check xem có chỗ nào lỗi không trước khi chuyển qua step tiếp theo
        const nextStep = activeStepId + 1;
        let newSkipped = skipped;
        //nếu như quay lại trang mà mình đã từng tới xong next
        //thì bỏ nó ra khỏi danh sách isSkipped
        //vid dụ tới trang 3 rồi nhưng lại quay về trang 2 sửa
        if (isStepSkipped(activeStepId)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStepId);
        }
        setActiveStepId((nextStep));
        setSkipped(newSkipped);
        navigate(`?step=${STEPS[nextStep].param}`);
    };

    const handleBack = () => {
        const prevStep = activeStepId - 1;
        setActiveStepId((prevStep));
        navigate(`?step=${STEPS[prevStep].param}`);
    };

    //SUBMIT FORM
    const handleSubmit = () => {
        const errorMessage = checkAllFieldsValid(formFields);
        //còn lỗi thì không cho lưu đâu hẹ hẹ :>
        if (errorMessage) {
            messageService.showMessage(errorMessage, MESSAGE_TYPES.ERROR);
            return;
        }

        const formData = new FormData();
        if (!formFields.isFree.value) {
            if (!formFields.ticketType.value || formFields.ticketType.value.length === 0 ) {
                messageService.showMessage(Messages.MSG_E_00017, MESSAGE_TYPES.ERROR);
                return;
            }
            formData.append("startSellingTicketTime", dayjs(formFields.startSellingTicketTime.value).format(DATETIME_FORMAT));
            formData.append("endSellingTicketTime", dayjs(formFields.endSellingTicketTime.value).format(DATETIME_FORMAT));
            formFields.ticketType.value.forEach((ticket, index) => {
                formData.append(`ticketTypes[${index}].name`, ticket.name.value);
                formData.append(`ticketTypes[${index}].description`, ticket.description.value);
                formData.append(`ticketTypes[${index}].price`, ticket.price.value);
                formData.append(`ticketTypes[${index}].totalQuantity`, ticket.totalQuantity.value);
                formData.append(`ticketTypes[${index}].minimumOrderQuantity`, ticket.minimumOrderQuantity.value);
                formData.append(`ticketTypes[${index}].maximumOrderQuantity`, ticket.maximumOrderQuantity.value);
            })
        }

        formData.append("name", formFields.name.value);
        formData.append("description", formFields.description.value);

        formData.append("isOnline", formFields.isOnline.value);
        if (!formFields.isOnline.value) {
            formData.append("province", formFields.province.value);
            formData.append("ward", formFields.ward.value);
        }
        formData.append("location", formFields.location.value);

        formData.append("startTime", dayjs(formFields.startTime.value).format(DATETIME_FORMAT));
        formData.append("endTime", dayjs(formFields.endTime.value).format(DATETIME_FORMAT));

        formData.append("eventLogoFile", formFields.eventLogoUri.value);
        formData.append("bannerFile", formFields.bannerUri.value);

        formData.append("organizerName", formFields.organizerName.value);
        formData.append("organizerInformation", formFields.organizerInformation.value);
        formData.append("organizerLogoFile", formFields.organizerLogoUri.value);

        formData.append("bankName", formFields.bankName.value);
        formData.append("bankBranch", formFields.bankBranch.value);
        formData.append("bankAccountOwner", formFields.bankAccountOwner.value);
        formData.append("bankNumber", formFields.bankNumber.value);

        formData.append("categoryId", formFields.category.value);

        setIsLoading(true)
        eventApi.createEvent(formData, createSuccessfully, createFail)
    }

    const createSuccessfully = (data) => {
        messageService.showMessage(Messages.MSG_I_00008, MESSAGE_TYPES.INFO);
        setIsLoading(false);
        navigate("/organizer/my-events");
    }

    const createFail = (error) => {
        if (error.response.data.httpStatusCode !== "OK") {
            messageService.showMessage(error.response.data.message, MESSAGE_TYPES.ERROR);
            setIsLoading(false);
        }
    }

    //common update field value and error
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

    if (isLoading) return <LoadingComponent/>

    return (
        <>
            <Stack
                direction={'row'}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: "0 10px",
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        color: 'white',
                        textTransform: "none",
                        width: '150px',
                        '&.Mui-disabled': {
                            color: 'white',
                            backgroundColor: '#9e9e9e',
                        },
                    }}
                    disabled={activeStepId === 0}
                    onClick={handleBack}
                >
                    Quay lại
                </Button>
                <Stepper
                    activeStep={activeStepId}
                    sx={{
                        flex: '1 1 auto',
                        margin: '0 10px',
                    }}
                >
                    {STEPS.map((step, index) => {
                        const stepProps = {};

                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step
                                key={step.id}
                                {...stepProps}
                                sx={{
                                    '& .MuiStepLabel-label': {
                                        color: 'white',
                                    },
                                    '& .MuiStepLabel-label.Mui-completed': {
                                        color: 'white', // khi đã hoàn thành
                                    },
                                    '& .MuiStepLabel-label.Mui-active': {
                                        color: 'white', // khi đang active
                                    },
                                    '& .MuiStepIcon-root': {
                                        color: 'white', // màu số khi chưa hoàn thành
                                    },
                                    '& .MuiStepIcon-root.Mui-completed': {
                                        color: theme.palette.primary.main, // màu số khi đã hoàn thành
                                    },
                                }}
                            >
                                <StepLabel>
                                    {step.label}
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <Button
                    onClick={activeStepId === STEPS.length - 1 ? handleSubmit : handleNext}
                    variant="contained"
                    sx={{
                        color: 'white',
                        textTransform: "none",
                        width: '150px',
                    }}
                >
                    {activeStepId === STEPS.length - 1 ? 'Tạo sự kiện' : 'Tiếp tục'}
                </Button>
            </Stack>

            {activeStepId === 0 &&
                <EventInfo
                    formFields={formFields}
                    setFormFields={setFormFields}
                    categories = {categories}
                    updateField={updateField}
                    updateError={updateError}
                />
            }

            {activeStepId === 1 &&
                <EventTicket
                    formFields={formFields}
                    setFormFields={setFormFields}
                    updateField={updateField}
                    updateError={updateError}
                />
            }

            {activeStepId === 2 &&
                <EventPayment
                    formFields={formFields}
                    setFormFields={setFormFields}
                    updateField={updateField}
                    updateError={updateError}
                />
            }

        </>
    );
}

export default CreateEventPage;