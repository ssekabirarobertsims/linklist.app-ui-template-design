import React, { useEffect, useState } from "react";
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
import { format } from "date-fns";
import LinksCreatedChart from "../../components/Line.Chart.Component";

const DashboardHomePageContentComponent: React.FunctionComponent = () => {
    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;
    // const buttonRef = useRef<HTMLButtonElement>(null);
    const [savedLinksList, setSavedLinksList] = useState<ListItemProperties[]>([]);
    const [trashedLinksList, setTrashedLinksList] = useState<ListItemProperties[]>([]);

    useEffect(() => {
            (async function fetchSavedLinks() {
                try {
                    const { data: response } = await axios.get("https://api-linklist-restapi.onrender.com/saved/links", {
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
                const { data: response } = await axios.get("https://api-linklist-restapi.onrender.com/trash/links", {
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
                <p></p>
                   <h1>Welcome {currentAdmin?.data?.username || "Admin username undefined"}</h1>
                   <p>Today <strong>
                        ({
                        format(new Date(), "dd/MM/yyyy")
                    })
                    </strong> everything running smoothly. You may be having unread notifications!</p>
                 
                    <ul id="content-ul">
                        <li><span>{Number(savedLinksList.length) as Required<number>}</span>
                            <Link
                                to={{ 
                                    pathname: `/${String(
        currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}/saved/links`,
                                    search: `admin=${String(
        currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}`,
                                }}
                            >saved link(s)</Link>
                        </li>
                        <li>
                            <span>{Number(trashedLinksList.length) as Required<number>}</span>
                        <Link
                                to={{
                                    pathname: `/${String(
        currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}/links/trash`,
                                    search: `admin=${String(
        currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}`,
                                }}
                            >trashed link(s)</Link>
                         </li>
                    </ul>
                    <div>
                        <LinksCreatedChart />
                    </div>
               </article>
            </div>
            <br />
        </article>
    );
};

export default DashboardHomePageContentComponent;

/*                         <Link
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
                            </Link>*/