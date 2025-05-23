import React from "react";
import removeElement from "../../functions/Remove.Element.Function";
import { CgClose } from "react-icons/cg";
import { IoNotificationsSharp } from "react-icons/io5";

const LinkDeletionNotificationHamburgComponent: React.FunctionComponent = () => {
    return <>
        <div 
            className={String("link-deletion-notification-hamburg-component").toLocaleLowerCase()}
            id={String("notification-hamburg-component").toLocaleLowerCase()}
            >
            <article>
                <p>
                    <IoNotificationsSharp />Link has been deleted successfully!
                </p>
                <span
                    onClick={(event) => {
                        event.stopPropagation();  // prevent event bubbling
                        
                        removeElement(
                            (window.document.querySelector(".link-deletion-notification-hamburg-component") as Required<HTMLElement>)
                        );
                    }}
                ><CgClose /></span>
            </article>
        </div>
    </> 
}

export default LinkDeletionNotificationHamburgComponent;