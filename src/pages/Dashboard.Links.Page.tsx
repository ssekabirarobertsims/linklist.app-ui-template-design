import React, { useEffect, useRef, useState } from "react";
import DashboardPageNavigationBarComponent from "../components/Dashboard.Navigation.Bar.Component";
import DashboardPageFooterComponent from "../components/Footer.Component";
import DashboardPageSideBarComponent from "../components/Side.Bar.Component";
import "../stylesheets/Dashboard.Links.Page.Stylesheet.css";
import CreateLinkFormComponent from "../components/Create.Link.Form.Component";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import AdminAccountVerificationAlertMessageComponent from "../components/Admin.Account.Verification.Alert.Message";
import PrimeSideBarComponent from "../components/Prime.Side.Bar.Component";
import SettingsButtonLinkComponent from "../components/Settings.Button.Link.Component";
import AdminAccountSubscriptionAlertMessageComponent from "../components/Admin.Account.Subscription.Alert.Message";
import LinkCreationNotificationHamburgComponent from "../components/messages/Link.Creation.Notification.Hamburg.Component";
import LinkDeletionNotificationHamburgComponent from "../components/messages/Link.Deletion.Notification.Hamburg.Component";
import LinkUpdatingNotificationHamburgComponent from "../components/messages/Link.Updating.Notification.Hamburg.Component";

import { BiPencil, BiTrash, BiCopy } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import Copy from "../functions/Copy.Link.Function";
import displayElement from "../functions/Display.Element.Function";
import axios from "axios";

import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import UpdateLinkFormComponent from "../components/Update.Link.Form.Component";
import { v4 as uuid } from "uuid";

// Define the shape of a saved link item
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

const DashboardLinksPageElementsComponent: React.FunctionComponent = () => {
  // State for all links, search results, search value, and selected link for editing
  const [list, setList] = useState<ListItemProperties[]>([]);
  const [searchResults, setSearchResults] = useState<ListItemProperties[]>([]);
  const [value, setValue] = useState<string>("");
  const [selectedLink, setSelectedLink] = useState<ListItemProperties | null>(
    null
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Get the current admin's authentication data from context
  const currentAdmin = React.useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;

  // Fetch all saved links for the current admin on mount or when admin changes
  useEffect(() => {
    (async function fetchLinks() {
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
        setList(
          links.filter((item) => item.admin_id === currentAdmin?.data?.id)
        );
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    })();
  }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);

  // Filter links based on search value
  useEffect(() => {
    const filteredResults = list.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [value, list]);

  // Handle deleting a link by id
  const handleDeleteLink = async (id: string) => {
    try {
      const { data: response } = await axios.delete(
        `https://api-linklist-restapi.onrender.com/saved/links/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentAdmin?.data?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status_code === 200) {
        displayElement(
          document.querySelector(
            ".link-deletion-notification-hamburg-component"
          ) as HTMLElement
        );
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  // Set the document title on mount
  useEffect(() => {
    document.title = "Dashboard - Links | LinkList";
  }, []);

  // Render the dashboard links page layout and content
  return (
    <>
      {/* Global UI components and notifications */}
      <CookiesSiteMessageComponent />
      <SettingsButtonLinkComponent />
      <AdminAccountSubscriptionAlertMessageComponent />
      <AdminAccountVerificationAlertMessageComponent />
      <NotificationsSideBarComponent />
      <section
        className={String(
          "dashboard-links-page-elements-component"
        ).toLocaleLowerCase()}
      >
        <DashboardPageNavigationBarComponent />
        <div
          className={String(
            "dashboard-links-page-elements-component-content-wrapper"
          ).toLocaleLowerCase()}
        >
          <DashboardPageSideBarComponent />
          <article className="dashboard-links-page-content-component">
            <br />
            {/* Notification components for link actions */}
            <LinkCreationNotificationHamburgComponent content="Link has been saved successfully!" />
            <LinkDeletionNotificationHamburgComponent />
            <LinkUpdatingNotificationHamburgComponent />
            {/* Update link form, shown when editing a link */}
            <UpdateLinkFormComponent
              selectedLink={selectedLink}
              onUpdate={(updatedLink) => {
                setList((prevList) =>
                  prevList.map((link) =>
                    link.id === updatedLink.id ? updatedLink : link
                  )
                );
              }}
            />
            {/* Search input for filtering links */}
            <div className="dashboard-page-search-input">
              <span>
                <BsSearch />
              </span>
              <input
                type="search"
                name="search"
                id="search"
                onInput={(event) =>
                  setValue((event.target as HTMLInputElement).value)
                }
                value={value}
                placeholder="search for a link..."
                aria-placeholder="search for a link..."
              />
            </div>
            {/* Show the number of saved links */}
            <span className="link_no">{list.length} saved links</span>
            {/* Render the list of links or a message if none found */}
            {searchResults.length > 0 ? (
              <ul className="dashboard-page-saved-links-ul-list-component">
                {searchResults.map((item) => (
                  <li key={uuid()}>
                    <div className="dashboard-page-saved-links-upper-content-wrapper">
                      <h2>{item.title}</h2>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.link}
                      </a>
                    </div>
                    <div className="dashboard-page-saved-links-down-content-wrapper">
                      {/* Edit link button */}
                      <button
                        type="button"
                        ref={buttonRef}
                        className="edit-link-button"
                        onClick={() => {
                          const updateLinkForm = document.querySelector(
                            ".update-link-form-component"
                          ) as HTMLElement;
                          displayElement(updateLinkForm);
                          const titleInput = document.querySelector(
                            "#update-link-form-title-input"
                          ) as HTMLInputElement;
                          const linkInput = document.querySelector(
                            "#update-link-form-link-input"
                          ) as HTMLInputElement;
                          titleInput.value = item.title;
                          linkInput.value = item.link;
                          setSelectedLink(item);
                        }}
                      >
                        <BiPencil />
                      </button>
                      {/* Delete link button */}
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
                <p></p>
              </ul>
            ) : (
              <div className="no-results-message">
                <h2>No links found!</h2>
                <p>Your link list is empty. Please add a link to your list.</p>
              </div>
            )}
            <p></p>
          </article>
          {/* Create link form, shown when adding a new link */}
          <CreateLinkFormComponent />
        </div>
        {/* Footer and prime sidebar */}
        <DashboardPageFooterComponent />
        <PrimeSideBarComponent />
      </section>
    </>
  );
};

export default DashboardLinksPageElementsComponent;
