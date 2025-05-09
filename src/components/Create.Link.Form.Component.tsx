import React, { useRef, useState } from "react";
import RemoveElement from "../functions/Remove.Element.Function";
import DisplayElement from "../functions/Display.Element.Function";
import { CgClose } from "react-icons/cg";
import axios from "axios";

import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";

interface SecondaryAuthenticationProps {
    date: string;
    message: string;
    request_id: string; 
    status_code: string;
    data: {
        id: string,
        username: string,
        avatar: string,
        email: string,
        token: string,
        subscribed: string,
        verified: string,
    }
}

import LinkCreationNotificationHamburgComponent from "./Link.Creation.Notification.Hamburg.Component";

const CreateLinkFormComponent: React.FunctionComponent = () => {
    const [title, setTitle] = useState<string>("" as Required<Readonly<string>>);
    const [link, setLink] = useState<string>("" as Required<Readonly<string>>);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);
    
    class create {
        private static notification: HTMLElement = (window.document.querySelector(".link-creation-notification-hamburg-component") as Required<HTMLElement>);
        private static form: HTMLFormElement = (window.document.querySelector(".create-link-form-component") as HTMLFormElement);
        // private static title: string =  (window.document.querySelector("#create-link-form-title-input") as Required<HTMLInputElement>)?.value as Required<Readonly<string>>;
        // private static link: string =  (window.document.querySelector("#create-link-form-link-input") as Required<HTMLInputElement>)?.value as Required<Readonly<string>>;

        constructor() {
            (async function () {
                const { data: response } = await axios.post("http://localhost:3000/saved/links", {
                    title: (window.document.querySelector("#create-link-form-title-input") as Required<HTMLInputElement>)?.value as Required<Readonly<string>>,
                    link: (window.document.querySelector("#create-link-form-link-input") as Required<HTMLInputElement>)?.value as Required<Readonly<string>>,
                    admin_id: String(`${currentAdmin?.data?.id}`)
                } ,{ 
                    headers: {
                        "Authorization": String(`Bearer ${currentAdmin?.data?.token}` as Partial<Pick<SecondaryAuthenticationProps, "message">>),
                        "Content-Type": "Application/json"
                    }
                }); 
                
                return response;
        }());

        window.setTimeout(() => window.location.reload(), Number(1500) as Required<Readonly<number>>);
        RemoveElement(create.form);
        DisplayElement(create.notification);
        }
    }

    return <>
    <LinkCreationNotificationHamburgComponent content={"Link has been saved successfully!"} />
        <form encType="multipart/form-data" action="" method="POST" className={String("create-link-form-component").toLocaleLowerCase()}>
           <div>
                <article>
                    <button type="button" className="close" id="close"
                        onClick={(event) => {
                            event.stopPropagation();
                            RemoveElement((window.document.querySelector(".create-link-form-component") as Required<HTMLElement>));
                            (window.document.querySelector("#create-link-form-title-input") as Required<HTMLInputElement>).value = "" as Required<Readonly<string>>;
                            (window.document.querySelector("#create-link-form-link-input") as Required<HTMLInputElement>).value = "" as Required<Readonly<string>>;
                        }}
                    ><CgClose /></button>
                    <h1>Add Link</h1>
                    <input type="text" name="title" id="create-link-form-title-input"
                        placeholder="title"
                        aria-placeholder="title"
                        required
                        aria-required="true"
                        onInput={(event) => setTitle((event.target as Required<HTMLInputElement>).value)}
                        value={title}
                        maxLength={Number(50) as Required<Readonly<number>>}
                    />
                    <input type="text" name="link" id="create-link-form-link-input"
                        placeholder="link"
                        aria-placeholder="link"
                        required
                        aria-required="true"
                        onInput={(event) => setLink((event.target as Required<HTMLInputElement>).value)}
                        value={link}
                    />
                    <p></p>
                    <button type="button" ref={buttonRef}
                         onClick={async (event): Promise<void> => {
                            event.stopPropagation();
                            new create();                        
                        }}
                    >Save</button>
                </article>
           </div>
        </form>
    </>
}

export default CreateLinkFormComponent;