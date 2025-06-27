import { Suspense } from "react";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet} from "react-router-dom";
import LoadingComponent from "./component/LoadingComponent.jsx";
import {
    LazyEventDetailsPage, LazyOrganizerLayout,
    LazyAdminDashboard,
    LazyAdminLayout, LazyEmailValidationTokenPage, LazyErrorPage,
    LazyHomePage,
    LazyLoginPage,
    LazyMainLayout, LazyNotFoundPage, LazyProfilePage,
    LazyRegisterAccountPage, LazyCreateEventPage
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
        <Route element={<ProtectedRoute allowedRole={[ROLES.ADMIN]}/>}>
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
                {/*<Route path="/" element={<LazyAdminDashboard/>}/>*/}
                {/*todo: uncomment below*/}
                {/*<Route path="/create-event" element={<LazyCreateEventPage/>} />*/}
            </Route>
        </Route>

        {/*todo: for test*/}
        <Route
            path="/organizer"
            element={
                <Suspense fallback={<LoadingComponent/>}>
                    <LazyOrganizerLayout/>
                </Suspense>
            }
        >
            <Route path="create-event" element={<LazyCreateEventPage/>}/>
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