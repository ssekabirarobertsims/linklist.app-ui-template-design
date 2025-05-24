import React, { useRef, useState } from "react";
import removeElement from "../functions/Remove.Element.Function";
import displayElement from "../functions/Display.Element.Function";
import { CgClose } from "react-icons/cg";
import axios from "axios";

import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import LinkCreationNotificationHamburgComponent from "./messages/Link.Creation.Notification.Hamburg.Component";

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

const CreateLinkFormComponent: React.FunctionComponent = () => {
  // State for form fields
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Get the current admin's authentication data from context
  const currentAdmin = React.useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;

  // Handle closing the form and clearing input fields
  const handleFormClose = async (event: React.MouseEvent): Promise<void> => {
    event.stopPropagation(); // prevent event bubbling

    // Get form and input elements
    const formElement = document.querySelector(
      ".create-link-form-component"
    ) as HTMLElement;
    const titleInput = document.querySelector(
      "#create-link-form-title-input"
    ) as HTMLInputElement;
    const linkInput = document.querySelector(
      "#create-link-form-link-input"
    ) as HTMLInputElement;

    // Remove form from DOM and clear input values
    if (formElement) removeElement(formElement);
    if (titleInput) titleInput.value = "";
    if (linkInput) linkInput.value = "";
  };

  // Handle saving the link to the server
  const handleSaveLink = async (event: React.MouseEvent): Promise<void> => {
    event.stopPropagation(); // prevent event bubbling

    // Get notification and form elements
    const notification = document.querySelector(
      ".link-creation-notification-hamburg-component"
    ) as HTMLElement;
    const formElement = document.querySelector(
      ".create-link-form-component"
    ) as HTMLFormElement;

    try {
      // Send POST request to save the link
      const { data: response } = await axios.post(
        "https://api-linklist-restapi.onrender.com/saved/links",
        {
          title,
          link,
          admin_id: currentAdmin?.data?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${currentAdmin?.data?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // If successful, show notification, remove form, and reload page
      if (response.status_code === (201 as Required<number>)) {
        console.log(response);
        console.log("Link saved successfully:", response.data);
        displayElement(notification);
        removeElement(formElement);
        setTimeout(() => window.location.reload(), 1500 as Required<number>);
      }
    } catch (error) {
      // Handle errors from the API
      console.error("Error saving link:", error);
    }
  };

  // Render the link creation form
  return (
    <>
      {/* Notification for successful link creation */}
      <LinkCreationNotificationHamburgComponent content="Link has been saved successfully!" />
      <form
        encType="multipart/form-data"
        method="POST"
        className="create-link-form-component"
      >
        <div>
          <article>
            {/* Close button for the form */}
            <button
              type="button"
              className="close"
              id="close"
              onClick={handleFormClose}
            >
              <CgClose />
            </button>
            <h1>Add Link</h1>
            {/* Input for link title */}
            <input
              type="text"
              name="title"
              id="create-link-form-title-input"
              placeholder="title"
              required
              maxLength={50}
              value={title}
              onInput={(event) =>
                setTitle((event.target as HTMLInputElement).value)
              }
            />
            {/* Input for link URL */}
            <input
              type="text"
              name="link"
              id="create-link-form-link-input"
              placeholder="link"
              required
              value={link}
              onInput={(event) =>
                setLink((event.target as HTMLInputElement).value)
              }
            />
            <p></p>
            {/* Save button */}
            <button type="button" ref={buttonRef} onClick={handleSaveLink}>
              Save
            </button>
          </article>
        </div>
      </form>
    </>
  );
};

export default CreateLinkFormComponent;
