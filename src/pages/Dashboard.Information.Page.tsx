import React, { useEffect } from "react";
import "../stylesheets/Dashboard.Settings.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import AdminAccountVerificationAlertMessageComponent from "../components/Admin.Account.Verification.Alert.Message";
import SettingsButtonLinkComponent from "../components/Settings.Button.Link.Component";
import AdminAccountSubscriptionAlertMessageComponent from "../components/Admin.Account.Subscription.Alert.Message";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";

// Dashboard information/about page component
const DashboardInformationPageElementsComponent: React.FunctionComponent =
  () => {
    // Set the document title when the component mounts
    useEffect(() => {
      document.title = "Dashboard - Information | LinkList";
    }, []);

    return (
      <>
        {/* Secondary navigation bar and global UI components */}
        <SecondaryNavigationBarComponent />
        <CookiesSiteMessageComponent />
        <SettingsButtonLinkComponent />
        <AdminAccountSubscriptionAlertMessageComponent />
        <AdminAccountVerificationAlertMessageComponent />
        <NotificationsSideBarComponent />
        {/* Main information section */}
        <section className="dashboard-information-page-elements-component">
          <div className="dashboard-information-page-elements-component-content-wrapper">
            <article className="dashboard-information-page-content-component">
              <br />
              <h1 className="page-heading">App Information</h1>
              <p className="app-version-tag">
                Version: v1.0.1 (Official Build)
              </p>
              <p className="app-version-tag">Release: 30/04/2025</p>
              <p>
                Linklist is a minimalist, open-source SaaS app designed for
                saving and organizing your favorite website links. Whether it’s
                articles, tools, docs, or resources — Linklist makes sure you
                never lose a useful URL again.
              </p>
              <p>
                Design Source Code:{" "}
                <a
                  href="https://github.com/ssekabirarobertsims/linklist.app-ui-template-design"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </p>
              <p>
                Developer/Engineer:{" "}
                <a
                  href="https://ssekabirarobertsims.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ssekabira Robert Sims
                </a>
              </p>
              <p>
                API:{" "}
                <a
                  href="https://api-linklist-restapi.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  api.linklist.restapi
                </a>
              </p>
              <br />
              <h3>Linklist.app</h3>
              <span>
                Linklist &copy; {new Date().getFullYear()} All Rights Reserved
              </span>
            </article>
          </div>
        </section>
      </>
    );
  };

export default DashboardInformationPageElementsComponent;
