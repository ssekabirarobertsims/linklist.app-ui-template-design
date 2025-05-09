import React from "react";
import RemoveElement from "../functions/Remove.Element.Function";
import { CgClose } from "react-icons/cg";

const AdminAccountUpdateNotificationHamburgComponent: React.FunctionComponent = () => {
    return <>
        <div 
            className={String("admin-account-update-notification-hamburg-component").toLocaleLowerCase()}
             id={String("notification-hamburg-component").toLocaleLowerCase()}
        >
            <article>
                <p>
                    Admin account updated successfully!
                </p>
                <span
                    onClick={(event) => {
                        event.stopPropagation();
                        RemoveElement(
                            (window.document.querySelector(".admin-account-update-notification-hamburg-component") as Required<HTMLElement>)
                        );
                    }}
                ><CgClose /></span>
            </article>
        </div>
    </> 
}

export default AdminAccountUpdateNotificationHamburgComponent;