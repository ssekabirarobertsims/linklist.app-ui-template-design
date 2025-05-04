import React, { useEffect } from "react";
import DashboardPageNavigationBarComponent from "../components/Dashboard.Navigation.Bar.Component";
import DashboardPageSideBarComponent from "../components/Side.Bar.Component";
import DashboardInformationPageContentComponent from "./components/Dashboard.Information.Page.Content.Component";
import "../stylesheets/Dashboard.Settings.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";

const DashboardInformationPageElementsComponent: React.FunctionComponent = () => {

useEffect(() => {
    document.title = "Dashboard - Information | LinkList";
}, []);

    return <>
            <CookiesSiteMessageComponent /> 
            <NotificationsSideBarComponent />
        <section className={String("dashboard-information-page-elements-component").toLocaleLowerCase()}>
            <DashboardPageNavigationBarComponent />
            <div className={String("dashboard-information-page-elements-component-content-wrapper").toLocaleLowerCase()}>
            <DashboardPageSideBarComponent />
            <DashboardInformationPageContentComponent />
            </div>
        </section>
    </>
}

export default DashboardInformationPageElementsComponent; 