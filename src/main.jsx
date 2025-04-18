import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import "./index.css";
import { MainProvider } from "./components/Context/MainContext";
import { AuthProvider } from "./components/Context/AuthContext";
import App from "./App";
import { ThemeProvider } from "./components/Context/theme-provider";

createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <MainProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Toaster richColors position="bottom-center" />
          <App />
        </ThemeProvider>
      </MainProvider>
    </AuthProvider>
  </Router>
);
