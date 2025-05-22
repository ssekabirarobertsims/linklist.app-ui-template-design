import React, { useEffect, useRef, useState } from "react";
import LinkCreationNotificationHamburgComponent from "../../components/messages/Link.Creation.Notification.Hamburg.Component";
import LinkDeletionNotificationHamburgComponent from "../../components/messages/Link.Deletion.Notification.Hamburg.Component";
import LinkUpdatingNotificationHamburgComponent from "../../components/messages/Link.Updating.Notification.Hamburg.Component";
import "../../stylesheets/Dashboard.Links.Page.Stylesheet.css";

import { BiPencil, BiTrash, BiCopy } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import Copy from "../../functions/Copy.Link.Function";
import displayElement from "../../functions/Display.Element.Function";
import axios from "axios";

import SecondaryAuthenticationObjectContext from "../../context/Secondary.Authentication.Object.Context";
import UpdateLinkFormComponent from "../../components/Update.Link.Form.Component";
import { v4 as uuid } from "uuid";

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

const DashboardLinksPageContentComponent: React.FunctionComponent = () => {
    const [list, setList] = useState<ListItemProperties[]>([]);
    const [searchResults, setSearchResults] = useState<ListItemProperties[]>([]);
    const [value, setValue] = useState<string>("");
    const [selectedLink, setSelectedLink] = useState<ListItemProperties | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;

    useEffect(() => {
        (async function fetchLinks() {
            try {
                const { data: response } = await axios.get("http://localhost:3000/saved/links", {
                    headers: {
                        Authorization: `Bearer ${currentAdmin?.data?.token}`,
                        "Content-Type": "application/json",
                    },
                });

                const links: ListItemProperties[] = response?.saved_links || [];
                setList(
                    links.filter((item) => item.admin_id === currentAdmin?.data?.id)
                );
            } catch (error) {
                console.error("Error fetching links:", error);
            }
        })();
    }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);

    useEffect(() => {
        const filteredResults = list.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [value, list]);

    const handleDeleteLink = async (id: string) => {
        try {
            const { data: response } = await axios.delete(
                `http://localhost:3000/saved/links/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${currentAdmin?.data?.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status_code === 200) {
                displayElement(
                    document.querySelector(".link-deletion-notification-hamburg-component") as HTMLElement
                );
                setTimeout(() => window.location.reload(), 1500);
            }
        } catch (error) {
            console.error("Error deleting link:", error);
        }
    };

    return (
        <>
            <article className="dashboard-links-page-content-component">
                <br />
                <LinkCreationNotificationHamburgComponent content="Link has been saved successfully!" />
                <LinkDeletionNotificationHamburgComponent />
                <LinkUpdatingNotificationHamburgComponent />
                <UpdateLinkFormComponent
                    selectedLink={selectedLink}
                    onUpdate={(updatedLink) => {
                        setList((prevList) =>
                            prevList.map((link) =>
                                link.id === updatedLink.id ? updatedLink : link
                            )
                        );
                    }}
                />
                <div className="dashboard-page-search-input">
                    <span>
                        <BsSearch />
                    </span>
                    <input
                        type="search"
                        name="search"
                        id="search"
                        onInput={(event) =>
                            setValue((event.target as HTMLInputElement).value)
                        }
                        value={value}
                        placeholder="search for a link..."
                        aria-placeholder="search for a link..."
                    />
                </div>
                <span className="link_no">{list.length} saved links</span>
                {searchResults.length > 0 ? (
                    <ul className="dashboard-page-saved-links-ul-list-component">
                        {searchResults.map((item) => (
                            <li key={uuid()}>
                                <div className="dashboard-page-saved-links-upper-content-wrapper">
                                    <h2>{item.title}</h2>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                                        {item.link}
                                    </a>
                                </div>
                                <div className="dashboard-page-saved-links-down-content-wrapper">
                                    <button
                                        type="button"
                                        ref={buttonRef}
                                        className="edit-link-button"
                                        onClick={() => {
                                            const updateLinkForm = document.querySelector(
                                                ".update-link-form-component"
                                            ) as HTMLElement;
                                            displayElement(updateLinkForm);
                                            const titleInput = document.querySelector(
                                                "#update-link-form-title-input"
                                            ) as HTMLInputElement;
                                            const linkInput = document.querySelector(
                                                "#update-link-form-link-input"
                                            ) as HTMLInputElement;
                                            titleInput.value = item.title;
                                            linkInput.value = item.link;
                                            setSelectedLink(item);
                                        }}
                                    >
                                        <BiPencil />
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
                        <p></p>
                    </ul>
                ) : (
                    <div className="no-results-message">
                        <h2>No links found!</h2>
                        <p>Your link list is empty. Please add a link to your list.</p>
                    </div>
                )}
            <p></p>
            </article>
        </>
    );
};

export default DashboardLinksPageContentComponent;