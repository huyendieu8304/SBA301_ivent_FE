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
    LazyBookingTicketPage,
    LazyTransactionResultPage,
    LazyMyEventDetailPage,
    LazySearchEventsPage, LazySearchLayout,
} from "./common/LazyLoad.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import {ROLES} from "./common/Constant.jsx";

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

        {/*WITH ONLY USER ROLE*/}
        <Route element={<ProtectedRoute allowedRole={[ROLES.USER]}/>}>
            <Route path="/organizer"
                element={
                    <Suspense fallback={<LoadingComponent/>}>
                        <LazyOrganizerLayout/>
                    </Suspense>
                }
            >
                <Route path="my-events" element={<LazyMyEvents/>} />
                <Route path="create-event" element={<LazyCreateEventPage/>} />
                <Route path="event-detail/:eventId" element={<LazyMyEventDetailPage/>} />
            </Route>
            <Route
                element={
                    <Suspense fallback={<LoadingComponent />}>
                        <LazyMainLayout />
                    </Suspense>
                }
            >
                <Route path="/booking/:eventId" element={<LazyBookingTicketPage/>} />
                <Route path="/transaction-result" element={<LazyTransactionResultPage/>} />
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
        <Route
            element={
                <Suspense fallback={<LoadingComponent />}>
                    <LazySearchLayout />
                </Suspense>
            }
        >
            <Route path="/search" element={<LazySearchEventsPage/>} />
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