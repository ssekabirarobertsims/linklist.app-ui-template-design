import React from "react";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";
import DisplayElement from "../functions/Display.Element.Function";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import AdminAccountProfileReviewComponent from "./Admin.Account.Profile.Review.Component";

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

const DashboardPageNavigationBarComponent: React.FunctionComponent = () => {
    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;

    const handleCreateLinkClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        const createLinkForm = document.querySelector(".create-link-form-component") as HTMLElement;
        if (createLinkForm) DisplayElement(createLinkForm);
    };

    const handleNotificationsClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        const notificationsSidebar = document.querySelector(".notifications-side-bar-component") as HTMLElement;
        if (notificationsSidebar) DisplayElement(notificationsSidebar);
    };

    const handleProfileClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        const profileSidebar = document.querySelector(".admin-account-profile-review-side-bar") as HTMLElement;
        if (profileSidebar) DisplayElement(profileSidebar);
    };

    return (
        <>
            <AdminAccountProfileReviewComponent />
            <nav className="dashboard-page-navigation-bar-component">
                <article>
                    {/* Left Content */}
                    <div className="dashboard-page-navigation-bar-component-left-content-wrapper">
                        <span className="dashboard-page-navigation-bar-icon">
                            <Link to="/">Linklist</Link>
                        </span>
                    </div>

                    {/* Right Content */}
                    <div className="dashboard-page-navigation-bar-component-right-content-wrapper">
                        {/* Create Link Button */}
                        <button
                            type="button"
                            className="dashboard-page-navigation-bar-add-link-button"
                            title="Create a new link"
                            onClick={handleCreateLinkClick}
                        >
                            <GrAdd /> Create Link
                        </button>

                        {/* Notifications Button */}
                        <button
                            type="button"
                            className="dashboard-page-navigation-bar-notification-button"
                            title="Check new notifications"
                            onClick={handleNotificationsClick}
                        >
                            <IoNotificationsOutline />
                        </button>

                        {/* Admin Avatar */}
                        <img
                            src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
                            alt="Admin Avatar"
                            onClick={handleProfileClick}
                        />
                    </div>
                </article>
            </nav>
        </>
    );
};

export default DashboardPageNavigationBarComponent;