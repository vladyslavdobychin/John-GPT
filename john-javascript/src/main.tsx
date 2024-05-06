import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import {Theme} from "@radix-ui/themes";
import "./styles/global.css";
import "./styles/theme-config.css";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Theme accentColor="violet">
                <App/>
            </Theme>
        </Provider>
    </React.StrictMode>
);
