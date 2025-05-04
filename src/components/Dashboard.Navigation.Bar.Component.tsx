import React from "react";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";
import DisplayElement from "../functions/Display.Element.Function";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";

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

import AdminAccountProfileReviewComponent from "./Admin.Account.Profile.Review.Component";

const DashboardPageNavigationBarComponent: React.FunctionComponent = () => {
    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);

    return <>
        <AdminAccountProfileReviewComponent />
        <nav className={String("dashboard-page-navigation-bar-component").toLocaleLowerCase()}>
            <article>
                <div className={String("dashboard-page-navigation-bar-component-left-content-wrapper").toLocaleLowerCase()}>
                    <span className={String("dashboard-page-navigation-bar-icon").toLocaleLowerCase()}>
                        <Link to={{
                            pathname: ""
                        }}>Linklist</Link>
                    </span>
                </div>
                <div className={String("dashboard-page-navigation-bar-component-right-content-wrapper").toLocaleLowerCase()}>
                    <button type="button" className={String("dashboard-page-navigation-bar-add-link-button").toLocaleLowerCase()} title="checkout new notifications"
                        onClick={(event) => {
                            event.stopPropagation();
                            DisplayElement(
                                window.document.querySelector(".create-link-form-component") as HTMLElement
                            )
                        }}
                    >
                        <GrAdd /> create link
                    </button>
                    <button type="button" className={String("dashboard-page-navigation-bar-notification-button").toLocaleLowerCase()} title="checkout new notifications" onClick={(event) => {
                        event.stopPropagation();
                        DisplayElement(
                            (window.document.querySelector(".notifications-side-bar-component") as HTMLElement)
                        );
                    }}>
                        <IoNotificationsOutline />
                    </button>
                    <img src={`${String(`/avatars/${
                        currentAdmin?.data?.avatar ? currentAdmin?.data?.avatar : "avatar-2.png"
                        }`).toLocaleLowerCase()}`} alt="admin avatar"
                        onClick={(event) => {
                            event.stopPropagation();
                            DisplayElement(
                                (window.document.querySelector(".admin-account-profile-review-side-bar") as HTMLElement)
                            );
                        }}
                         />
                </div>
            </article>
        </nav>
    </>
}

export default DashboardPageNavigationBarComponent;