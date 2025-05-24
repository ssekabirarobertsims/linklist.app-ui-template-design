import React, { useEffect, useState, useRef } from "react";
import DashboardPageNavigationBarComponent from "../components/Dashboard.Navigation.Bar.Component";
import DashboardPageFooterComponent from "../components/Footer.Component";
import DashboardPageSideBarComponent from "../components/Side.Bar.Component";
import "../stylesheets/Dashboard.Settings.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import AdminAccountVerificationAlertMessageComponent from "../components/Admin.Account.Verification.Alert.Message";
import PrimeSideBarComponent from "../components/Prime.Side.Bar.Component";
import AdminAccountSubscriptionAlertMessageComponent from "../components/Admin.Account.Subscription.Alert.Message";
import AdminProfileDeletionWarningComponent from "../components/Admin.Profile.Deletion.Warning.Component";
import axios from "axios";
import displayElement from "../functions/Display.Element.Function";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import removeElement from "../functions/Remove.Element.Function";

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

import { BsCookie } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { BiPencil, BiTrash } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { v4 as uuidV4 } from "uuid";
import { format } from "date-fns";
import { MdVerified } from "react-icons/md";

import ChangeAdminAvatarFunction from "../functions/Change.Admin.Avatar.Function";
import AdminAccountUpdateNotificationHamburgComponent from "../components/Admin.Account.Update.Notification.Hamburg.Component";
import PrimaryPageLoaderComponent from "../components/Primary.Page.Loader.Component";

interface AvatarProperties {
  id: string;
  content: string;
  avatar: string;
}

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

import { BiDownload } from "react-icons/bi";

const DashboardSettingsPageElementsComponent: React.FunctionComponent = () => {
  // Get the current admin's authentication data from context
  const currentAdmin = React.useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isVerified =
    currentAdmin?.data?.verified === "true" ? "verified" : "unverified";

  // Handle showing the avatar edit form
  const handleEditProfile = async (event: React.MouseEvent): Promise<void> => {
    event.stopPropagation(); // prevent event bubbling
    const avatarForm = document.querySelector(
      ".dashboard-settings-page-avatar-form-component"
    ) as HTMLElement;
    if (avatarForm) displayElement(avatarForm);
  };

  // Handle showing the profile deletion warning
  const handleDeleteProfile = async (
    event: React.MouseEvent
  ): Promise<void> => {
    event.stopPropagation(); // prevent event bubbling
    const deletionWarning = document.querySelector(
      ".admin-profile-deletion-warning-component"
    ) as HTMLElement;
    if (deletionWarning) displayElement(deletionWarning);
  };

  // Handle logging out the admin
  const handleLogout = async (event: React.MouseEvent): Promise<void> => {
    event.stopPropagation(); // prevent event bubbling
    const spinner = document.querySelector(
      ".primary-spinner-wrapper"
    ) as HTMLDivElement;
    displayElement(spinner);

    try {
      // Send logout request to the server
      const response = await axios.post(
        `https://api-linklist-restapi.onrender.com/admin/account/logout/${currentAdmin?.data?.id}`,
        {
          id: currentAdmin?.data?.id,
          username: currentAdmin?.data?.username,
          email: currentAdmin?.data?.email,
        },
        {
          headers: {
            Authorization: `Bearer ${currentAdmin?.data?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // On success, clear localStorage and redirect to login
      if (response.status === (Number(200) as Required<number>)) {
        localStorage.removeItem("secondary_authentication");
        setTimeout(
          () => (window.location.href = "/admin/account/login?query=login"),
          Number(3000) as Required<number>
        );
      } else {
        // Handle unsuccessful logout
        console.error("Error logging out!");
        setTimeout(
          () => removeElement(spinner),
          Number(2000) as Required<number>
        );
      }
    } catch (error) {
      // Handle network or server errors
      console.error("Error:", error);
      setTimeout(
        () => removeElement(spinner),
        Number(2000) as Required<number>
      );
    }
  };

  // List of available avatars for selection
  const [avatars, setAvatars] = useState<AvatarProperties[]>([
    { id: uuidV4(), content: "avatar 1", avatar: "/avatars/avatar-1.png" },
    { id: uuidV4(), content: "avatar 2", avatar: "/avatars/avatar-2.png" },
    { id: uuidV4(), content: "avatar 3", avatar: "/avatars/avatar-3.png" },
    { id: uuidV4(), content: "avatar 4", avatar: "/avatars/avatar-4.png" },
    { id: uuidV4(), content: "avatar 5", avatar: "/avatars/avatar-5.png" },
    { id: uuidV4(), content: "avatar 6", avatar: "/avatars/avatar-6.png" },
    { id: uuidV4(), content: "avatar 7", avatar: "/avatars/avatar-7.png" },
    { id: uuidV4(), content: "avatar 8", avatar: "/avatars/avatar-8.png" },
    { id: uuidV4(), content: "avatar 9", avatar: "/avatars/avatar-9.png" },
    { id: uuidV4(), content: "avatar 10", avatar: "/avatars/avatar-10.png" },
  ]);

  // Set document title and keep avatars state in sync
  useEffect(() => {
    document.title = "Page - Avatar | LinkList";
    setAvatars(avatars);
  }, [avatars]);

  // State for username input and response message
  const [username, setUsername] = useState<string>(
    currentAdmin?.data?.username || "Admin username undefined"
  );
  const [responseMessage, setResponseMessage] = useState<string>("");

  // Handle saving updated profile info (username/avatar)
  const handleSave = async () => {
    const loader = document.querySelector(
      ".primary-spinner-wrapper"
    ) as HTMLDivElement;
    const placeholder = document.querySelector(
      "#current-admin-avatar-placeholder"
    ) as HTMLImageElement;

    displayElement(loader);

    try {
      // Send PATCH request to update profile
      const response = await axios.patch(
        `https://api-linklist-restapi.onrender.com/admin/account/append/${currentAdmin?.data?.id}`,
        {
          username,
          avatar: placeholder.src.split("/avatars/")[1],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentAdmin?.data?.token}`,
          },
        }
      );

      setResponseMessage(
        response.data?.message || "Profile updated successfully!"
      );

      if (response.status === 200) {
        // Hide avatar form, show notification, and update localStorage
        removeElement(
          document.querySelector(
            ".dashboard-settings-page-avatar-form-component"
          ) as HTMLElement
        );
        displayElement(
          document.querySelector(
            ".admin-account-update-notification-hamburg-component"
          ) as HTMLElement
        );

        // Update localStorage with new profile info
        localStorage.setItem(
          "primary_authentication",
          JSON.stringify({
            email: currentAdmin?.data?.email,
            username,
            avatar: placeholder.src.split("/avatars/")[1],
          })
        );

        localStorage.setItem(
          "secondary_authentication",
          JSON.stringify({
            data: {
              avatar: placeholder.src.split("/avatars/")[1],
              email: currentAdmin?.data?.email,
              id: currentAdmin?.data?.id,
              token: currentAdmin?.data?.token,
              username,
              subscribed: currentAdmin?.data?.subscribed,
              verified: currentAdmin?.data?.verified,
            },
            date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
            message: currentAdmin?.message,
            request_id: currentAdmin?.request_id,
            status_code: currentAdmin?.status_code,
          })
        );

        setTimeout(() => removeElement(loader), 2000);
        setTimeout(() => {
          window.location.reload();
          window.location.href = `/${String(
            username ? username.replace(" ", "") : "admin"
          )
            .toLocaleLowerCase()
            .replace(" ", "")}/settings?admin=${String(
            username ? username.replace(" ", "") : "admin"
          )
            .toLocaleLowerCase()
            .replace(" ", "")}`;
        }, 3200);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle errors from the API
      console.error("Error updating profile:", error);
      setResponseMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.log(responseMessage);
      setTimeout(() => removeElement(loader), 2000);
    }
  };

  // Handle discarding changes and closing the avatar form
  const handleDiscard = () => {
    removeElement(
      document.querySelector(
        ".dashboard-settings-page-avatar-form-component"
      ) as HTMLElement
    );
  };

  // Set the document title for the settings page
  React.useEffect(() => {
    document.title = "Dashboard - Settings | LinkList";
  }, []);

  // Render the dashboard settings page layout and content
  return (
    <>
      {/* Global UI components and notifications */}
      <CookiesSiteMessageComponent />
      <NotificationsSideBarComponent />
      <AdminAccountSubscriptionAlertMessageComponent />
      <AdminAccountVerificationAlertMessageComponent />
      <section
        className={String(
          "dashboard-page-elements-component"
        ).toLocaleLowerCase()}
      >
        <DashboardPageNavigationBarComponent />
        <div
          className={String(
            "dashboard-page-elements-component-content-wrapper"
          ).toLocaleLowerCase()}
        >
          <DashboardPageSideBarComponent />
          <article className="dashboard-settings-page-content-component">
            <br />
            <h1>Settings</h1>
            <h2>Common settings</h2>
            <div className="settings-buttons-wrapper">
              <button type="button">
                <span>
                  <MdManageAccounts />
                </span>
                Manage account
              </button>
              <button type="button">
                <span>
                  <BsCookie />
                </span>
                Clear cookies
              </button>
              {/* <button type="button"><span><FaPaintBrush /></span>Customize theme</button> */}
            </div>
            <h2>Your profile</h2>
            <div className="dashboard-settings-admin-profile-component">
              <article className="dashboard-settings-admin-profile-component-left-content-wrapper">
                {/* Display current admin avatar and info */}
                <img
                  src={`/avatars/${
                    currentAdmin?.data?.avatar || "avatar-2.png"
                  }`}
                  alt="admin avatar"
                />
                <aside>
                  <p>
                    {currentAdmin?.data?.username || "Admin username undefined"}
                  </p>
                  <span>
                    {currentAdmin?.data?.email || "Admin email undefined"}
                  </span>
                  <strong>
                    <MdVerified /> {isVerified}
                  </strong>
                </aside>
              </article>
              <article className="dashboard-settings-admin-profile-component-right-content-wrapper">
                {/* Edit, delete, and logout buttons */}
                <button
                  type="button"
                  ref={buttonRef}
                  className="edit-profile-button"
                  onClick={handleEditProfile}
                >
                  <BiPencil />
                </button>
                <button
                  type="button"
                  ref={buttonRef}
                  className="delete-profile-button"
                  onClick={handleDeleteProfile}
                >
                  <BiTrash />
                </button>
                <button
                  type="button"
                  ref={buttonRef}
                  className="logout-profile-button"
                  onClick={handleLogout}
                >
                  <LuLogOut /> Logout
                </button>
              </article>
            </div>
            <h2>Download this page</h2>
            {/* Download page button (not implemented) */}
            <a href="" download>
              <button type="button" className="download-this-page">
                <BiDownload />
                Download page
              </button>
            </a>

            {/* Notification and loader components */}
            <AdminAccountUpdateNotificationHamburgComponent />
            <PrimaryPageLoaderComponent />
            {/* Avatars form component for editing profile */}
            <aside className="dashboard-settings-page-avatar-form-component">
              <div className="dashboard-settings-page-avatar-form-component-wrapper">
                <div className="_wrapper">
                  <span className="span">Choose an avatar</span>
                  <img
                    src={`/avatars/${
                      currentAdmin?.data?.avatar || "avatar-2.png"
                    }`}
                    alt="Current Admin Avatar"
                    id="current-admin-avatar-placeholder"
                  />
                  {/* Avatars selection list */}
                  <ul className="dashboard-settings-page-avatar-form-component-ul-list">
                    {avatars.map((avatar) => (
                      <li key={avatar.id}>
                        <img
                          src={avatar.avatar}
                          alt="Avatar"
                          onClick={(event) => {
                            event.stopPropagation(); // prevent event bubbling
                            ChangeAdminAvatarFunction(
                              event.target as HTMLImageElement
                            );
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                  <span>Edit profile username</span>
                  {/* Username input */}
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Current admin username"
                    value={username}
                    maxLength={20}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <article>
                    {/* Save and discard buttons */}
                    <button
                      type="button"
                      ref={buttonRef}
                      id="save"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      ref={buttonRef}
                      id="discard"
                      onClick={handleDiscard}
                    >
                      Discard
                    </button>
                  </article>
                </div>
              </div>
            </aside>
            {/* Profile deletion warning component */}
            <AdminProfileDeletionWarningComponent />
          </article>
        </div>
        {/* Footer and prime sidebar */}
        <DashboardPageFooterComponent />
        <PrimeSideBarComponent />
      </section>
    </>
  );
};

export default DashboardSettingsPageElementsComponent;
