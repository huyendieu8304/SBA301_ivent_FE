import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {createTheme, ThemeProvider} from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/vi";
import { viVN as coreViVN } from '@mui/material/locale';
import { viVN as dataGridViVN } from '@mui/x-data-grid/locales';
import {AuthProvider} from "./context/AuthContext.jsx";
import MessageComponent from "./component/MessageComponent.jsx";

dayjs.locale("vi");
dayjs.extend(utc);
let theme = createTheme({
    // Theme customization goes here as usual, including tonalOffset and/or
    // contrastThreshold as the augmentColor() function relies on these
});

theme = createTheme(
    {
        palette: {
            primary: {
                main: "#12B76A",
            },
            success: {
                main: "#0BA5EC",
            },
            secondary: {
                main: "#FFFFFF",
            },
            buttonDefault: {
                main: "#ecf3f0",
            },
            backgroundColor: {
                main: "#27272A",
            },
            light: theme.palette.augmentColor({
                color: {
                    main: "#3D8361",
                },
                name: "light",
            }),
            purple: theme.palette.augmentColor({
                color: {
                    main: "#7F56D9",
                },
                name: "purple",
            }),
        },
        typography: {
            fontFamily: "Roboto, Helvetica, Arial, sans-serif, Comfortaa",
        },
    },
    coreViVN,
    dataGridViVN
);

export default theme;

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <App/>
                <MessageComponent/>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);