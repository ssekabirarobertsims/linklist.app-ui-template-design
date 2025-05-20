import React from "react";
import RemoveElement from "../functions/Remove.Element.Function";
import { CgClose } from "react-icons/cg";

interface Message {
    content: string;
}

const LinkCreationNotificationHamburgComponent: React.FunctionComponent<Message> = ({ content }) => {
    const handleClose = (event: React.MouseEvent) => {
        event.stopPropagation();  // prevent event bubbling
        
        const notificationElement = document.querySelector(".link-creation-notification-hamburg-component") as HTMLElement;
        if (notificationElement) {
            RemoveElement(notificationElement);
        }
    };

    return (
        <div
            className="link-creation-notification-hamburg-component"
            id="notification-hamburg-component"
        >
            <article>
                <p>{content}</p>
                <span onClick={handleClose}>
                    <CgClose />
                </span>
            </article>
        </div>
    );
};

export default LinkCreationNotificationHamburgComponent;