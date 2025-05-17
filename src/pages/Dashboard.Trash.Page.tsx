import React, { useEffect } from "react";
import DashboardPageNavigationBarComponent from "../components/Dashboard.Navigation.Bar.Component";
import DashboardPageFooterComponent from "../components/Footer.Component";
import DashboardPageSideBarComponent from "../components/Side.Bar.Component";
import DashboardTrashPageContentComponent from "./components/Dashboard.Trash.Page.Content.Component";
import "../stylesheets/Dashboard.Trash.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import AdminAccountVerificationAlertMessageComponent from "../components/Admin.Account.Verification.Alert.Message";
import PrimeSideBarComponent from "../components/Prime.Side.Bar.Component";

const DashboardTrashPageElementsComponent: React.FunctionComponent = () => {
    useEffect(() => {
            document.title = "Dashboard - Trash | LinkList";
        }, []);
         
    return <> 
            <CookiesSiteMessageComponent />
            <NotificationsSideBarComponent /> 
            <AdminAccountVerificationAlertMessageComponent />
        <section className={String("dashboard-trash-page-elements-component").toLocaleLowerCase()}>
            <DashboardPageNavigationBarComponent />
            <div className={String("dashboard-trash-page-elements-component-content-wrapper").toLocaleLowerCase()}>
            <DashboardPageSideBarComponent />
            <DashboardTrashPageContentComponent />
            </div>
            <DashboardPageFooterComponent />
            <PrimeSideBarComponent />
        </section>
    </> 
}

export default DashboardTrashPageElementsComponent;