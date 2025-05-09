import React, { useEffect, useRef, useState } from "react";
import LinkCreationNotificationHamburgComponent from "../../components/Link.Creation.Notification.Hamburg.Component";
import LinkDeletionNotificationHamburgComponent from "../../components/Link.Deletion.Notification.Hamburg.Component";
import LinkUpdatingNotificationHamburgComponent from "../../components/Link.Updating.Notification.Hamburg.Component";
import "../../stylesheets/Dashboard.Links.Page.Stylesheet.css";

type ListItemProperties = {
    id: string;
    title: string;
    link: string;
    admin_id: string;
} 

import { BiPencil, BiTrash, BiCopy } from "react-icons/bi";
import Copy from "../../functions/Copy.Link.Function";
import { BsSearch } from "react-icons/bs";
import DisplayElement from "../../functions/Display.Element.Function";
import axios from "axios";

import SecondaryAuthenticationObjectContext from "../../context/Secondary.Authentication.Object.Context";

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

import UpdateLinkFormComponent from "../../components/Update.Link.Form.Component";
import { v4 as uuid } from "uuid"; 

const DashboardLinksPageContentComponent: React.FunctionComponent = () => {
    const [list, setList] = useState<ListItemProperties[]>([] as ListItemProperties[]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as Required<Readonly<(SecondaryAuthenticationProps)>>;

        useEffect(() => {
            (async function () {
                const { data: response } = await axios.get("http://localhost:3000/saved/links", { 
                    headers: {
                        "Authorization": String(`Bearer ${currentAdmin?.data?.token}` as Partial<Pick<SecondaryAuthenticationProps, "message">>),
                        "Content-Type": "Application/json"
                    }
                }); 
                
                const links: ListItemProperties[] = response?.saved_links;
                setList(links?.filter((item: ListItemProperties) => {
                    return String(item?.admin_id ) === String(currentAdmin?.data?.id) as Required<string>;
                }));
            }());
        }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);
    
        const [searchResults, setSearchResults] = useState<ListItemProperties[]>(list as ListItemProperties[]);
        const [value, setValue] = useState<string>("" as Required<Readonly<string>>);
    
        useEffect(() => { 
            // Filter the list whenever the search value changes
            const filteredResults = list.filter((item: ListItemProperties) =>
                item.title.toLocaleLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredResults);
        }, [value, list]);

        const [selectedLink, setSelectedLink] = useState<ListItemProperties | null>(null);

        class trashLink {
            private static readonly notification: HTMLElement = (window.document.querySelector(".link-deletion-notification-hamburg-component") as Readonly<HTMLElement>);

            constructor(id: string) {
                (async function (): Promise<void> {
                    const { data: response } = await axios.delete(`http://localhost:3000/saved/links/${String(id) as Readonly<string>}`, { 
                        headers: {
                            "Authorization": String(`Bearer ${currentAdmin?.data?.token}` as Partial<Pick<SecondaryAuthenticationProps, "message">>),
                            "Content-Type": "Application/json"
                        }
                    }); 
                    
                    if(response.status_code === Number(200) as Partial<Readonly<number>>) {
                        DisplayElement(trashLink.notification);
                        window.setTimeout(() => window.location.reload(), Number(1500) as Partial<Readonly<number>>);
                    } else (async function(): Promise<string> {
                        return response;
                    }());
            }());
            }
        }

    return <>
        <article className={String("dashboard-home-page-content-component").toLocaleLowerCase()}>
            <br />
            <p></p>
            <LinkCreationNotificationHamburgComponent content={"Link has been saved successfully!"}  />
            <LinkDeletionNotificationHamburgComponent />
            <LinkUpdatingNotificationHamburgComponent />
            <UpdateLinkFormComponent
                selectedLink={selectedLink}
                onUpdate={(updatedLink) => {
                    // Update the list with the new link data
                    setList((prevList) =>
                        prevList.map((link) =>
                            link.id === updatedLink.id ? updatedLink : link
                        )
                    );
                }}
            />
            <div className={String("dashboard-page-search-input").toLocaleLowerCase()}>
                <span>
                    <BsSearch />
                </span>
                <input type="search" name="search" id="search"
                    onInput={(event) => setValue((event.target as Required<HTMLInputElement>).value)}
                    value={value}
                    placeholder="search for a link..."
                    aria-placeholder="search for a link..."
                /> 
            </div>
        <span className="link_no">{Number(list.length) as Partial<Readonly<number>>} saved links</span>
            {
                searchResults?.length > 0 ? <ul className={String("dashboard-page-saved-links-ul-list-component").toLocaleLowerCase()}>
                {
                    searchResults.map((item: ListItemProperties) => ( 
                        <li key={uuid() as Required<Readonly<string>>}>
                            
                            <div className={String("dashboard-page-saved-links-upper-content-wrapper").toLocaleLowerCase()}>
                                <h2>{String(item.title)}</h2>
                                <a href={String(item.link).toLocaleLowerCase()} target="_blank">{String(item.link).toLocaleLowerCase()}</a>
                            </div>
                            <div className={String("dashboard-page-saved-links-down-content-wrapper").toLocaleLowerCase()}>
                                <button type="button"  
                                disabled={Boolean(false) as Required<boolean>}
                                ref={buttonRef}
                                    className={String("edit-link-button").toLocaleLowerCase()}
                                    onClick={async (event): Promise<void> => {
                                        event.stopPropagation();
                                        console.log(event.target);
                                        const updateLinkForm = window.document.querySelector(".update-link-form-component") as Required<HTMLElement>;
                                        DisplayElement(updateLinkForm as Required<HTMLElement>);
                                        const updateLinkFormTitleInput = window.document.querySelector("#update-link-form-title-input") as Required<HTMLInputElement>;
                                        const updateLinkFormLinkInput = window.document.querySelector("#update-link-form-link-input") as Required<HTMLInputElement>;
                                        updateLinkFormTitleInput.value = String(item.title);
                                        updateLinkFormLinkInput.value = String(item.link);
                                        setSelectedLink(item as ListItemProperties);
                                    }}
                                    >
                                    <BiPencil />
                                </button>
                                <button type="button"  
                                disabled={Boolean(false) as Required<boolean>}
                                ref={buttonRef}
                                className={String("delete-link-button").toLocaleLowerCase()}
                                onClick={async (event): Promise<void> => {
                                    event.stopPropagation();
                                    new trashLink(item?.id);
                                }}
                                > 
                                    <BiTrash />
                                </button>
                                <button type="button" 
                                disabled={Boolean(false) as Required<boolean>}
                                ref={buttonRef}
                                className={String("copy-link-button").toLocaleLowerCase()}
                                     onClick={(event) => {
                                        event.stopPropagation();
                                        Copy(item.link);
                                    }}
                                >
                                    <BiCopy />
                                </button>
                               
                            </div> 
                        </li>
                    ))
                }
            </ul> : <div className={String("no-results-message").toLocaleLowerCase()}>
                <h2>No links found!</h2>
                <p>
                    Your link list is empty. Please add a link to your list.
                </p>
            </div>
            }
            <p></p>
        </article>
    </> 
}

export default DashboardLinksPageContentComponent; 