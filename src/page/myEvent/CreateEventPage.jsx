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

const GRAY_COLOR = "#3b3b3d"
const steps = [
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


function CreateEventPage(props) {
    const [activeStepId, setActiveStepId] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();

    const [formFields, setFormFields] = useState({
        name: {label: "Tên sự kiện", value: "", error: ""},
        isOnline: {label: "Hình thức sự kiện", value: false, error: ""},
        province: {label: "Tỉnh", value: "", error: ""},
        ward: {label: "Quận/Huyện", value: "", error: ""},
        location: {label: "Địa chỉ ", value: "", error: ""},

        description: {label: "Mô tả sự kiện ", value: "", error: ""},

        startTime: {label: "Thời gian bắt đầu sự kiện", value: null, error: ""},
        endTime: {label: "Thời gian kết thúc sự kiện", value: null, error: ""},
        startSellingTicketTime: {label: "Thời gian bắt đầu bán vé", value: null, error: ""},
        endSellingTicketTime: {label: "Thời gian kết thúc bán vé", value: null, error: ""},

        eventLogoUri: {label: "Logo sự kiện", value: null, error: ""},
        bannerUri: {label: "Banner sự kiện", value: null, error: ""},

        organizerName: {label: "Tên ban tổ chức", value: "", error: ""},
        organizerInformation: {label: "Thông tin ban tổ chức", value: "", error: ""},
        organizerLogoUri: {label: "Logo ban tổ chức", value: null, error: ""},

        bankName: {label: "Tên ngân hàng", value: "", error: ""},
        bankBranch: {label: "Chi nhánh", value: "", error: ""},
        bankNumber: {label: "Số tài khoản", value: "", error: ""},
        bankAccountOwner: {label: "Chủ tài khoản", value: "", error: ""},

        category: {label: "Thể loại sự kiện", value: "", error: ""},
        ticketType: {label: "Loại vé", value: [], error: ""},

    //     just for frontend
        isFree: {label: "Sự kiện miễn phí", value: false, error: ""},
    });

    const [categories, setCategories] = useState(CATEGORY_TEMP);
    //GET CATEGORY FROM BACKEND
    // todo useEffect(() => {
    //     setIsLoading(true);
    //     categoryApi.getCategories(getCategoriesSuccess, getCategoriesFail)
    // },[])
    //
    // const getCategoriesSuccess = (data) => {
    //     setCategories(data)
    //     setIsLoading(false);
    // }
    //
    // const getCategoriesFail = (data) => {
    //     console.log("get categories fail")
    //     console.error(data)
    //     setIsLoading(false);
    // }




    //FUNCTION FOR NAVIGATION
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        // todo: check xem có chỗ nào lỗi không trước khi chuyển qua bước tiếp theo
        //todo: cần xem mâu thuẫn giuwx mấy cái mà online thì ko cần wward, isFree thì ko cần ticket
        let newSkipped = skipped;
        if (isStepSkipped(activeStepId)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStepId);
        }
        setActiveStepId((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStepId((prevActiveStep) => prevActiveStep - 1);
    };

    //SUBMIT FORM
    const handleSubmit = () => {
        console.log("Submit form")
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
                    {steps.map((step, index) => {
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
                    onClick={activeStepId === steps.length - 1 ? handleSubmit : handleNext}
                    variant="contained"
                    sx={{
                        color: 'white',
                        textTransform: "none",
                        width: '150px',
                    }}
                >
                    {activeStepId === steps.length - 1 ? 'Tạo sự kiện' : 'Tiếp tục'}
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
                <EventPayment/>
            }

        </>
    );
}

export default CreateEventPage;