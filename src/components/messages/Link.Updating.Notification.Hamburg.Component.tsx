import React from "react";
import removeElement from "../../functions/Remove.Element.Function";
import { CgClose } from "react-icons/cg";

const LinkUpdatingNotificationHamburgComponent: React.FunctionComponent =
  () => {
    return (
      <>
        <div
          className={String(
            "link-updating-notification-hamburg-component"
          ).toLocaleLowerCase()}
          id={String("notification-hamburg-component").toLocaleLowerCase()}
        >
          <article>
            <p>Link has been updated successfully!</p>
            <span
              onClick={(event) => {
                event.stopPropagation(); // prevent event bubbling

                removeElement(
                  window.document.querySelector(
                    ".link-updating-notification-hamburg-component"
                  ) as Required<HTMLElement>
                );
              }}
            >
              <CgClose />
            </span>
          </article>
        </div>
      </>
    );
  };

export default LinkUpdatingNotificationHamburgComponent;
