import React from "react";
import "../stylesheets/Offline.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import SiteDeveloperNavigationComponent from "../components/Developer.Navigation.Div.Component";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";

const OfflinePageElementsComponent: React.FunctionComponent = () => {
  // Set the document title when the component mounts
  React.useEffect(() => {
    document.title = "Page - Offline | LinkList";
  }, []);

  return (
    <>
      {/* Global UI components for offline page */}
      <CookiesSiteMessageComponent />
      <SiteDeveloperNavigationComponent />
      <NotificationsSideBarComponent />
      <SecondaryNavigationBarComponent />
      {/* Main offline message section */}
      <section
        className={String(
          "offline-page-elements-component"
        ).toLocaleLowerCase()}
      >
        <div
          className={String(
            "offline-page-elements-component-content-wrapper"
          ).toLocaleLowerCase()}
        >
          <h1>Network Error!</h1>
          <p>Failed to fetch ui data for site pages information review.</p>
        </div>
      </section>
    </>
  );
};

export default OfflinePageElementsComponent;
