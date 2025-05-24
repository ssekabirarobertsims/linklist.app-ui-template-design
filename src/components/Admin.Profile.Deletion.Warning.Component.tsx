import React from "react";
import axios from "axios";
import removeElement from "../functions/Remove.Element.Function";
import displayElement from "../functions/Display.Element.Function";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import PrimaryPageLoaderComponent from "./Primary.Page.Loader.Component";

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

const AdminProfileDeletionWarningComponent: React.FunctionComponent = () => {
  // Get the current admin's authentication data from context
  const currentAdmin = React.useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;

  // Handle the profile deletion logic
  const handleDeleteProfile = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event bubbling to parent elements

    // Show the loading spinner
    const loader: HTMLDivElement = document.querySelector(
      ".primary-spinner-wrapper"
    ) as HTMLDivElement;

    try {
      displayElement(loader);

      // Send DELETE request to the API to remove the admin profile
      const response = await axios.delete(
        `https://api-linklist-restapi.onrender.com/admin/account/unlink/${currentAdmin?.data?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentAdmin?.data?.token}`,
          },
        }
      );

      if (response.status === 200) {
        // On success, clear authentication data from localStorage and redirect to home
        console.log(response.data);
        localStorage.removeItem("primary_authentication");
        localStorage.removeItem("secondary_authentication");

        setTimeout(() => removeElement(loader), 1900);
        setTimeout(() => (window.location.href = "/"), 2100);
      } else {
        // Handle unsuccessful deletion
        console.error("Error deleting profile");
        setTimeout(() => removeElement(loader), 2000);
      }
    } catch (error) {
      // Handle network or server errors
      console.error("Error:", error);
      setTimeout(() => removeElement(loader), 2000);
    }
  };

  // Handle cancel action to close the warning dialog
  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event bubbling

    // Remove the warning component from the DOM
    const warningComponent = document.querySelector(
      ".admin-profile-deletion-warning-component"
    ) as HTMLElement;

    if (warningComponent) {
      removeElement(warningComponent);
    }
  };

  // Render the deletion warning UI
  return (
    <>
      {/* Loader for async actions */}
      <PrimaryPageLoaderComponent />
      <aside className="admin-profile-deletion-warning-component">
        <div>
          <article className="_wrapper">
            {/* Display admin avatar */}
            <img
              src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
              alt="admin avatar"
            />
            {/* Warning title */}
            <h2>Delete this profile for {currentAdmin?.data?.username}!</h2>
            {/* Warning message */}
            <p>
              This will permanently delete saved links, username, emails, or
              profile from this device. However, any data that was previously
              synced to your profile will remain associated with your email
              account.
            </p>
            {/* Action buttons */}
            <article>
              <button type="button" onClick={handleDeleteProfile}>
                Delete Profile
              </button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </article>
          </article>
        </div>
      </aside>
    </>
  );
};

export default AdminProfileDeletionWarningComponent;
