import React from "react";
import RemoveElement from "../functions/Remove.Element.Function";
import { CgClose } from "react-icons/cg";

const TrashLinkDeletionNotificationHamburgComponent: React.FunctionComponent = () => {
    return <>
        <div 
            className={String("trash-link-deletion-notification-hamburg-component").toLocaleLowerCase()}
            id={String("notification-hamburg-component").toLocaleLowerCase()}
            >
            <article>
                <p>
                Link deleted successfully from trash!
                </p>
                <span
                    onClick={(event) => {
                        event.stopPropagation();
                        RemoveElement(
                            (window.document.querySelector(".trash-link-deletion-notification-hamburg-component") as HTMLElement)
                        );
                    }}
                ><CgClose /></span>
            </article>
        </div>
    </> 
}

export default TrashLinkDeletionNotificationHamburgComponent;