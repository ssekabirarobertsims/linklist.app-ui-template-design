import React, { useRef } from "react";
import SecondaryAuthenticationObjectContext from "../../context/Secondary.Authentication.Object.Context";
import { Link } from "react-router-dom";

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

const DashboardHomePageContentComponent: React.FunctionComponent = () => {
    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);
const buttonRef = useRef<HTMLButtonElement>(null);

    return <>
        <article className={String("dashboard-home-page-content-component").toLocaleLowerCase()}>
            <br />
            <div className="current-admin-profile-banner">
                <img src={`${String(`/avatars/${
                        currentAdmin?.data?.avatar ? currentAdmin?.data?.avatar : "avatar-2.png"
                        }`).toLocaleLowerCase()}`} alt="admin avatar" />
            </div>
            <aside>
                <div>
                    <div>
                        <article>
                        <h1>Welcome back {
                                currentAdmin?.data?.username ? currentAdmin?.data?.username : "Admin"
                            } </h1>
                        <p>
                            You are logged in as {currentAdmin?.data?.username ? currentAdmin?.data?.username : "Admin"} in linklist admin dashboard. Linklist is a free and open source link management system, so enjoy your stay as you subscribe to linklist to be able to receive free monthly newsletters and updates for the software and tips on how to improve your usage for the app.
                        </p> 
                        <Link to={
                            {
                                pathname: `/admin/account/subscription`,
                                search:  `admin=${String(currentAdmin?.data?.username ? currentAdmin?.data?.username : "admin").toLocaleLowerCase().replace(" ", "")}`
                            }
                        }>
                            <button type="button"
                                disabled={Boolean(false) as Required<boolean>}
                                ref={buttonRef}
                                className="btn btn-secondary"
                            >Make Subscription</button>
                        </Link>
                        </article>
                    </div>
                </div>
            </aside>
        </article>
    </>
}

export default DashboardHomePageContentComponent;