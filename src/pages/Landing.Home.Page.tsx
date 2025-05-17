import React from "react";
import "../stylesheets/Landing.Home.Page.Component.Stylesheet.css";
import LandingHomePageNavigationBarComponent from "./components/Landing.Home.Page.Navigation.Bar.Component";
import LandingHomePageFooterComponent from "./components/Landing.Home.Page.Footer.Component";
import LandingHomePageHeaderComponent from "./components/Landing.Home.Page.Header.Component";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import LandingHomePageContentComponent from "./components/Landing.Home.Page.Content.Component";

const LandingHomePageElementsComponent: React.FunctionComponent = () => {
     React.useEffect(() => {
            document.title = "Page - Home | LinkList";
        }, []);

    return <> 
        <LandingHomePageNavigationBarComponent />
        <CookiesSiteMessageComponent />
        <NotificationsSideBarComponent />
         <section className={String("landing-home-page-element-component").toLocaleLowerCase()}>
                <LandingHomePageHeaderComponent />
            <div className={String("landing-home-page-element-component-content-wrapper").toLocaleLowerCase()}>
                <article className={String("landing-home-page-element-component-content").toLocaleLowerCase()}>
                    <LandingHomePageContentComponent />
                </article>
            </div>
        </section>
        <br />
        <LandingHomePageFooterComponent />
    </>
}

export default LandingHomePageElementsComponent;