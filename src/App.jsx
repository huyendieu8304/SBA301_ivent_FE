import "./App.css";

import { Suspense } from "react";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router";
import LoadingComponent from "./component/LoadingComponent.jsx";
import {LazyHomePage, LazyMainLayout} from "./common/LazyLoad.jsx";

const routeDefinitions = createRoutesFromElements(
    // <Route>
    //     {/*Protected Routes*/}
    //     <Route
    //         path="/"
    //         element={
    //             <Suspense fallback={<LoadingComponent />}>
    //                 <LazyMainLayout />
    //             </Suspense>
    //         }
    //         id="root"
    //     >
    //         {/*All Role*/}
    //         <Route
    //             path="/"
    //             element={
    //                 <ProtectedRoute
    //                     allowedRole={[
    //                         ROLES.USER,
    //                         ROLES.STAFF,
    //                         ROLES.SYSTEM_ADMIN,
    //                     ]}
    //                 >
    //                     <Outlet />
    //                 </ProtectedRoute>
    //             }
    //         >
    //             <Route index element={<LazyHomePage />} />
    //             <Route
    //                 path="/member-profile/:user_id"
    //                 element={<LazyMemberProfile />}
    //             />
    //         </Route>
    //
    //         {/*Role User*/}
    //         <Route
    //             path="/"
    //             element={
    //                 <ProtectedRoute allowedRole={[ROLES.USER]}>
    //                     <Outlet />
    //                 </ProtectedRoute>
    //             }
    //         >
    //             <Route
    //                 path="/agricutural-plan-menu"
    //                 element={<LazyAgriculturalPlanMenuPage />}
    //             />
    //             <Route
    //                 path="/planning-input/:titleId/:typeId"
    //                 element={<LazyPlanningInput />}
    //             />
    //             <Route path="/type-input" element={<LazyTypeInput />}>
    //                 <Route
    //                     path={"setting-row"}
    //                     element={<LazySettingRowPage />}
    //                 />
    //                 <Route
    //                     path={"input-table/:planId"}
    //                     element={<LazyInputTablePage />}
    //                 />
    //                 <Route
    //                     path={"input-table"}
    //                     element={
    //                         <Navigate to="/type-input/input-table/17" replace />
    //                     }
    //                 />
    //             </Route>
    //         </Route>
    //
    //         {/*Role Admin & Staff*/}
    //         <Route
    //             path="/"
    //             element={
    //                 <ProtectedRoute
    //                     allowedRole={[ROLES.STAFF, ROLES.SYSTEM_ADMIN]}
    //                 >
    //                     <Outlet />
    //                 </ProtectedRoute>
    //             }
    //         >
    //             {/*<Route path="/member-list" element={<LazyMemberList />} />*/}
    //             <Route path="/users" element={<LazyUserListPage />} />
    //             <Route path="/notifications" element={<LazyNotifyTable />} />
    //         </Route>
    //
    //         {/*Role Admin*/}
    //         <Route
    //             path="/"
    //             element={
    //                 <ProtectedRoute allowedRole={[ROLES.SYSTEM_ADMIN]}>
    //                     <Outlet />
    //                 </ProtectedRoute>
    //             }
    //         >
    //             <Route
    //                 path="/office-users"
    //                 element={<LazyOfficeUserListPage />}
    //             />
    //         </Route>
    //     </Route>
    //
    //     {/*Public Routes*/}
    //     <Route
    //         path="/"
    //         element={
    //             <Suspense fallback={<LoadingComponent />}>
    //                 <LazyGenericLayout />
    //             </Suspense>
    //         }
    //     >
    //         <Route path="/login" element={<LazyUserLoginPage />} />
    //         <Route path="/login/staff" element={<LazyStaffLoginPage />} />
    //         <Route
    //             path="/register-account"
    //             element={<LazyRegisterAnAccount />}
    //         />
    //         <Route path="/error" element={<LazyErrorPage />} />
    //         <Route path="/*" element={<>NOT FOUND</>} />
    //     </Route>
    // </Route>,
    <Route
        element={
            <Suspense fallback={<LoadingComponent />}>
                <LazyMainLayout />
            </Suspense>
        }
    >
        <Route path="/" element={<LazyHomePage />} />
    </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
    return <RouterProvider router={router} />;
}

export default App;