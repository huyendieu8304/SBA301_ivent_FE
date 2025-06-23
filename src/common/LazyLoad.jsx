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

export const LayzyEventDetailsPage = React.lazy(
    () => import("../page/EventDetailsPage.jsx"),
)
