import React from "react";
import DashboardPageNavigationBarComponent from "../components/Dashboard.Navigation.Bar.Component";
import DashboardPageFooterComponent from "../components/Footer.Component";
import DashboardPageSideBarComponent from "../components/Side.Bar.Component";
import DashboardHomePageContentComponent from "./components/Dashboard.Home.Page.Content.Component";
import "../stylesheets/Dashboard.Home.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import AdminAccountVerificationAlertMessageComponent from "../components/Admin.Account.Verification.Alert.Message";
import PrimeSideBarComponent from "../components/Prime.Side.Bar.Component";

const DashboardHomePageElementsComponent: React.FunctionComponent = () => {
    React.useEffect(() => {
        document.title = "Dashboard - Home | LinkList";
    }, []); 
    
    return <>
            <CookiesSiteMessageComponent />
            <AdminAccountVerificationAlertMessageComponent />
            <NotificationsSideBarComponent />
        <section className={String("home-dashboard-page-elements-component").toLocaleLowerCase()}>
            <DashboardPageNavigationBarComponent />
            <div className={String("home-dashboard-page-elements-component-content-wrapper").toLocaleLowerCase()}>
            <DashboardPageSideBarComponent />
            <DashboardHomePageContentComponent />
            </div> 
            <DashboardPageFooterComponent />
            <PrimeSideBarComponent />
        </section>
    </>
}

export default DashboardHomePageElementsComponent;