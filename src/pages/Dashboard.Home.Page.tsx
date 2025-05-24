import React, { useEffect, useState } from "react";
import DashboardPageNavigationBarComponent from "../components/Dashboard.Navigation.Bar.Component";
import DashboardPageFooterComponent from "../components/Footer.Component";
import DashboardPageSideBarComponent from "../components/Side.Bar.Component";
import "../stylesheets/Dashboard.Home.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import AdminAccountVerificationAlertMessageComponent from "../components/Admin.Account.Verification.Alert.Message";
import PrimeSideBarComponent from "../components/Prime.Side.Bar.Component";
import SettingsButtonLinkComponent from "../components/Settings.Button.Link.Component";
import AdminAccountSubscriptionAlertMessageComponent from "../components/Admin.Account.Subscription.Alert.Message";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import { Link } from "react-router-dom";

// Define the shape of the admin authentication object from context
interface SecondaryAuthenticationProps {
  date: string;
  message: string;
  request_id: string;
  status_code: string;
  data: {
    id: string;
    username: string;
    avatar: string;
    email: string;
    token: string;
    subscribed: string;
    verified: string;
  };
}

// Define the shape of a saved link item
type ListItemProperties = {
  id: string;
  title: string;
  link: string;
  admin_id: string;
};

import axios from "axios";
import { format } from "date-fns";
import LinksCreatedChart from "../components/Line.Chart.Component";

const DashboardHomePageElementsComponent: React.FunctionComponent = () => {
  // Get the current admin's authentication data from context
  const currentAdmin = React.useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;

  // State for saved and trashed links
  const [savedLinksList, setSavedLinksList] = useState<ListItemProperties[]>(
    []
  );
  const [trashedLinksList, setTrashedLinksList] = useState<
    ListItemProperties[]
  >([]);

  // Fetch saved links for the current admin
  useEffect(() => {
    (async function fetchSavedLinks() {
      try {
        const { data: response } = await axios.get(
          "https://api-linklist-restapi.onrender.com/saved/links",
          {
            headers: {
              Authorization: `Bearer ${currentAdmin?.data?.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const links: ListItemProperties[] = response?.saved_links || [];
        setSavedLinksList(
          links.filter((item) => item.admin_id === currentAdmin?.data?.id)
        );
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    })();
  }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);

  // Fetch trashed links for the current admin
  useEffect(() => {
    (async function fetchTrashedLinks() {
      try {
        const { data: response } = await axios.get(
          "https://api-linklist-restapi.onrender.com/trash/links",
          {
            headers: {
              Authorization: `Bearer ${currentAdmin?.data?.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const links: ListItemProperties[] = response?.saved_links || [];
        setTrashedLinksList(
          links.filter((item) => item.admin_id === currentAdmin?.data?.id)
        );
      } catch (error) {
        console.error("Error fetching trashed links:", error);
      }
    })();
  }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);

  // Set the document title on mount
  React.useEffect(() => {
    document.title = "Dashboard - Home | LinkList";
  }, []);

  // Render the dashboard home page layout and content
  return (
    <>
      {/* Settings button, cookies message, and alert messages */}
      <SettingsButtonLinkComponent />
      <CookiesSiteMessageComponent />
      <AdminAccountVerificationAlertMessageComponent />
      <AdminAccountSubscriptionAlertMessageComponent />
      <NotificationsSideBarComponent />
      <section
        className={String(
          "home-dashboard-page-elements-component"
        ).toLocaleLowerCase()}
      >
        {/* Navigation bar and sidebar */}
        <DashboardPageNavigationBarComponent />
        <div
          className={String(
            "home-dashboard-page-elements-component-content-wrapper"
          ).toLocaleLowerCase()}
        >
          <DashboardPageSideBarComponent />
          <article className="dashboard-home-page-content-component">
            <br />
            {/* Admin welcome banner and stats */}
            <div className="current-admin-profile-banner">
              <article>
                <p></p>
                <h1>
                  Welcome{" "}
                  {currentAdmin?.data?.username || "Admin username undefined"}
                </h1>
                <p>
                  Today <strong>({format(new Date(), "dd/MM/yyyy")})</strong>{" "}
                  everything running smoothly. You may be having unread
                  notifications!
                </p>
                {/* Display saved and trashed links counts */}
                <ul id="content-ul">
                  <li>
                    <span>
                      {Number(savedLinksList.length) as Required<number>}
                    </span>
                    <Link
                      to={{
                        pathname: `/${String(
                          currentAdmin?.data?.username
                            ? currentAdmin?.data?.username.replace(" ", "")
                            : "admin"
                        )
                          .toLocaleLowerCase()
                          .replace(" ", "")}/saved/links`,
                        search: `admin=${String(
                          currentAdmin?.data?.username
                            ? currentAdmin?.data?.username.replace(" ", "")
                            : "admin"
                        )
                          .toLocaleLowerCase()
                          .replace(" ", "")}`,
                      }}
                    >
                      saved link(s)
                    </Link>
                  </li>
                  <li>
                    <span>
                      {Number(trashedLinksList.length) as Required<number>}
                    </span>
                    <Link
                      to={{
                        pathname: `/${String(
                          currentAdmin?.data?.username
                            ? currentAdmin?.data?.username.replace(" ", "")
                            : "admin"
                        )
                          .toLocaleLowerCase()
                          .replace(" ", "")}/links/trash`,
                        search: `admin=${String(
                          currentAdmin?.data?.username
                            ? currentAdmin?.data?.username.replace(" ", "")
                            : "admin"
                        )
                          .toLocaleLowerCase()
                          .replace(" ", "")}`,
                      }}
                    >
                      trashed link(s)
                    </Link>
                  </li>
                </ul>
                {/* Chart showing links created over time */}
                <div>
                  <LinksCreatedChart />
                </div>
              </article>
            </div>
            <br />
          </article>
        </div>
        {/* Footer and prime sidebar */}
        <DashboardPageFooterComponent />
        <PrimeSideBarComponent />
      </section>
    </>
  );
};

export default DashboardHomePageElementsComponent;
