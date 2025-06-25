import { Suspense } from "react";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet} from "react-router-dom";
import LoadingComponent from "./component/LoadingComponent.jsx";
import {
    LayzyEventDetailsPage,
    LazyAdminDashboard, LazyAdminEvent,
    LazyAdminLayout, LazyEmailValidationTokenPage, LazyErrorPage,
    LazyHomePage,
    LazyLoginPage,
    LazyMainLayout, LazyNotFoundPage, LazyProfilePage,
    LazyRegisterAccountPage
} from "./common/LazyLoad.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import {ROLES} from "./common/Constant.jsx";
import {Navigate} from "react-router";

const routeDefinitions = createRoutesFromElements(
    <Route>
        {/*WITH ALL ROLE*/}
        <Route element={<ProtectedRoute allowedRole={[ROLES.USER, ROLES.ADMIN]}/>}>
            <Route
                element={
                    <Suspense fallback={<LoadingComponent />}>
                        <LazyMainLayout />
                    </Suspense>
                }
            >
                <Route path="/profile" element={<LazyProfilePage/>} />
            </Route>
        </Route>

        {/*WITH ONLY ADMIN ROLE*/}
            <Route  path="/admin" element={<ProtectedRoute allowedRole={[ROLES.ADMIN]} />}>
                <Route
                    element={
                        <Suspense fallback={<LoadingComponent />}>
                            <LazyAdminLayout />
                        </Suspense>
                    }
                >
                    {/* Tự chuyển về /admin/event */}
                    <Route index element={<LazyAdminDashboard />} />

                    {/* Trang event table */}
                    <Route
                        path="event"
                        element={<LazyAdminEvent />}
                    />

                </Route>
            </Route>



        {/*WITHOUT ROLE*/}
        <Route
            element={
                <Suspense fallback={<LoadingComponent />}>
                    <LazyMainLayout />
                </Suspense>
            }
        >
            <Route path="/event/:id" element={<LayzyEventDetailsPage/>} />
            <Route path="/" element={<LazyHomePage/>} />
            <Route path="/login" element={<LazyLoginPage/>} />
            <Route path="/register" element={<LazyRegisterAccountPage/>} />
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