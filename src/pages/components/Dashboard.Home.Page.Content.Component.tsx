import React, { useRef, useEffect, useState } from "react";
import SecondaryAuthenticationObjectContext from "../../context/Secondary.Authentication.Object.Context";
import { Link } from "react-router-dom";

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

type ListItemProperties = {
    id: string;
    title: string;
    link: string;
    admin_id: string;
};

import axios from "axios";

const DashboardHomePageContentComponent: React.FunctionComponent = () => {
    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [savedLinksList, setSavedLinksList] = useState<ListItemProperties[]>([]);
    const [trashedLinksList, setTrashedLinksList] = useState<ListItemProperties[]>([]);

    useEffect(() => {
            (async function fetchSavedLinks() {
                try {
                    const { data: response } = await axios.get("http://localhost:3000/saved/links", {
                        headers: {
                            Authorization: `Bearer ${currentAdmin?.data?.token}`,
                            "Content-Type": "application/json",
                        },
                    });
    
                    const links: ListItemProperties[] = response?.saved_links || [];
                    setSavedLinksList(
                        links.filter((item) => item.admin_id === currentAdmin?.data?.id)
                    );
                } catch (error) {
                    console.error("Error fetching links:", error);
                }
            })();
        }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);

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
                setTrashedLinksList(links.filter((item) => item.admin_id === currentAdmin?.data?.id));
            } catch (error) {
                console.error("Error fetching trashed links:", error);
            }
        })();
    }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);

    return (
        <article className="dashboard-home-page-content-component">
            <br />
            <div className="current-admin-profile-banner">
               <article>
                <h1>Welcome back {currentAdmin?.data?.username || "Admin username undefined"}</h1>
                 <img
                    src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
                    alt="admin avatar"
                />
                <div id="admin-info-wrapper">
                    <h3>{currentAdmin?.data?.username || "Admin username undefined"}</h3>
                    <span>{currentAdmin?.data?.email || "Admin email undefined"}</span>
                    <strong>{currentAdmin?.data?.verified === "true" ? "Verified" : "Unverified"}</strong>
                    <p></p>
                    <p></p>
                    <ul id="content-ul">
                        <li>{Number(savedLinksList.length) as Required<number>} saved link(s)</li>
                        <li>{Number(0) as Required<number>} social link(s)</li>
                        <li>{Number(trashedLinksList.length) as Required<number>} trashed link(s)</li>
                    </ul>
                    <br />
                    <aside>
                         <Link
                                to={{
                                    pathname: `/admin/account/subscription`,
                                    search: `admin=${encodeURIComponent(
                                        currentAdmin?.data?.username?.toLowerCase() || "admin"
                                    )}`,
                                }}
                            >
                                <button
                                    type="button"
                                    disabled={false}
                                    ref={buttonRef}
                                    className="btn btn-secondary"
                                >
                                    Make Subscription
                                </button>
                            </Link>
                             <Link
                                to={{
                                    pathname: `/dashboard/settings`,
                                    search: `admin=${encodeURIComponent(
                                        currentAdmin?.data?.username?.toLowerCase() || "admin"
                                    )}`,
                                }}
                            >
                                <button
                                    type="button"
                                    disabled={false}
                                    ref={buttonRef}
                                    className="btn btn-secondary"
                                >
                                    Edit
                                </button>
                            </Link>
                    </aside>
                </div>
               </article>
            </div>
            <br />
        </article>
    );
};

export default DashboardHomePageContentComponent;