import React from "react";

export const LazyHomePage = React.lazy(
    () => import("../../src/page/HomePage.jsx"),
);

export const LazyMainLayout = React.lazy(
    () => import("../../src/component/Layout.jsx"),
);