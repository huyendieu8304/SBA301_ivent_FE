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
    () => import("../page/operator/./Dashboard"),
);
export const LazyOperatorEvent = React.lazy(
    () => import("../page/operator/EventPage.jsx"),
);
export const LazyOperatorEventPending = React.lazy(
    () => import("../page/operator/PendingPage.jsx"),
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
    () => import("../layout/./OperatorLayout"),
);

export const LazySimpleLayout = React.lazy(
    () => import("../layout/SimpleLayout.jsx"),
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