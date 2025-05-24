import React from "react";
import removeElement from "../../functions/Remove.Element.Function";
import { CgClose } from "react-icons/cg";

const AdminAccountUpdateNotificationHamburgComponent: React.FunctionComponent =
  () => {
    const handleClose = (event: React.MouseEvent) => {
      event.stopPropagation(); // prevent event bubbling

      const element = document.querySelector(
        ".admin-account-update-notification-hamburg-component"
      ) as HTMLElement | null;

      if (element) {
        removeElement(element);
      }
    };

    return (
      <div
        className="admin-account-update-notification-hamburg-component"
        id="notification-hamburg-component"
      >
        <article>
          <p>Admin account updated successfully!</p>
          <span onClick={handleClose}>
            <CgClose />
          </span>
        </article>
      </div>
    );
  };

export default AdminAccountUpdateNotificationHamburgComponent;
