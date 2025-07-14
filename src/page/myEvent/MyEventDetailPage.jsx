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
import {useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import loginPage from "../user/LoginPage.jsx";

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


const TEMP_EVENT = {
    "id": "04bd9cef-4d34-11f0-9cac-0242ac140002",
    "name": "Hội chợ Việc Làm 2025",
    "isOnline": null,
    "province": "Thành phố Hà Nội",
    "ward": "Phường Phúc Xá",
    "location": "Trường ĐH Quốc gia",
    // "description": "<p> Hội chợ giúp sinh viên kết nối với nhà tuyển dụng. </p>",
    "description": null,
    "startTime": "2025-07-10T08:00:00",
    "endTime": "2025-07-10T17:00:00",
    "startSellingTicketTime": "2025-06-01T00:00:00",
    "endSellingTicketTime": "2025-07-09T23:59:59",
    "eventLogoUri": "https://salt.tkbcdn.com/ts/ds/fa/28/59/2ad9a7ae8820f111273c640531ad4fcf.jpg",
    "bannerUri": "https://salt.tkbcdn.com/ts/ds/57/04/b1/bd123932d98c10ea3ede92bb548ca047.png",
    "organizerName": "Bộ GD & ĐT",
    "organizerInformation": "Tổ chức bởi Bộ Giáo dục và các doanh nghiệp liên kết",
    "organizerLogoUri": "https://salt.tkbcdn.com/ts/ds/fa/28/59/2ad9a7ae8820f111273c640531ad4fcf.jpg",
    "bankName": "BIDV",
    "bankBranch": "Chi nhánh Cầu Giấy",
    "bankNumber": "88889999",
    "bankAccountOwner": "B? GD & ÐT",
    "categoryId": "4",
    "ticketTypes": [
        {
            "id": "1",
            "name": "Vé phổ thông",
            "description": "Vé phổ thông",
            "totalQuantity": 50,
            "remain": 50,
            "minimumOrderQuantity": 3,
            "maximumOrderQuantity": 5,
            "price": "100000.00"
        },
        {
            "id": "2",
            "name": "Vé hạng 3",
            "description": "Vé hạng 3",
            "totalQuantity": 40,
            "remain": 40,
            "minimumOrderQuantity": 1,
            "maximumOrderQuantity": 5,
            "price": "200000.00"
        },
        {
            "id": "3",
            "name": "Vé hạng 2",
            "description": "Vé hạng 2",
            "totalQuantity": 30,
            "remain": 30,
            "minimumOrderQuantity": 1,
            "maximumOrderQuantity": 5,
            "price": "300000.00"
        },
        {
            "id": "4",
            "name": "Vé hạng nhất",
            "description": "Vé hạng nhất",
            "totalQuantity": 20,
            "remain": 20,
            "minimumOrderQuantity": 1,
            "maximumOrderQuantity": 5,
            "price": "400000.00"
        }
    ],
    // "status": "APPROVED"
    "status": "PENDING"
};

function mapEventResponseToFormFields(eventResponse) {
    return {
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
            needToCheckBeForSubmit: true,
            label: "Tỉnh",
            value: eventResponse.province || "",
            error: ""
        },
        ward: {
            needToCheckBeForSubmit: true,
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
            needToCheckBeForSubmit: true,
            label: "Thời gian bắt đầu bán vé",
            value: eventResponse.startSellingTicketTime || null,
            error: ""
        },
        endSellingTicketTime: {
            needToCheckBeForSubmit: true,
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
            needToCheckBeForSubmit: true,
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

//todo test lại create event

function CreateEventPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
        status: "",
    });

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
    // useEffect(() => {
    //     setIsLoading(true);
    //     categoryApi.getCategories(getCategoriesSuccess, getCategoriesFail)
    // }, [])
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

    useEffect(() => {
        setFormFields(mapEventResponseToFormFields(TEMP_EVENT));
    }, []);

    //SUBMIT FORM
    const handleUpdateEvent = () => {
        console.log(formFields);

        // const errorMessage = checkAllFieldsValid(formFields);
        // //còn lỗi thì không cho lưu đâu hẹ hẹ :>
        // if (errorMessage) {
        //     messageService.showMessage(errorMessage, MESSAGE_TYPES.ERROR);
        //     return;
        // }
        //
        // const formData = new FormData();
        // if (!formFields.isFree.value) {
        //     if (!formFields.ticketType.value || formFields.ticketType.value.length === 0 ) {
        //         messageService.showMessage(Messages.MSG_E_00017, MESSAGE_TYPES.ERROR);
        //         return;
        //     }
        //     formData.append("startSellingTicketTime", dayjs(formFields.startSellingTicketTime.value).format(DATETIME_FORMAT));
        //     formData.append("endSellingTicketTime", dayjs(formFields.endSellingTicketTime.value).format(DATETIME_FORMAT));
        //     formFields.ticketType.value.forEach((ticket, index) => {
        //         formData.append(`ticketTypes[${index}].id`, ticket.id.value);
        //         formData.append(`ticketTypes[${index}].name`, ticket.name.value);
        //         formData.append(`ticketTypes[${index}].description`, ticket.description.value);
        //         formData.append(`ticketTypes[${index}].price`, ticket.price.value);
        //         formData.append(`ticketTypes[${index}].totalQuantity`, ticket.totalQuantity.value);
        //         formData.append(`ticketTypes[${index}].minimumOrderQuantity`, ticket.minimumOrderQuantity.value);
        //         formData.append(`ticketTypes[${index}].maximumOrderQuantity`, ticket.maximumOrderQuantity.value);
        //     })
        // }
        //
        // formData.append("name", formFields.name.value);
        // formData.append("description", formFields.description.value);
        //
        // formData.append("isOnline", formFields.isOnline.value);
        // if (!formFields.isOnline.value) {
        //     formData.append("province", formFields.province.value);
        //     formData.append("ward", formFields.ward.value);
        // }
        // formData.append("location", formFields.location.value);
        //
        // formData.append("startTime", dayjs(formFields.startTime.value).format(DATETIME_FORMAT));
        // formData.append("endTime", dayjs(formFields.endTime.value).format(DATETIME_FORMAT));
        //
        // const eventLogo = formFields.eventLogoUri.value;
        // if (eventLogo && eventLogo instanceof File && eventLogo.size > 0) {
        //     formData.append("eventLogoFile", eventLogo);
        // }
        // const eventBanner = formFields.bannerUri.value;
        // if (eventBanner && eventBanner instanceof File && eventBanner.size > 0) {
        //     formData.append("bannerFile", eventBanner);
        // }
        //
        // formData.append("organizerName", formFields.organizerName.value);
        // formData.append("organizerInformation", formFields.organizerInformation.value);
        // const organizerLogo = formFields.organizerLogoUri.value;
        // if (organizerLogo && organizerLogo instanceof File && organizerLogo.size > 0) {
        //     formData.append("organizerLogoFile", organizerLogo);
        // }
        //
        // formData.append("bankName", formFields.bankName.value);
        // formData.append("bankBranch", formFields.bankBranch.value);
        // formData.append("bankAccountOwner", formFields.bankAccountOwner.value);
        // formData.append("bankNumber", formFields.bankNumber.value);
        //
        // formData.append("categoryId", formFields.category.value);
        //
        // setIsLoading(true)
        // eventApi.createEvent(formData, createSuccessfully, createFail)
    }

    const createSuccessfully = (data) => {
        messageService.showMessage(Messages.MSG_I_00008, MESSAGE_TYPES.INFO);
        setIsLoading(false);
        // todo navigate toi my events list
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

export default CreateEventPage;