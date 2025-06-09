// import "./App.css";

import { Suspense } from "react";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router";
import LoadingComponent from "./component/LoadingComponent.jsx";
import {LazyHomePage, LazyLoginPage, LazyMainLayout, LazySecondaryLayout} from "./common/LazyLoad.jsx";

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
        </Route>
        <Route
            element={
                <Suspense fallback={<LoadingComponent />}>
                    <LazySecondaryLayout />
                </Suspense>
            }
        >
            <Route path="/login" element={<LazyLoginPage/>} />
        </Route>
    </Route>

);

const router = createBrowserRouter(routeDefinitions);

function App() {
    return <RouterProvider router={router} />;
}

export default App;