import React, { useRef } from "react";
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

const DashboardHomePageContentComponent: React.FunctionComponent = () => {
    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <article className="dashboard-home-page-content-component">
            <br />
            <div className="current-admin-profile-banner">
               <article>
                 <img
                    src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
                    alt="admin avatar"
                />
                {/* <div>
                    <p>{currentAdmin?.data?.username || "Admin username undefined"}</p>
                    <span>{currentAdmin?.data?.email || "Admin email undefined"}</span>
                    <strong>{currentAdmin?.data?.verified === "true" ? "Verified" : "Unverified"}</strong>
                </div> */}
               </article>
            </div>
            <br />
            <aside>
                <div>
                            <h1>
                                Welcome back {currentAdmin?.data?.username || "Admin"}
                            </h1>
                            <p>
                                You are logged in as {currentAdmin?.data?.username || "Admin"} in the
                                Linklist admin dashboard. Linklist is a free and open-source link
                                management system, so enjoy your stay as you subscribe to Linklist to
                                receive free monthly newsletters, updates for the software, and tips
                                on how to improve your usage of the app.
                            </p>
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
                </div>
            </aside>
            <br />
        </article>
    );
};

export default DashboardHomePageContentComponent;