import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import "../../stylesheets/Dashboard.Settings.Page.Stylesheet.css";

import ChangeAdminAvatarFunction from "../../functions/Change.Admin.Avatar.Function";
import RemoveElement from "../../functions/Remove.Element.Function";
import axios from "axios";
import SecondaryAuthenticationObjectContext from "../../context/Secondary.Authentication.Object.Context";

import { format } from "date-fns";
import AdminAccountUpdateNotificationHamburgComponent from "../../components/Admin.Account.Update.Notification.Hamburg.Component";
import DisplayElement from "../../functions/Display.Element.Function";
import PrimaryPageLoaderComponent from "../../components/Primary.Page.Loader.Component";

interface AvatarProperties {
    id: string;
    content: string;
    avatar: string;
}

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

const DashboardSettingsPageAvatarFormComponent: React.FunctionComponent = () => {
    const [avatars, setAvatars] = useState<AvatarProperties[]>([
        { id: uuidV4(), content: "avatar 1", avatar: "/avatars/avatar-1.png" },
        { id: uuidV4(), content: "avatar 2", avatar: "/avatars/avatar-2.png" },
        { id: uuidV4(), content: "avatar 3", avatar: "/avatars/avatar-3.png" },
        { id: uuidV4(), content: "avatar 4", avatar: "/avatars/avatar-4.png" },
        { id: uuidV4(), content: "avatar 5", avatar: "/avatars/avatar-5.png" },
        { id: uuidV4(), content: "avatar 6", avatar: "/avatars/avatar-6.png" },
        { id: uuidV4(), content: "avatar 7", avatar: "/avatars/avatar-7.png" },
        { id: uuidV4(), content: "avatar 8", avatar: "/avatars/avatar-8.png" },
        { id: uuidV4(), content: "avatar 9", avatar: "/avatars/avatar-9.png" },
        { id: uuidV4(), content: "avatar 10", avatar: "/avatars/avatar-10.png" },
    ]);

    useEffect(() => {
        document.title = "Page - Avatar | LinkList";
        setAvatars(avatars);
    }, [avatars]);

    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;
    const [username, setUsername] = useState<string>(currentAdmin?.data?.username || "Admin username undefined");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSave = async () => {
        const loader = document.querySelector(".primary-spinner-wrapper") as HTMLDivElement;
        const placeholder = document.querySelector(".admin-form-avatar-placeholder") as HTMLImageElement;

        DisplayElement(loader);

        try {
            const response = await axios.patch(
                `http://localhost:3000/admin/account/append/${currentAdmin?.data?.id}`,
                {
                    username,
                    avatar: placeholder.src.split("/avatars/")[1],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${currentAdmin?.data?.token}`,
                    },
                }
            );

            setResponseMessage(response.data?.message || "Profile updated successfully!");

            if (response.status === 200) {
                RemoveElement(document.querySelector(".dashboard-settings-page-avatar-form-component") as HTMLElement);
                DisplayElement(document.querySelector(".admin-account-update-notification-hamburg-component") as HTMLElement);

                // Update localStorage
                localStorage.setItem(
                    "primary_authentication",
                    JSON.stringify({
                        email: currentAdmin?.data?.email,
                        username,
                        avatar: placeholder.src.split("/avatars/")[1],
                    })
                );

                localStorage.setItem(
                    "secondary_authentication",
                    JSON.stringify({
                        data: {
                            avatar: placeholder.src.split("/avatars/")[1],
                            email: currentAdmin?.data?.email,
                            id: currentAdmin?.data?.id,
                            token: currentAdmin?.data?.token,
                            username,
                            subscribed: currentAdmin?.data?.subscribed,
                            verified: currentAdmin?.data?.verified,
                        },
                        date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
                        message: currentAdmin?.message,
                        request_id: currentAdmin?.request_id,
                        status_code: currentAdmin?.status_code,
                    })
                );

                setTimeout(() => RemoveElement(loader), 2000);
                setTimeout(() => window.location.reload(), 3200);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error updating profile:", error);
            setResponseMessage(error.response?.data?.message || "An error occurred. Please try again.");
            console.log(responseMessage);
            setTimeout(() => RemoveElement(loader), 2000);
        }
    };

    const handleDiscard = () => {
        RemoveElement(document.querySelector(".dashboard-settings-page-avatar-form-component") as HTMLElement);
    };

    return (
        <>
            <AdminAccountUpdateNotificationHamburgComponent />
            <PrimaryPageLoaderComponent />
            <aside className="dashboard-settings-page-avatar-form-component">
                <div className="dashboard-settings-page-avatar-form-component-wrapper">
                    <div className="_wrapper">
                        <span className="span">Choose an avatar</span>
                        <img
                            src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
                            alt="Current Admin Avatar"
                            className="admin-form-avatar-placeholder"
                        />
                        <ul className="dashboard-settings-page-avatar-form-component-ul-list">
                            {avatars.map((avatar) => (
                                <li key={avatar.id}>
                                    <img
                                        src={avatar.avatar}
                                        alt="Avatar"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            ChangeAdminAvatarFunction(event.target as HTMLImageElement);
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                        <span>Edit profile username</span>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Current admin username"
                            value={username}
                            maxLength={20}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <article>
                            <button type="button" ref={buttonRef} id="save" onClick={handleSave}>
                                Save
                            </button>
                            <button type="button" ref={buttonRef} id="discard" onClick={handleDiscard}>
                                Discard
                            </button>
                        </article>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default DashboardSettingsPageAvatarFormComponent;