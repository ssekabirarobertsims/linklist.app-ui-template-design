import React from "react";
import DashboardPageNavigationBarComponent from "../components/Dashboard.Navigation.Bar.Component";
import DashboardPageFooterComponent from "../components/Footer.Component";
import DashboardPageSideBarComponent from "../components/Side.Bar.Component";
import DashboardSettingsPageContentComponent from "./components/Dashboard.Settings.Page.Content.Component";
import "../stylesheets/Dashboard.Settings.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import AdminAccountVerificationAlertMessageComponent from "../components/Admin.Account.Verification.Alert.Message"; 
import PrimeSideBarComponent from "../components/Prime.Side.Bar.Component";
import AdminAccountSubscriptionAlertMessageComponent from "../components/Admin.Account.Subscription.Alert.Message";

const DashboardSettingsPageElementsComponent: React.FunctionComponent = () => {
     React.useEffect(() => {
            document.title = "Dashboard - Settings | LinkList";
        }, []);
 
    return <>
            <CookiesSiteMessageComponent />
            <NotificationsSideBarComponent />
            <AdminAccountSubscriptionAlertMessageComponent />
            <AdminAccountVerificationAlertMessageComponent />
        <section className={String("dashboard-page-elements-component").toLocaleLowerCase()}>
            <DashboardPageNavigationBarComponent />
            <div className={String("dashboard-page-elements-component-content-wrapper").toLocaleLowerCase()}>
            <DashboardPageSideBarComponent />
            <DashboardSettingsPageContentComponent />
            </div>
            <DashboardPageFooterComponent />
            <PrimeSideBarComponent />
        </section>
    </>
}

export default DashboardSettingsPageElementsComponent;