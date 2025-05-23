import React, { useEffect, useState, useRef } from "react";
import LinkDeletionNotificationHamburgComponent from "../../components/messages/Link.Deletion.Notification.Hamburg.Component";
import LinkUpdatingNotificationHamburgComponent from "../../components/messages/Link.Updating.Notification.Hamburg.Component";
import LinkRestorationNotificationHamburgComponent from "../../components/messages/Link.Restoration.Notification.Hamburg.Component";
import LinksTrashEmptyingNotificationHamburgComponent from "../../components/messages/Links.Trash.Emptying.Notification.Hamburg.Component";
import TrashLinkDeletionNotificationHamburgComponent from "../../components/messages/Trash.Link.Deletion.Notification.Hamburg.Component";
import "../../stylesheets/Dashboard.Trash.Page.Stylesheet.css";

import { BiTrash, BiCopy } from "react-icons/bi";
import { MdRestore } from "react-icons/md";
import Copy from "../../functions/Copy.Link.Function";
import displayElement from "../../functions/Display.Element.Function";
import axios from "axios";
import { v4 as uuid } from "uuid";

import SecondaryAuthenticationObjectContext from "../../context/Secondary.Authentication.Object.Context";

type ListItemProperties = {
    id: string;
    title: string;
    link: string;
    admin_id: string;
};

interface SecondaryAuthenticationProps {
    date: string;
    message: string;
    request_id: string;
    status_code: string;
    data: {
        id: string;
        username: string;
        avatar: string;
        email: string;
        token: string;
        subscribed: string;
        verified: string;
    };
}

const DashboardTrashPageContentComponent: React.FunctionComponent = () => {
    const [list, setList] = useState<ListItemProperties[]>([]);
    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        (async function fetchTrashedLinks() {
            try {
                const { data: response } = await axios.get("http://localhost:3000/trash/links", {
                    headers: {
                        Authorization: `Bearer ${currentAdmin?.data?.token}`,
                        "Content-Type": "application/json",
                    },
                });

                const links: ListItemProperties[] = response?.saved_links || [];
                setList(links.filter((item) => item.admin_id === currentAdmin?.data?.id));
            } catch (error) {
                console.error("Error fetching trashed links:", error);
            }
        })();
    }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);

    const handleDeleteLink = async (id: string) => {
        try {
            const { data: response } = await axios.delete(`http://localhost:3000/trash/links/${id}`, {
                headers: {
                    Authorization: `Bearer ${currentAdmin?.data?.token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status_code === Number(200)) {
                displayElement(document.querySelector(".trash-link-deletion-notification-hamburg-component") as HTMLElement);
                setTimeout(() => window.location.reload(), 1500 as Required<number>);
            }
        } catch (error) {
            console.error("Error deleting link:", error);
        }
    };

    const handleRestoreLink = async (id: string, title: string, link: string) => {
        try {
            const { data: response } = await axios.post(
                `http://localhost:3000/trash/links/${id}`,
                {
                    title,
                    link,
                    admin_id: currentAdmin?.data?.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${currentAdmin?.data?.token}`,
                        "Content-Type": "Application/json",
                    },
                }
            );

            if (response.status_code === Number(200) as Required<number>) {
                displayElement(document.querySelector(".link-restoration-notification-hamburg-component") as HTMLElement);
                setTimeout(() => window.location.reload(), 1500 as Required<number>);
            } else {
                console.log(response);
                return response;
            }
        } catch (error) {
            console.error("Error restoring link:", error);
        }
    };

    const handleEmptyTrash = async (event: React.MouseEvent) => {
        event.stopPropagation();  // prevent event bubbling

        try {
            const { data: response } = await axios.delete(`http://localhost:3000/trash/empty/${currentAdmin?.data?.id}`, {
                headers: {
                    Authorization: `Bearer ${currentAdmin?.data?.token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status_code === Number(200) as Required<number>) {
                const notification = document.querySelector(".links-trash-emptying-notification-hamburg-component") as HTMLElement;
                displayElement(notification);
                setTimeout(() =>  window.location.reload(), 1500 as Required<number>);
            } else {
                console.log(response);
                return response;
            }
        } catch (error) {
            console.error("Error emptying trash:", error);
        }
    };

    return (
        <article className="dashboard-trash-page-content-component">
            <br />
            <LinkDeletionNotificationHamburgComponent />
            <LinksTrashEmptyingNotificationHamburgComponent />
            <LinkRestorationNotificationHamburgComponent />
            <LinkUpdatingNotificationHamburgComponent />
            <TrashLinkDeletionNotificationHamburgComponent />
            <h1>Trashed links</h1>
            <span className="link_no">{list.length} trashed links</span>
            {list.length > 0 ? (
                <ul className="dashboard-trash-page-ul-list-component">
                    {list.map((item) => (
                        <li key={uuid()}>
                            <div className="dashboard-trash-page-upper-content-wrapper">
                                <h2>{item.title}</h2>
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    {item.link}
                                </a>
                            </div>
                            <div className="dashboard-trash-page-down-content-wrapper">
                                <button
                                    type="button"
                                    ref={buttonRef}
                                    className="restore-link-button"
                                    onClick={(event: React.MouseEvent) => {
                                        event.stopPropagation();  // prevent event bubbling
                                        handleRestoreLink(item.id, item.title, item.link)
                                    }}
                                >
                                    <MdRestore />
                                </button>
                                <button
                                    type="button"
                                    ref={buttonRef}
                                    className="delete-link-button"
                                    onClick={() => handleDeleteLink(item.id)}
                                >
                                    <BiTrash />
                                </button>
                                <button
                                    type="button"
                                    ref={buttonRef}
                                    className="copy-link-button"
                                    onClick={() => Copy(item.link)}
                                >
                                    <BiCopy />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="no-results-message">
                    <h2>No links found in trash!</h2>
                    <p>Your trash link list is empty. Delete links to add to your trash list.</p>
                </div>
            )}
             {
                // condition the amount to be trashed depending on the users subscription plan
                list.length > 25 ? <aside id="trash-emptying-warning-component">
                    <div>
                        <article>
                            <h2><BiTrash /></h2>
                    <span>Trash is full!</span>
                    <p>Your trash link is currently full, please make sure that you empty it to free up space for more storage on this device.</p>
                     <button type="button" id="empty-trash-button" ref={buttonRef} onClick={handleEmptyTrash}>
              Empty trash
            </button>
                        </article>
                    </div>
                </aside> : ""
            }
        </article>
    );
};

export default DashboardTrashPageContentComponent;