import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import {Box, Stack, Typography, useTheme} from "@mui/material";
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
import {useNavigate, useParams} from "react-router";
import MyEventStatistic from "../../component/eventDetail/MyEventStatistic.jsx";

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

function mapEventResponseToFormFields(eventResponse) {
    const isFree = eventResponse.ticketTypes.length === 0;

    return {
        id: eventResponse.id || "",
        name: {
            needToCheckBeForSubmit: true,
            label: "Tên sự kiện",
            value: eventResponse.name || "",
            error: ""
        },
        isOnline: {
            needToCheckBeForSubmit: true,
            label: "Hình thức sự kiện",
            value: Boolean(eventResponse.isOnline) ?? false,
            error: ""
        },
        province: {
            needToCheckBeForSubmit: !eventResponse.isOnline,
            label: "Tỉnh",
            value: eventResponse.province || "",
            error: ""
        },
        ward: {
            needToCheckBeForSubmit: !eventResponse.isOnline,
            label: "Quận/Huyện",
            value: eventResponse.ward || "",
            error: ""
        },
        location: {
            needToCheckBeForSubmit: true,
            label: "Địa chỉ ",
            value: eventResponse.location || "",
            error: ""
        },
        description: {
            needToCheckBeForSubmit: true,
            label: "Mô tả sự kiện ",
            value: eventResponse.description || "",
            error: ""
        },
        startTime: {
            needToCheckBeForSubmit: true,
            label: "Thời gian bắt đầu sự kiện",
            value: eventResponse.startTime || null,
            error: ""
        },
        endTime: {
            needToCheckBeForSubmit: true,
            label: "Thời gian kết thúc sự kiện",
            value: eventResponse.endTime || null,
            error: ""
        },
        startSellingTicketTime: {
            needToCheckBeForSubmit: !isFree,
            label: "Thời gian bắt đầu bán vé",
            value: eventResponse.startSellingTicketTime || null,
            error: ""
        },
        endSellingTicketTime: {
            needToCheckBeForSubmit: !isFree,
            label: "Thời gian kết thúc bán vé",
            value: eventResponse.endSellingTicketTime || null,
            error: ""
        },
        eventLogoUri: {
            needToCheckBeForSubmit: true,
            label: "Logo sự kiện",
            value: eventResponse.eventLogoUri || null,
            error: ""
        },
        bannerUri: {
            needToCheckBeForSubmit: true,
            label: "Banner sự kiện",
            value: eventResponse.bannerUri || null,
            error: ""
        },
        organizerName: {
            needToCheckBeForSubmit: true,
            label: "Tên ban tổ chức",
            value: eventResponse.organizerName || "",
            error: ""
        },
        organizerInformation: {
            needToCheckBeForSubmit: true,
            label: "Thông tin ban tổ chức",
            value: eventResponse.organizerInformation || "",
            error: ""
        },
        organizerLogoUri: {
            needToCheckBeForSubmit: true,
            label: "Logo ban tổ chức",
            value: eventResponse.organizerLogoUri || null,
            error: ""
        },
        bankName: {
            needToCheckBeForSubmit: true,
            label: "Tên ngân hàng",
            value: eventResponse.bankName || "",
            error: ""
        },
        bankBranch: {
            needToCheckBeForSubmit: true,
            label: "Chi nhánh",
            value: eventResponse.bankBranch || "",
            error: ""
        },
        bankNumber: {
            needToCheckBeForSubmit: true,
            label: "Số tài khoản",
            value: eventResponse.bankNumber || "",
            error: ""
        },
        bankAccountOwner: {
            needToCheckBeForSubmit: true,
            label: "Chủ tài khoản",
            value: eventResponse.bankAccountOwner || "",
            error: ""
        },
        category: {
            needToCheckBeForSubmit: true,
            label: "Thể loại sự kiện",
            value: eventResponse.categoryId || "",
            error: ""
        },
        ticketType: {
            needToCheckBeForSubmit: !isFree,
            label: "Loại vé",
            value: (eventResponse.ticketTypes || []).map((ticket, index) => ({
                id: index,
                name: {
                    needToCheckBeForSubmit: true,
                    value: ticket.name || "",
                    error: ""
                },
                description: {
                    needToCheckBeForSubmit: true,
                    value: ticket.description || "",
                    error: ""
                },
                price: {
                    needToCheckBeForSubmit: true,
                    value: ticket.price || "",
                    error: ""
                },
                totalQuantity: {
                    needToCheckBeForSubmit: true,
                    value: ticket.totalQuantity || "",
                    error: ""
                },
                minimumOrderQuantity: {
                    needToCheckBeForSubmit: true,
                    value: ticket.minimumOrderQuantity || "",
                    error: ""
                },
                maximumOrderQuantity: {
                    needToCheckBeForSubmit: true,
                    value: ticket.maximumOrderQuantity || "",
                    error: ""
                },
            })),
            error: ""
        },
        isFree: {
            needToCheckBeForSubmit: true,
            label: "Sự kiện miễn phí",
            value: eventResponse.ticketTypes.length === 0,
            error: ""
        },
        status: eventResponse.status || "",
    };
}

function MyEventDetailPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {eventId} = useParams();

    const [formFields, setFormFields] = useState({
        id: "",
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
        status: "",
    });
    const [ticketTypes, setTicketTypes] = useState([]);

    //for validate before send
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

    //get event's details
    useEffect(() => {
        setIsLoading(true);
        eventApi.getMyEventDetails(eventId, getEventDetailSuccess, getEventDetailFail);
    }, []);

    const getEventDetailSuccess = (data) => {
        setFormFields(mapEventResponseToFormFields(data));
        setTicketTypes(data.ticketTypes);
        setIsLoading(false);
    }

    const getEventDetailFail = (error) => {
        if (error.response.data.httpStatusCode !== "OK") {
            messageService.showMessage(error.response.data.message, MESSAGE_TYPES.ERROR);
            setIsLoading(false);
        }
    }

    //SUBMIT FORM
    const handleUpdateEvent = () => {
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
                formData.append(`ticketTypes[${index}].id`, ticket.id.value);
                formData.append(`ticketTypes[${index}].name`, ticket.name.value);
                formData.append(`ticketTypes[${index}].description`, ticket.description.value);
                formData.append(`ticketTypes[${index}].price`, ticket.price.value);
                formData.append(`ticketTypes[${index}].totalQuantity`, ticket.totalQuantity.value);
                formData.append(`ticketTypes[${index}].minimumOrderQuantity`, ticket.minimumOrderQuantity.value);
                formData.append(`ticketTypes[${index}].maximumOrderQuantity`, ticket.maximumOrderQuantity.value);
            })
        }

        formData.append("id", formFields.id);

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

        const eventLogo = formFields.eventLogoUri.value;
        if (eventLogo && eventLogo instanceof File && eventLogo.size > 0) {
            formData.append("eventLogoFile", eventLogo);
        }
        const eventBanner = formFields.bannerUri.value;
        if (eventBanner && eventBanner instanceof File && eventBanner.size > 0) {
            formData.append("bannerFile", eventBanner);
        }

        formData.append("organizerName", formFields.organizerName.value);
        formData.append("organizerInformation", formFields.organizerInformation.value);
        const organizerLogo = formFields.organizerLogoUri.value;
        if (organizerLogo && organizerLogo instanceof File && organizerLogo.size > 0) {
            formData.append("organizerLogoFile", organizerLogo);
        }

        formData.append("bankName", formFields.bankName.value);
        formData.append("bankBranch", formFields.bankBranch.value);
        formData.append("bankAccountOwner", formFields.bankAccountOwner.value);
        formData.append("bankNumber", formFields.bankNumber.value);

        formData.append("categoryId", formFields.category.value);

        setIsLoading(true)
        eventApi.updateMyEventDetails(formData, updateSuccessfully, updateFail)
    }

    const updateSuccessfully = (data) => {
        messageService.showMessage(Messages.MSG_I_00011, MESSAGE_TYPES.INFO);
        setIsLoading(false);
        navigate("/organizer/my-events");
    }

    const updateFail = (error) => {
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
    const isDisabled = formFields.status !== "PENDING"

    return (
        <>
            <Typography variant="h1" color="primary"
            style={{
                fontWeight: "bold",
                fontSize: "4rem",
            }}>
                Thông tin sự kiện
            </Typography>
            <Typography
                color={"warning"}
                style={{
                    fontStyle: "italic",
                    paddingLeft: "16px",
                }}
            >
                Lưu ý: Bạn chỉ có thể thay đổi thông tin sự kiện khi sự kiện chưa được duyệt.
            </Typography>

            {ticketTypes?.length > 0 && isDisabled &&
                (
                    <MyEventStatistic
                        ticketTypes={ticketTypes || []
                        }
                    />
                )
            }
            <EventInfo
                formFields={formFields}
                setFormFields={setFormFields}
                categories={categories}
                updateField={updateField}
                updateError={updateError}
                isDisabled={isDisabled}
            />

            <EventTicket
                formFields={formFields}
                setFormFields={setFormFields}
                updateField={updateField}
                updateError={updateError}
                isDisabled={isDisabled}
            />

            <EventPayment
                formFields={formFields}
                setFormFields={setFormFields}
                updateField={updateField}
                updateError={updateError}
                isDisabled={isDisabled}
            />

            {formFields.status === "PENDING" &&
                <Box sx={{
                    marginTop: '20px',
                }}
                     display="flex"
                     justifyContent="center"
                >
                    <Button
                        onClick={handleUpdateEvent}
                        size="large"
                        variant="contained"
                        sx={{
                            color: 'white',
                            textTransform: "none",
                        }}
                    >
                        Cập nhật thông tin
                    </Button>
                </Box>
            }
        </>
    );
}

export default MyEventDetailPage;