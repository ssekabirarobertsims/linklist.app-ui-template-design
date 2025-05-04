import React from "react";
import "../stylesheets/Landing.Home.Page.Component.Stylesheet.css";
import LandingHomePageNavigationBarComponent from "./components/Landing.Home.Page.Navigation.Bar.Component";
import FooterComponent from "../components/Footer.Component";
import LandingHomePageHeaderComponent from "./components/Landing.Home.Page.Header.Component";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import SiteDeveloperNavigationComponent from "../components/Developer.Navigation.Div.Component";

const LandingHomePageElementsComponent: React.FunctionComponent = () => {
     React.useEffect(() => {
            document.title = "Page - Home | LinkList";
        }, []);

    return <> 
        <LandingHomePageNavigationBarComponent />
        <CookiesSiteMessageComponent />
        <SiteDeveloperNavigationComponent />
        <NotificationsSideBarComponent />
         <section className={String("landing-home-page-element-component").toLocaleLowerCase()}>
            <div className={String("landing-home-page-element-component-content-wrapper").toLocaleLowerCase()}>
                <LandingHomePageHeaderComponent />
            </div>
        </section>
        <FooterComponent />
    </>
}

export default LandingHomePageElementsComponent;