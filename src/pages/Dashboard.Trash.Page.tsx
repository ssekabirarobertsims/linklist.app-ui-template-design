import React, { useEffect, useState, useRef } from "react";
import DashboardPageNavigationBarComponent from "../components/Dashboard.Navigation.Bar.Component";
import DashboardPageFooterComponent from "../components/Footer.Component";
import DashboardPageSideBarComponent from "../components/Side.Bar.Component";
import "../stylesheets/Dashboard.Trash.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import AdminAccountVerificationAlertMessageComponent from "../components/Admin.Account.Verification.Alert.Message";
import PrimeSideBarComponent from "../components/Prime.Side.Bar.Component";
import SettingsButtonLinkComponent from "../components/Settings.Button.Link.Component";
import AdminAccountSubscriptionAlertMessageComponent from "../components/Admin.Account.Subscription.Alert.Message";
import LinkDeletionNotificationHamburgComponent from "../components/messages/Link.Deletion.Notification.Hamburg.Component";
import LinkUpdatingNotificationHamburgComponent from "../components/messages/Link.Updating.Notification.Hamburg.Component";
import LinkRestorationNotificationHamburgComponent from "../components/messages/Link.Restoration.Notification.Hamburg.Component";
import LinksTrashEmptyingNotificationHamburgComponent from "../components/messages/Links.Trash.Emptying.Notification.Hamburg.Component";
import TrashLinkDeletionNotificationHamburgComponent from "../components/messages/Trash.Link.Deletion.Notification.Hamburg.Component";
import "../../stylesheets/Dashboard.Trash.Page.Stylesheet.css";

import { BiTrash, BiCopy } from "react-icons/bi";
import { MdRestore } from "react-icons/md";
import Copy from "../functions/Copy.Link.Function";
import displayElement from "../functions/Display.Element.Function";
import axios from "axios";
import { v4 as uuid } from "uuid";

import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";

// Define the shape of a trashed link item
type ListItemProperties = {
  id: string;
  title: string;
  link: string;
  admin_id: string;
};

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

const DashboardTrashPageElementsComponent: React.FunctionComponent = () => {
  // State for trashed links
  const [list, setList] = useState<ListItemProperties[]>([]);
  // Get the current admin's authentication data from context
  const currentAdmin = React.useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fetch trashed links for the current admin on mount or when admin changes
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

        // Filter links to only include those belonging to the current admin
        const links: ListItemProperties[] = response?.saved_links || [];
        setList(
          links.filter((item) => item.admin_id === currentAdmin?.data?.id)
        );
      } catch (error) {
        console.error("Error fetching trashed links:", error);
      }
    })();
  }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);

  // Permanently delete a trashed link by id
  const handleDeleteLink = async (id: string) => {
    try {
      const { data: response } = await axios.delete(
        `https://api-linklist-restapi.onrender.com/trash/links/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentAdmin?.data?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status_code === Number(200)) {
        // Show notification and reload page after deletion
        displayElement(
          document.querySelector(
            ".trash-link-deletion-notification-hamburg-component"
          ) as HTMLElement
        );
        setTimeout(() => window.location.reload(), 1500 as Required<number>);
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  // Restore a trashed link back to saved links
  const handleRestoreLink = async (id: string, title: string, link: string) => {
    try {
      const { data: response } = await axios.post(
        `https://api-linklist-restapi.onrender.com/trash/links/${id}`,
        {
          title,
          link,
          admin_id: currentAdmin?.data?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${currentAdmin?.data?.token}`,
            "Content-Type": "Application/json",
          },
        }
      );

      if (response.status_code === (Number(200) as Required<number>)) {
        // Show notification and reload page after restoration
        displayElement(
          document.querySelector(
            ".link-restoration-notification-hamburg-component"
          ) as HTMLElement
        );
        setTimeout(() => window.location.reload(), 1500 as Required<number>);
      } else {
        console.log(response);
        return response;
      }
    } catch (error) {
      console.error("Error restoring link:", error);
    }
  };

  // Empty all trashed links for the current admin
  const handleEmptyTrash = async (event: React.MouseEvent) => {
    event.stopPropagation(); // prevent event bubbling

    try {
      const { data: response } = await axios.delete(
        `https://api-linklist-restapi.onrender.com/trash/empty/${currentAdmin?.data?.id}`,
        {
          headers: {
            Authorization: `Bearer ${currentAdmin?.data?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status_code === (Number(200) as Required<number>)) {
        // Show notification and reload page after emptying trash
        const notification = document.querySelector(
          ".links-trash-emptying-notification-hamburg-component"
        ) as HTMLElement;
        displayElement(notification);
        setTimeout(() => window.location.reload(), 1500 as Required<number>);
      } else {
        console.log(response);
        return response;
      }
    } catch (error) {
      console.error("Error emptying trash:", error);
    }
  };

  // Set the document title on mount
  useEffect(() => {
    document.title = "Dashboard - Trash | LinkList";
  }, []);

  // Render the dashboard trash page layout and content
  return (
    <>
      {/* Global UI components and notifications */}
      <CookiesSiteMessageComponent />
      <SettingsButtonLinkComponent />
      <NotificationsSideBarComponent />
      <AdminAccountVerificationAlertMessageComponent />
      <AdminAccountSubscriptionAlertMessageComponent />
      <section
        className={String(
          "dashboard-trash-page-elements-component"
        ).toLocaleLowerCase()}
      >
        <DashboardPageNavigationBarComponent />
        <div
          className={String(
            "dashboard-trash-page-elements-component-content-wrapper"
          ).toLocaleLowerCase()}
        >
          <DashboardPageSideBarComponent />
          <article className="dashboard-trash-page-content-component">
            <br />
            {/* Notification components for link actions */}
            <LinkDeletionNotificationHamburgComponent />
            <LinksTrashEmptyingNotificationHamburgComponent />
            <LinkRestorationNotificationHamburgComponent />
            <LinkUpdatingNotificationHamburgComponent />
            <TrashLinkDeletionNotificationHamburgComponent />
            <h1>Trashed links</h1>
            {/* Show the number of trashed links */}
            <span className="link_no">{list.length} trashed links</span>
            {/* Render the list of trashed links or a message if none found */}
            {list.length > 0 ? (
              <ul className="dashboard-trash-page-ul-list-component">
                {list.map((item) => (
                  <li key={uuid()}>
                    <div className="dashboard-trash-page-upper-content-wrapper">
                      <h2>{item.title}</h2>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.link}
                      </a>
                    </div>
                    <div className="dashboard-trash-page-down-content-wrapper">
                      {/* Restore link button */}
                      <button
                        type="button"
                        ref={buttonRef}
                        className="restore-link-button"
                        onClick={(event: React.MouseEvent) => {
                          event.stopPropagation(); // prevent event bubbling
                          handleRestoreLink(item.id, item.title, item.link);
                        }}
                      >
                        <MdRestore />
                      </button>
                      {/* Permanently delete link button */}
                      <button
                        type="button"
                        ref={buttonRef}
                        className="delete-link-button"
                        onClick={() => handleDeleteLink(item.id)}
                      >
                        <BiTrash />
                      </button>
                      {/* Copy link button */}
                      <button
                        type="button"
                        ref={buttonRef}
                        className="copy-link-button"
                        onClick={() => Copy(item.link)}
                      >
                        <BiCopy />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-results-message">
                <h2>No links found in trash!</h2>
                <p>
                  Your trash link list is empty. Delete links to add to your
                  trash list.
                </p>
              </div>
            )}
            {/* Show trash emptying prompt if trash is full */}
            {
              // condition the amount to be trashed depending on the users subscription plan
              list.length > 25 ? (
                <aside id="trash-emptying-warning-component">
                  <div>
                    <article>
                      <h2>
                        <BiTrash />
                      </h2>
                      <span>Trash is full!</span>
                      <p>
                        Your trash link is currently full, please make sure that
                        you empty it to free up space for more storage on this
                        device.
                      </p>
                      <button
                        type="button"
                        id="empty-trash-button"
                        ref={buttonRef}
                        onClick={handleEmptyTrash}
                      >
                        Empty trash
                      </button>
                    </article>
                  </div>
                </aside>
              ) : (
                ""
              )
            }
          </article>
        </div>
        {/* Footer and prime sidebar */}
        <DashboardPageFooterComponent />
        <PrimeSideBarComponent />
      </section>
    </>
  );
};

export default DashboardTrashPageElementsComponent;
