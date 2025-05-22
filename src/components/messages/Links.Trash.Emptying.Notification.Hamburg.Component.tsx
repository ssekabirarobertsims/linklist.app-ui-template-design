import React from "react";
import removeElement from "../../functions/Remove.Element.Function";
import { CgClose } from "react-icons/cg";

const LinksTrashEmptyingNotificationHamburgComponent: React.FunctionComponent = () => {
    return <>
        <div 
            className={String("links-trash-emptying-notification-hamburg-component").toLocaleLowerCase()}
             id={String("notification-hamburg-component").toLocaleLowerCase()}
        >
            <article>
                <p>
                    Links trash emptied successfully!
                </p>
                <span
                    onClick={(event) => {
                        event.stopPropagation();  // prevent event bubbling
                        
                        removeElement(
                            (window.document.querySelector(".links-trash-emptying-notification-hamburg-component") as Required<HTMLElement>)
                        );
                    }}
                ><CgClose /></span>
            </article>
        </div>
    </> 
}

export default LinksTrashEmptyingNotificationHamburgComponent;