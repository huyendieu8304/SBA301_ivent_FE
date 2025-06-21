import { Suspense } from "react";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet} from "react-router-dom";
import LoadingComponent from "./component/LoadingComponent.jsx";
import {
    LazyAdminDashboard,
    LazyAdminLayout, LazyEmailValidationTokenPage, LazyErrorPage,
    LazyHomePage,
    LazyLoginPage,
    LazyMainLayout, LazyNotFoundPage,
    LazyRegisterAccountPage
} from "./common/LazyLoad.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import {ROLES} from "./common/Constant.jsx";
import MessageComponent from "./component/MessageComponent.jsx";

const routeDefinitions = createRoutesFromElements(
    <Route>
        <Route
            element={
                <Suspense fallback={<LoadingComponent />}>
                    <LazyMainLayout />
                </Suspense>
            }
        >
            <Route path="/" element={<LazyHomePage/>} />
            <Route path="/login" element={<LazyLoginPage/>} />
            <Route path="/register" element={<LazyRegisterAccountPage/>} />
        </Route>
        <Route
            element={
                <ProtectedRoute allowedRole={[ROLES.ADMIN]}/>
            }
        >
            <Route
                element={
                    <Suspense fallback={<LoadingComponent />}>
                        <LazyAdminLayout />
                    </Suspense>
                }
            >
                <Route path="/admin" element={<LazyAdminDashboard />} />
            </Route>
        </Route>
        <Route path="/validate/:token" element={<LazyEmailValidationTokenPage />} />
        <Route path="/error" element={<LazyErrorPage />} />
        <Route path="/*" element={<LazyNotFoundPage/>} />
    </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
    return <RouterProvider router={router} />;
}

export default App;