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

export const LazyAdminDashboard = React.lazy(
    () => import("../page/admin/AdminDashboard.jsx"),
);
export const LazyAdminEvent = React.lazy(
    () => import("../page/admin/AdminEventPage.jsx"),
);

export const LazyEmailValidationTokenPage = React.lazy(
    () => import("../page/EmailValidationTokenPage.jsx"),
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

export const LazyAdminLayout = React.lazy(
    () => import("../layout/AdminLayout.jsx"),
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
    () => import("../page/OAuth2RedirectPage.jsx"),
);

export const LazyCreateEventPage = React.lazy(
    () => import("../page/myEvent/CreateEventPage.jsx"),
)