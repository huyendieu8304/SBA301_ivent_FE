import React from "react";

export const LazyHomePage = React.lazy(
    () => import("../../src/page/HomePage.jsx"),
);

export const LazyLoginPage = React.lazy(
    () => import("../../src/page/LoginPage.jsx"),
);

export const LazyMainLayout = React.lazy(
    () => import("../Layout/MainLayout.jsx"),
);

export const LazySecondaryLayout = React.lazy(
    () => import("../Layout/SecondaryLayout.jsx"),
);