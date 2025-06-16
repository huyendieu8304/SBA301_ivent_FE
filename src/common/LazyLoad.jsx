import React from "react";

export const LazyHomePage = React.lazy(
    () => import("../../src/page/HomePage.jsx"),
);

export const LazyLoginPage = React.lazy(
    () => import("../../src/page/LoginPage.jsx"),
);

export const LazyRegisterAccountPage = React.lazy(
    () => import("../page/RegisterUserPage.jsx"),
);

export const LazyMainLayout = React.lazy(
    () => import("../layout/MainLayout.jsx"),
);
