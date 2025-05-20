import React from "react";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";

// defined props types for the current admin object
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

const AdminAccountProfileReviewComponent: React.FunctionComponent = () => {
    // configured and use the admin info context
    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;

    // Helper variables for better readability
    const username = currentAdmin?.data?.username || "Admin username undefined";
    const email = currentAdmin?.data?.email || "Admin email undefined";
    const avatar = currentAdmin?.data?.avatar || "avatar-2.png";
    const isVerified = currentAdmin?.data?.verified === "true" ? "Verified" : "Unverified";

    return (
        <article
            className="admin-account-profile-review-side-bar"
            onClick={(event) => event.stopPropagation()}  // prevent event bubbling
        >
            <div id="_wrapper">
                <aside>
                    {/* Settings Link */}
                    <Link
                        to={{
                            pathname: "/dashboard/settings",
                            search: `admin=${encodeURIComponent(username.toLowerCase().replace(" ", ""))}`,
                        }}
                        className="admin-account-profile-review-side-bar-settings-page"
                    >
                        <CiSettings />
                    </Link>

                    {/* Avatar */}
                    <img
                        src={`/avatars/${avatar.toLowerCase()}`}
                        alt={`${username}'s avatar`}
                    />

                    {/* Admin Details */}
                    <div>
                        <p>{username}</p>
                        <span>{email}</span>
                        <strong>{isVerified}</strong>
                    </div>
                </aside>

                {/* Logout Button (Commented Out) */}
                {/* <button
                    type="button"
                    className="admin-account-profile-review-side-bar-settings-page"
                >
                    <LuLogOut /> Logout
                </button> */}
            </div>
        </article>
    );
};

export default AdminAccountProfileReviewComponent;