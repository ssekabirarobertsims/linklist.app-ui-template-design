import React, { useEffect } from "react";
import "../stylesheets/Dashboard.Settings.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import AdminAccountVerificationAlertMessageComponent from "../components/Admin.Account.Verification.Alert.Message";

const DashboardInformationPageElementsComponent: React.FunctionComponent = () => {

useEffect(() => {
    document.title = "Dashboard - Information | LinkList";
}, []);

    return <>
            <CookiesSiteMessageComponent /> 
            <AdminAccountVerificationAlertMessageComponent /> 
            <NotificationsSideBarComponent />
        <section className={String("dashboard-information-page-elements-component").toLocaleLowerCase()}>
            <div className={String("dashboard-information-page-elements-component-content-wrapper").toLocaleLowerCase()}>
            <article className={String("dashboard-information-page-content-component").toLocaleLowerCase()}>
            <br />
            <h1 className={String("page-heading").toLocaleLowerCase()}>App Information</h1>
            <p className={String("app-version-tag").toLocaleLowerCase()}>Version: v1.0.1({String(`${"Official Build"}`)})</p>
            <p className={String("app-version-tag").toLocaleLowerCase()}>Release: 30/04/2025</p>
            <p>Linklist is a minimalist, open-source SaaS app designed for saving and organizing your favorite website links. Whether it’s articles, tools, docs, or resources — Linklist makes sure you never lose a useful URL again.
            </p>
            <p>Design Source Code: <a href="https://github.com/ssekabirarobertsims/linklist.app-ui-template-design" target="_blank">github</a></p>
            <p>Developer/Engineer: <a href="https://ssekabirarobertsims.netlify.app/" target="_blank">ssekabira robert sims</a></p>
            <p>API: <a href="https://api-linklist-restapi.onrender.com/" target="_blank">api.linklist.restapi</a></p>
            <br />
            <h3>Linklist.app</h3>
            <span>Linklist &copy;right {Number(2025 as Required<Readonly<number>>)} All Rights Reserved</span>
        </article>
            </div>
        </section>
    </>
}

export default DashboardInformationPageElementsComponent; 