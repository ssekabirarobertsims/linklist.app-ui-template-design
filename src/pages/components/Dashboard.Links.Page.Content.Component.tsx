import React, { useEffect, useState } from "react";
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
import CopySavedLink from "../../functions/Copy.Saved.Link.Function";
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

import RemoveElement from "../../functions/Remove.Element.Function";
import UpdateLinkFormComponent from "../../components/Update.Link.Form.Component";
import { v4 as uuid } from "uuid"; 

const DashboardLinksPageContentComponent: React.FunctionComponent = () => {
    const [list, setList] = useState<ListItemProperties[]>([] as ListItemProperties[]);

    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);

        useEffect(() => {
            (async function () {
                const request = await axios.get("http://localhost:3000/saved/links", { 
                    headers: {
                        "Authorization": String(`Bearer ${currentAdmin?.data?.token}`),
                        "Content-Type": "Application/json"
                    }
                }); 
                
                const response = await request.data;
                const links: ListItemProperties[] = response?.saved_links;
                setList(links?.filter((item: ListItemProperties) => {
                    return String(item?.admin_id ) === String(currentAdmin?.data?.id);
                }));
            }());

        }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);
        // console.log(list);
    
        const [searchResults, setSearchResults] = useState<ListItemProperties[]>(list as ListItemProperties[]);
        const [value, setValue] = useState<string>("" as string);
    
        useEffect(() => {
            // Filter the list whenever the search value changes
            const filteredResults = list.filter((item: ListItemProperties) =>
                item.title.toLocaleLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredResults);
        }, [value, list]);

        const [selectedLink, setSelectedLink] = useState<ListItemProperties | null>(null);

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
                    onInput={(event) => setValue((event.target as HTMLInputElement).value)}
                    value={value}
                    placeholder="search for a link..."
                    aria-placeholder="search for a link..."
                /> 
            </div>
        <span className="link_no">{Number(list.length) as number} saved links</span>
            {
                searchResults?.length > 0 ? <ul className={String("dashboard-page-saved-links-ul-list-component").toLocaleLowerCase()}>
                {
                    searchResults.map((item: ListItemProperties) => ( 
                        <li key={uuid() as string}>
                            
                            <div className={String("dashboard-page-saved-links-upper-content-wrapper").toLocaleLowerCase()}>
                                <h2>{String(item.title)}</h2>
                                <a href={String(item.link).toLocaleLowerCase()} target="_blank">{String(item.link).toLocaleLowerCase()}</a>
                            </div>
                            <div className={String("dashboard-page-saved-links-down-content-wrapper").toLocaleLowerCase()}>
                                <button type="button" 
                                disabled={false}
                                    className={String("edit-link-button").toLocaleLowerCase()}
                                    onClick={async (event): Promise<void> => {
                                        event.stopPropagation();
                                        console.log(event.target);
                                        const updateLinkForm = window.document.querySelector(".update-link-form-component") as HTMLElement;
                                        DisplayElement(updateLinkForm as HTMLElement);
                                        const updateLinkFormTitleInput = window.document.querySelector("#update-link-form-title-input") as HTMLInputElement;
                                        const updateLinkFormLinkInput = window.document.querySelector("#update-link-form-link-input") as HTMLInputElement;
                                        updateLinkFormTitleInput.value = String(item.title);
                                        updateLinkFormLinkInput.value = String(item.link);
                                        // updateLinkForm.setAttribute("data-id", String(item.id));
                                        setSelectedLink(item as ListItemProperties);
                                    }}
                                    >
                                    <BiPencil />
                                </button>
                                <button type="button" 
                                className={String("delete-link-button").toLocaleLowerCase()}
                                onClick={async (event): Promise<void> => {
                                    event.stopPropagation();
                                    (async function (): Promise<void> {
                                        const request = await axios.delete(`http://localhost:3000/saved/links/${String(item.id)}`, { 
                                            headers: {
                                                "Authorization": String(`Bearer ${currentAdmin?.data?.token}`),
                                                "Content-Type": "Application/json"
                                            }
                                        }); 
                                        
                                        const response = await request.data;
                                        if(request.status === 200 as number) {
                                            DisplayElement((window.document.querySelector(".link-deletion-notification-hamburg-component") as HTMLElement));

                                            window.setTimeout(() => {
                                                window.location.reload();
                                                RemoveElement(
                                                    (window.document.querySelector(".link-deletion-notification-hamburg-component") as HTMLElement)
                                                );
                                            }, 1500);
                                        } else (async function(): Promise<string> {
                                            return response;
                                        }());
                                }());
                                }}
                                > 
                                    <BiTrash />
                                </button>
                                <button type="button" className={String("copy-link-button").toLocaleLowerCase()}
                                     onClick={(event) => {
                                        event.stopPropagation();
                                        CopySavedLink(item.link);
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