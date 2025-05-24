import React, { useState, useContext, useEffect } from "react";
import removeElement from "../functions/Remove.Element.Function";
import { CgClose } from "react-icons/cg";
import displayElement from "../functions/Display.Element.Function";
import axios from "axios";

import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";

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

// Props for the update form component
interface UpdateLinkFormProps {
  selectedLink: ListItemProperties | null;
  onUpdate: (updatedLink: ListItemProperties) => void;
}

const UpdateLinkFormComponent: React.FunctionComponent<UpdateLinkFormProps> = ({
  selectedLink,
  onUpdate,
}) => {
  // Get the current admin's authentication data from context
  const currentAdmin = useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;

  // State for the form fields, initialized from the selected link
  const [title, setTitle] = useState<string>(selectedLink?.title || "");
  const [link, setLink] = useState<string>(selectedLink?.link || "");

  // Update form fields if the selected link changes
  useEffect(() => {
    if (selectedLink) {
      setTitle(selectedLink.title);
      setLink(selectedLink.link);
    }
  }, [selectedLink]);

  // Handle submitting the updated link to the server
  const handleSubmit = async () => {
    if (!selectedLink) return;

    try {
      // Send PUT request to update the link
      const request = await axios.put(
        `https://api-linklist-restapi.onrender.com/saved/links/${selectedLink.id}`,
        { title, link },
        {
          headers: {
            Authorization: String(
              `Bearer ${currentAdmin?.data?.token}` as Partial<
                Pick<SecondaryAuthenticationProps, "message">
              >
            ),
            "Content-Type": "application/json",
          },
        }
      );

      const response = request.data;

      // If update is successful, update parent state, show notification, and close form
      if (request.status === (200 as Required<Readonly<number>>)) {
        onUpdate({ ...selectedLink, title, link });
        const updateForm = document.querySelector(
          ".update-link-form-component"
        ) as Required<HTMLElement>;
        removeElement(updateForm);
        const notification = document.querySelector(
          ".link-updating-notification-hamburg-component"
        ) as Required<HTMLElement>;
        displayElement(notification);
        setTimeout(() => {
          removeElement(notification);
        }, 5500 as Required<Readonly<number>>);
      } else {
        // Handle unsuccessful update
        console.error("Failed to update the link:", response);
      }
    } catch (error) {
      // Handle network or server errors
      console.error("Error updating the link:", error);
    }
  };

  // Render the update link form UI
  return (
    <div className="update-link-form-component">
      <form>
        <article>
          {/* Close button for the form */}
          <span
            className="close"
            onClick={() => {
              removeElement(
                document.querySelector(
                  ".update-link-form-component"
                ) as Required<HTMLElement>
              );
              (
                window.document.querySelector(
                  "#update-link-form-title-input"
                ) as Required<HTMLInputElement>
              ).value = "" as Required<Readonly<string>>;
              (
                window.document.querySelector(
                  "#update-link-form-link-input"
                ) as Required<HTMLInputElement>
              ).value = "" as Required<Readonly<string>>;
            }}
          >
            <CgClose />
          </span>
          <h2>Update Link</h2>
          {/* Input for link title */}
          <input
            type="text"
            id="update-link-form-title-input"
            placeholder="Enter new title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={Number(20) as Required<Readonly<number>>}
          />
          {/* Input for link URL */}
          <input
            type="url"
            id="update-link-form-link-input"
            placeholder="Enter new link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
          {/* Submit button */}
          <button type="button" onClick={handleSubmit}>
            Update Link
          </button>
        </article>
      </form>
    </div>
  );
};

export default UpdateLinkFormComponent;
