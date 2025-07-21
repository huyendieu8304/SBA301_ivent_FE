import React from "react";

export const LazyHomePage = React.lazy(
    () => import("../page/user/HomePage.jsx"),
);

export const LazyLoginPage = React.lazy(
    () => import("../page/user/LoginPage.jsx"),
);

export const LazyRegisterAccountPage = React.lazy(
    () => import("../page/user/RegisterUserPage.jsx"),
);

export const LazyProfilePage = React.lazy(
    () => import("../page/user/ProfilePage.jsx"),
);

export const LazyOperatorDashboard = React.lazy(
    () => import("../page/operator/Dashboard"),
);
export const LazyOperatorEvent = React.lazy(
    () => import("../page/operator/Pending.jsx"),
);
export const LazyOperatorEventPending = React.lazy(
    () => import("../page/operator/Event.jsx"),
);

export const LazyEmailValidationTokenPage = React.lazy(
    () => import("../page/user/EmailValidationTokenPage.jsx"),
);

export const LazyErrorPage = React.lazy(
    () => import("../page/ErrorPage.jsx"),
);

export const LazyNotFoundPage = React.lazy(
    () => import("../page/NotFoundPage.jsx"),
);

export const LazyMainLayout = React.lazy(
    () => import("../layout/MainLayout.jsx"),
);

export const LazyOperatorLayout = React.lazy(
    () => import("../layout/OperatorLayout"),
);

export const LazyAdminLayout = React.lazy(
    () => import("../layout/AdminLayout.jsx"),
);

export const LazySimpleLayout = React.lazy(
    () => import("../layout/SimpleLayout.jsx"),
);

export const LazySearchLayout = React.lazy(
    () => import("../layout/SearchLayout.jsx"),
);


export const LazyForgotPasswordPage = React.lazy(
    () => import("../page/user/ForgotPasswordPage.jsx"),
);

export const LazyMyEvents = React.lazy(
    () => import("../page/user/MyEvents.jsx")
);

export const LazyEventDetailsPage = React.lazy(
    () => import("../page/event/EventDetailsPage.jsx"),
)
export const LazyEventDetail = React.lazy(
    () => import("../page/operator/EventDetail.jsx"),
)

export const LazyOrganizerLayout = React.lazy(
    () => import("../layout/OrganizerLayout.jsx"),
)

export const LazyOAuth2RedirectPage = React.lazy(
    () => import("../page/user/OAuth2RedirectPage.jsx"),
);

export const LazyCreateEventPage = React.lazy(
    () => import("../page/myEvent/CreateEventPage.jsx"),
)

export const LazyBookingTicketPage = React.lazy(
    () => import("../page/event/BookingTicket.jsx"),
)

export const LazyTransactionResultPage = React.lazy(
    () => import("../page/event/TransactionResult.jsx"),
)
export const LazyMyBoughtTickets = React.lazy(
    () => import("../page/user/MyBoughtTickets.jsx"),
);

export const LazyTicketDetail = React.lazy(
    () => import("../page/user/TicketDetail.jsx"),
);

export const LazyMyEventDetailPage = React.lazy(
    () => import("../page/myEvent/MyEventDetailPage.jsx"),
)

export const LazyChangePasswordPage = React.lazy(
    () => import("../page/user/ChangePasswordPage.jsx"),
)

export const LazyCreateAdminAccountPage = React.lazy(
    () => import("../page/admin/CreateAdminAccount.jsx"),
);

export const LazyAdminAccountPage = React.lazy(
    () => import("../page/admin/AccountPage.jsx"),
);
export const LazyAdminDashboard = React.lazy(
    () => import("../page/admin/Dashboard.jsx"),
);


export const LazyAdminUserBanList = React.lazy(
    () => import("../page/admin/UserBanList.jsx"),
);

export const LazySearchEventsPage = React.lazy(
    () => import("../page/event/SearchEventsPage.jsx"),
)

