import React from "react";
import RemoveElement from "../functions/Remove.Element.Function";
import { CgClose } from "react-icons/cg";
interface Message {
    content: string;
}

const LinkCreationNotificationHamburgComponent: React.FunctionComponent<Message> = ({content}) => {
    return <>
        <div 
            className={String("link-creation-notification-hamburg-component").toLocaleLowerCase()}
            id={String("notification-hamburg-component").toLocaleLowerCase()}
            >
            <article>
                <p> 
                    {
                        content
                    }
                </p>
                <span
                    onClick={(event) => {
                        event.stopPropagation();
                        RemoveElement(
                            (window.document.querySelector(".link-creation-notification-hamburg-component") as HTMLElement)
                        );
                    }}
                ><CgClose /></span>
            </article>
        </div>
    </> 
}

export default LinkCreationNotificationHamburgComponent;