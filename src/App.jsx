import { Suspense } from "react";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet} from "react-router-dom";
import LoadingComponent from "./component/LoadingComponent.jsx";
import {
    LazyEventDetailsPage,
    LazyOrganizerLayout,
    LazyAdminDashboard,
    LazyAdminEvent,
    LazyAdminLayout,
    LazyEmailValidationTokenPage,
    LazyErrorPage,
    LazyHomePage,
    LazyLoginPage,
    LazyMainLayout,
    LazyNotFoundPage,
    LazyProfilePage,
    LazyRegisterAccountPage,
    LazyMyEvents,
    LazyOAuth2RedirectPage,
    LazySimpleLayout,
    LazyForgotPasswordPage,
    LazyCreateEventPage,
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
                <Route path="/my-events" element={<LazyMyEvents/>} />
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

        {/*WITH ONLY USER ROLE*/}
        <Route path="/organizer" element={<ProtectedRoute allowedRole={[ROLES.USER]}/>}>
            <Route
                element={
                    <Suspense fallback={<LoadingComponent/>}>
                        <LazyOrganizerLayout/>
                    </Suspense>
                }
            >
                {/* todo: cho nay bo trang my events (list) */}
                <Route path="create-event" element={<LazyCreateEventPage/>} />
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
            <Route path="/event/:id" element={<LazyEventDetailsPage/>} />
            <Route path="/" element={<LazyHomePage/>} />
            <Route path="/login" element={<LazyLoginPage/>} />
            <Route path="/register" element={<LazyRegisterAccountPage/>} />
        </Route>

        {/*SIMPLE LAYOUT*/}
        <Route
            element={
                <Suspense fallback={<LoadingComponent />}>
                    <LazySimpleLayout />
                </Suspense>
            }
        >
            <Route path="/oauth2-redirect" element={<LazyOAuth2RedirectPage/>} />
            <Route path="/reset-password/:token" element={<LazyForgotPasswordPage/>} />
            <Route path="/validate/:token" element={<LazyEmailValidationTokenPage />} />
            <Route path="/error" element={<LazyErrorPage />} />
            <Route path="/*" element={<LazyNotFoundPage/>} />
        </Route>
    </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
    return <RouterProvider router={router} />;
}

export default App;