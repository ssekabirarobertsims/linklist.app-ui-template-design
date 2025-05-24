import React from "react";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";
import displayElement from "../functions/Display.Element.Function";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import AdminAccountProfileReviewComponent from "./Admin.Account.Profile.Review.Component";
import { BiLink } from "react-icons/bi";

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

const DashboardPageNavigationBarComponent: React.FunctionComponent = () => {
  // Get the current admin's authentication data from context
  const currentAdmin = React.useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;

  // Show the create link form when the "Add Link" button is clicked
  const handleCreateLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // prevent event bubbling

    const createLinkForm = document.querySelector(
      ".create-link-form-component"
    ) as HTMLElement;
    if (createLinkForm) displayElement(createLinkForm);
  };

  // Show the notifications sidebar when the notifications button is clicked
  const handleNotificationsClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // prevent event bubbling

    const notificationsSidebar = document.querySelector(
      ".notifications-side-bar-component"
    ) as HTMLElement;
    if (notificationsSidebar) displayElement(notificationsSidebar);
  };

  // Show the admin profile review sidebar when the avatar is clicked
  const handleProfileClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // prevent event bubbling

    const profileSidebar = document.querySelector(
      ".admin-account-profile-review-side-bar"
    ) as HTMLElement;
    if (profileSidebar) displayElement(profileSidebar);
  };

  // Render the navigation bar with left and right content
  return (
    <>
      {/* Sidebar for admin profile review (hidden by default) */}
      <AdminAccountProfileReviewComponent />
      <nav className="dashboard-page-navigation-bar-component">
        <article>
          {/* Left Content: App logo and name */}
          <div className="dashboard-page-navigation-bar-component-left-content-wrapper">
            <span className="dashboard-page-navigation-bar-icon">
              <Link to="/">
                <BiLink />
                Linklist
              </Link>
            </span>
          </div>

          {/* Right Content: Add Link, Notifications, and Profile Avatar */}
          <div className="dashboard-page-navigation-bar-component-right-content-wrapper">
            {/* Create Link Button */}
            <button
              type="button"
              className="dashboard-page-navigation-bar-add-link-button"
              title="Create a new link"
              onClick={handleCreateLinkClick}
            >
              <GrAdd /> Add Link
            </button>

            {/* Notifications Button */}
            <button
              type="button"
              className="dashboard-page-navigation-bar-notification-button"
              title="Check new notifications"
              onClick={handleNotificationsClick}
            >
              <IoNotificationsOutline />
            </button>

            {/* Admin Avatar */}
            <img
              src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
              alt="Admin Avatar"
              onClick={handleProfileClick}
            />
          </div>
        </article>
      </nav>
    </>
  );
};

export default DashboardPageNavigationBarComponent;
