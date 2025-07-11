import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./styles/global.css";
import "./styles/theme-config.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <Theme accentColor="violet">
      <App />
    </Theme>
  </React.StrictMode>
  </QueryClientProvider>
);
