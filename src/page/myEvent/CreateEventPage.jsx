import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {useState} from "react";
import {Stack, useTheme} from "@mui/material";
import EventTicket from "../../component/eventDetail/EventTicket.jsx";
import EventInfo from "../../component/eventDetail/EventInfo.jsx";
import EventPayment from "../../component/eventDetail/EventPayment.jsx";

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

function CreateEventPage(props) {
    const [activeStepId, setActiveStepId] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const theme = useTheme();

    const [formFields, setFormFields] = useState({
        name: {label: "Tên sự kiện", value: "", error: ""},
        isOnline: {label: "Hình thức sự kiện", value: "", error: ""},
        province: {label: "Tỉnh", value: "", error: ""},
        ward: {label: "Quận/Huyện", value: "", error: ""},
        location: {label: "Địa chỉ ", value: "", error: ""},

        startTime: {label: "Thời gian bắt đầu", value: "", error: ""},
        endTime: {label: "Thời gian kết thúc", value: "", error: ""},
        startSellingTicketTime: {label: "", value: "", error: ""},
        endSellingTicketTime: {label: "", value: "", error: ""},

        eventLogoUri: {label: "", value: "", error: ""},
        bannerUri: {label: "", value: "", error: ""},

        organizerName: {label: "Tên ban tổ chức", value: "", error: ""},
        organizerInformation: {label: "Thông tin ban tổ chức", value: "", error: ""},
        organizerLogoUri: {label: "", value: "", error: ""},

        bankName: {label: "Tên ngân hàng", value: "", error: ""},
        bankBranch: {label: "Chi nhánh", value: "", error: ""},
        bankNumber: {label: "Số tài khoản", value: "", error: ""},
        bankAccountOwner: {label: "Chủ tài khoản", value: "", error: ""},

        category: {label: "Thể loại sự kiện", value: "", error: ""},
        ticketType: {label: "Loại vé", value: "", error: ""},
    });

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
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

    const handleSubmit = () => {
        console.log("Submit form")
    }

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
                />
            }

            {activeStepId === 1 &&
                <EventTicket/>
            }

            {activeStepId === 2 &&
                <EventPayment/>
            }

        </>
    );
}

export default CreateEventPage;