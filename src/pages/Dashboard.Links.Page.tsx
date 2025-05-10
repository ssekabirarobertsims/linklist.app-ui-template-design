import React, { useEffect } from "react";
import DashboardPageNavigationBarComponent from "../components/Dashboard.Navigation.Bar.Component";
import DashboardPageFooterComponent from "../components/Footer.Component";
import DashboardPageSideBarComponent from "../components/Side.Bar.Component";
import DashboardLinksPageContentComponent from "./components/Dashboard.Links.Page.Content.Component";
import "../stylesheets/Dashboard.Links.Page.Stylesheet.css";
import CreateLinkFormComponent from "../components/Create.Link.Form.Component";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import AdminAccountVerificationAlertMessageComponent from "../components/Admin.Account.Verification.Alert.Message";

const DashboardLinksPageElementsComponent: React.FunctionComponent = () => {
    useEffect(() => {
            document.title = "Dashboard - Links | LinkList";
        }, []);
          
    return <> 
            <CookiesSiteMessageComponent />
            <AdminAccountVerificationAlertMessageComponent />
            <NotificationsSideBarComponent />
        <section className={String("dashboard-links-page-elements-component").toLocaleLowerCase()}>
            <DashboardPageNavigationBarComponent />
            <div className={String("dashboard-links-page-elements-component-content-wrapper").toLocaleLowerCase()}>
            <DashboardPageSideBarComponent />
            <DashboardLinksPageContentComponent />
            <CreateLinkFormComponent />
            </div>
            <DashboardPageFooterComponent />
        </section>
    </> 
}

export default DashboardLinksPageElementsComponent;