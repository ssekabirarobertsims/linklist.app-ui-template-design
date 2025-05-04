import React, { useEffect, useState } from "react";
import LinkCreationNotificationHamburgComponent from "../../components/Link.Creation.Notification.Hamburg.Component";
import LinkDeletionNotificationHamburgComponent from "../../components/Link.Deletion.Notification.Hamburg.Component";
import LinkUpdatingNotificationHamburgComponent from "../../components/Link.Updating.Notification.Hamburg.Component";
import LinkRestorationNotificationHamburgComponent from "../../components/Link.Restoration.Notification.Hamburg.Component";
import LinksTrashEmptyingNotificationHamburgComponent from "../../components/Links.Trash.Emptying.Notification.Hamburg.Component";
import TrashLinkDeletionNotificationHamburgComponent from "../../components/Trash.Link.Deletion.Notification.Hamburg.Component";
import "../../stylesheets/Dashboard.Trash.Page.Stylesheet.css";

type ListItemProperties = {
    id: string;
    title: string;
    link: string;
    admin_id: string;
}

import { BiTrash, BiCopy } from "react-icons/bi";
import { MdRestore } from "react-icons/md";
import CopySavedLink from "../../functions/Copy.Saved.Link.Function";
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
    }
}

import RemoveElement from "../../functions/Remove.Element.Function";
import { v4 as uuid } from "uuid";

const DashboardTrashPageContentComponent: React.FunctionComponent = () => {
    const [list, setList] = useState<ListItemProperties[]>([] as ListItemProperties[]);

    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);

        useEffect(() => {
            (async function () {
                const request = await axios.get("http://localhost:3000/trash/links", { 
                    headers: {
                        "Authorization": String(`Bearer ${currentAdmin?.data?.token}`),
                        "Content-Type": "Application/json"
                    }
                }); 
                
                const response = await request.data;
                const links: ListItemProperties[] = response?.saved_links;

                setList(links?.filter((item: ListItemProperties) => {
                    return String(item?.admin_id) === String(currentAdmin?.data?.id);
                }));
            }());

        }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);
    


    return <>
        <article className={String("dashboard-home-page-content-component").toLocaleLowerCase()}>
            <br />
            <p></p>
            <LinkCreationNotificationHamburgComponent />
            <LinkDeletionNotificationHamburgComponent />
            <LinksTrashEmptyingNotificationHamburgComponent />
            <LinkRestorationNotificationHamburgComponent />
            <LinkUpdatingNotificationHamburgComponent />
            <TrashLinkDeletionNotificationHamburgComponent />
            <h1>Links Trash</h1>
        <span className="link_no">{Number(list.length) as number} trashed links</span>
            {
                list?.length > 0 ? <ul className={String("dashboard-trash-page-ul-list-component").toLocaleLowerCase()}>
                {
                    list.map((item: ListItemProperties) => ( 
                        <li key={uuid() as string}>
                            
                            <div className={String("dashboard-trash-page-upper-content-wrapper").toLocaleLowerCase()}>
                                <h2>{String(item.title)}</h2>
                                <a href={String(item.link).toLocaleLowerCase()} target="_blank">{String(item.link).toLocaleLowerCase()}</a>
                            </div>
                            <div className={String("dashboard-trash-page-down-content-wrapper").toLocaleLowerCase()}>
                                <button type="button"
                                className={String("restore-link-button").toLocaleLowerCase()}
                                onClick={async (event): Promise<void> => {
                                    event.stopPropagation();
                                    (async function () {
                                        const request = await axios.post(`http://localhost:3000/trash/links/${String(item.id)}`, {
                                            title: item?.title as string,
                                            link: item?.link,
                                            admin_id: String(`${currentAdmin?.data?.id}`),
                                        } ,{ 
                                            headers: {
                                                "Authorization": String(`Bearer ${currentAdmin?.data?.token}`),
                                                "Content-Type": "Application/json"
                                            }
                                        }); 
                                        
                                        const response = await request.data;
                                        console.log(response);
                                }());
    
                                window.setTimeout(() => {
                                    window.location.reload();
                                    RemoveElement(
                                        (window.document.querySelector(".link-restoration-notification-hamburg-component") as HTMLElement)
                                    );
                                }, 1500);
    
                                RemoveElement(
                                    (window.document.querySelector(".create-link-form-component") as HTMLElement)
                                );
                                DisplayElement(
                                    (window.document.querySelector(".link-restoration-notification-hamburg-component") as HTMLElement)
                                );
                                }}
                                ><MdRestore /></button>
                                <button type="button" 
                                className={String("delete-link-button").toLocaleLowerCase()}
                                onClick={async (event): Promise<void> => {
                                    event.stopPropagation();
                                    (async function (): Promise<void> {
                                        const request = await axios.delete(`http://localhost:3000/trash/links/${String(item.id)}`, { 
                                            headers: {
                                                "Authorization": String(`Bearer ${currentAdmin?.data?.token}`),
                                                "Content-Type": "Application/json"
                                            }
                                        }); 
                                        
                                        const response = await request.data;
                                        if(request.status === 200 as number) {
                                            DisplayElement((window.document.querySelector(".trash-link-deletion-notification-hamburg-component") as HTMLElement));

                                            window.setTimeout(() => {
                                                window.location.reload();
                                                RemoveElement(
                                                    (window.document.querySelector(".trash-link-deletion-notification-hamburg-component") as HTMLElement)
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
                <h2>No links found in trash!</h2>
                <p>
                    Your trash link list is empty. Delete links add to your trash list.
                </p>
            </div>
            }
            <p></p>
            <button type="button" id="empty-trash-button"
                onClick={async (event): Promise<void> => {
                    event.stopPropagation();
                    (async function (): Promise<void> {
                        const request = await axios.delete(`http://localhost:3000/trash/empty//${String(currentAdmin?.data?.id)}`, { 
                            headers: {
                                "Authorization": String(`Bearer ${currentAdmin?.data?.token}`),
                                "Content-Type": "Application/json"
                            }
                        }); 
                        
                        const response = await request.data;
                        
                        if(request.status === 200 as number) {
                            DisplayElement((window.document.querySelector(".links-trash-emptying-notification-hamburg-component") as HTMLElement));
                            window.setTimeout(() => {
                                window.location.reload();
                                RemoveElement(
                                    (window.document.querySelector(".links-trash-emptying-notification-hamburg-component") as HTMLElement)
                                );
                            }, 1500);
                        } else (async function(): Promise<string> {
                            return response;
                        }());
                }());
                }}
            ><BiTrash /> Empty trash</button>
        <p></p>
        </article>
    </> 
}

export default DashboardTrashPageContentComponent;