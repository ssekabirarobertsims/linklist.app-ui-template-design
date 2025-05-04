import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./stylesheets/main.stylesheet.css";
import "./stylesheets/Dashboard.Home.Page.Stylesheet.css";
import "./stylesheets/Components.Stylesheet.css";
import "./stylesheets/Dashboard.Links.Page.Stylesheet.css";
import "./stylesheets/Dashboard.Settings.Page.Stylesheet.css";
import "./stylesheets/Landing.Home.Page.Component.Stylesheet.css";
import "./stylesheets/Dashboard.Information.Page.Stylesheet.css";
import "./stylesheets/Admin.Account.Login.Page.Stylesheet.css";
import "./stylesheets/Admin.Account.Signup.Page.Stylesheet.css";
import "./stylesheets/Admin.Account.Verification.Page.Stylesheet.css";
import "./stylesheets/Admin.Account.Subscription.Page.Stylesheet..css";
import "./stylesheets/Offline.Page.Stylesheet.css";
import "./stylesheets/Dashboard.Trash.Page.Stylesheet.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter> 
      <Routes>
        <Route path="/*" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
