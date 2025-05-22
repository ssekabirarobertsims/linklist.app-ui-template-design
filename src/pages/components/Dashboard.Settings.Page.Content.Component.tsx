import React, { useEffect, useState, useRef } from "react";
import AdminProfileDeletionWarningComponent from "../../components/Admin.Profile.Deletion.Warning.Component";
// import DashboardSettingsPageSiteCookiesPermissionComponent from "./Dashboard.Settings.Page.Site.Cookies.Permissions.Component";
import "../../stylesheets/Dashboard.Settings.Page.Stylesheet.css";
import axios from "axios";
import displayElement from "../../functions/Display.Element.Function";
import SecondaryAuthenticationObjectContext from "../../context/Secondary.Authentication.Object.Context";
import removeElement from "../../functions/Remove.Element.Function";

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

import { FaPaintBrush } from "react-icons/fa";
import { BsCookie } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { BiPencil, BiTrash } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { v4 as uuidV4 } from "uuid";
import { format } from "date-fns";
import { MdVerified } from "react-icons/md";
import { BsFacebook } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";

import ChangeAdminAvatarFunction from "../../functions/Change.Admin.Avatar.Function";
import AdminAccountUpdateNotificationHamburgComponent from "../../components/Admin.Account.Update.Notification.Hamburg.Component";
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

const DashboardSettingsPageContentComponent: React.FunctionComponent = () => {
    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;
    const buttonRef = useRef<HTMLButtonElement>(null);
    const isVerified = currentAdmin?.data?.verified === "true" ? "verified" : "unverified";
    
        const handleEditProfile = async (event: React.MouseEvent): Promise<void> => {
            event.stopPropagation();  // prevent event bubbling
    
            const avatarForm = document.querySelector(".dashboard-settings-page-avatar-form-component") as HTMLElement;
            if (avatarForm) displayElement(avatarForm);
        };
     
        const handleDeleteProfile = async (event: React.MouseEvent): Promise<void> => {
            event.stopPropagation();  // prevent event bubbling
    
            const deletionWarning = document.querySelector(".admin-profile-deletion-warning-component") as HTMLElement;
            if (deletionWarning) displayElement(deletionWarning);
        };
    
        const handleLogout = async (event: React.MouseEvent): Promise<void> => {
            event.stopPropagation();  // prevent event bubbling
            
            const spinner = document.querySelector(".primary-spinner-wrapper") as HTMLDivElement;
            displayElement(spinner);
    
            try {
                const response = await axios.post(
                    `http://localhost:3000/admin/account/logout/${currentAdmin?.data?.id}`,
                    {
                        id: currentAdmin?.data?.id,
                        username: currentAdmin?.data?.username,
                        email: currentAdmin?.data?.email,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${currentAdmin?.data?.token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
    
                if (response.status === Number(200) as Required<number>) {
                    localStorage.removeItem("secondary_authentication");
                    setTimeout(() => (window.location.href = "/admin/account/login?query=login"), Number(3000) as Required<number>);
                } else {
                    console.error("Error logging out!");
                    setTimeout(() => removeElement(spinner), Number(2000) as Required<number>);
                }
            } catch (error) {
                console.error("Error:", error);
                setTimeout(() => removeElement(spinner), Number(2000) as Required<number>);
            }
        };

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

    const [username, setUsername] = useState<string>(currentAdmin?.data?.username || "Admin username undefined");
    const [responseMessage, setResponseMessage] = useState<string>("");

    const handleSave = async () => {
        const loader = document.querySelector(".primary-spinner-wrapper") as HTMLDivElement;
        const placeholder = document.querySelector("#current-admin-avatar-placeholder") as HTMLImageElement;

        displayElement(loader);

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
                removeElement(document.querySelector(".dashboard-settings-page-avatar-form-component") as HTMLElement);
                displayElement(document.querySelector(".admin-account-update-notification-hamburg-component") as HTMLElement);

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

                setTimeout(() => removeElement(loader), 2000);
                setTimeout(() => {
                    window.location.reload();
                    window.location.href = `/${String(username ? username.replace(" ", "") : "admin").toLocaleLowerCase().replace(" ", "")}/settings?admin=${String(username ? username.replace(" ", "") : "admin").toLocaleLowerCase().replace(" ", "")}`
                }, 3200);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error updating profile:", error);
            setResponseMessage(error.response?.data?.message || "An error occurred. Please try again.");
            console.log(responseMessage);
            setTimeout(() => removeElement(loader), 2000);
        }
    };

    const handleDiscard = () => {
        removeElement(document.querySelector(".dashboard-settings-page-avatar-form-component") as HTMLElement);
    };

    const [websiteLink, setWebsiteLink] = useState<string>("");
    const [facebookLink, setFacebookLink] = useState<string>("");


    return (
        <article className="dashboard-settings-page-content-component">
            <br />
            <h1>Settings</h1>
            <h2>Common settings</h2>
            <div className="settings-buttons-wrapper">
                <button type="button"><span><MdManageAccounts /></span>Manage account</button>
                <button type="button"><span><BsCookie /></span>Clear cookies</button>
                <button type="button"><span><FaPaintBrush /></span>Customize theme</button>
            </div>
                        <h2>Your profile</h2>
                        <div className="dashboard-settings-admin-profile-component">
                            <article className="dashboard-settings-admin-profile-component-left-content-wrapper">
                                <img
                                    src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
                                    alt="admin avatar"
                                />
                                <aside>
                                    <p>{currentAdmin?.data?.username || "Admin username undefined"}</p>
                                    <span>{currentAdmin?.data?.email || "Admin email undefined"}</span>
                                    <strong><MdVerified /> {isVerified}</strong>
                                </aside>
                            </article>
                            <article className="dashboard-settings-admin-profile-component-right-content-wrapper">
                                <button
                                    type="button"
                                    ref={buttonRef}
                                    className="edit-profile-button"
                                    onClick={handleEditProfile}
                                >
                                    <BiPencil />
                                </button>
                                <button
                                    type="button"
                                    ref={buttonRef}
                                    className="delete-profile-button"
                                    onClick={handleDeleteProfile}
                                >
                                    <BiTrash />
                                </button>
                                <button
                                    type="button"
                                    ref={buttonRef}
                                    className="logout-profile-button"
                                    onClick={handleLogout}
                                >
                                    <LuLogOut /> Logout
                                </button>
                            </article>
                        </div>
                        <h2>Your social links</h2>
                        {/* social links form component */}
                        <form action="" method="post" className="dashboard-settings-page-social-links-form-component">
                            <div className="dashboard-settings-page-social-links-form-component-wrapper">
                               <article>
                                <span><BiWorld /></span>
                                 <input
                                    type="text"
                                    name="website-link"
                                    id="website-link"
                                    placeholder="your website link"
                                    value={websiteLink}
                                    onChange={(event) => setWebsiteLink(event.target.value)}
                                />
                               </article>
                               <article>
                                <span><BsFacebook /></span>
                                 <input
                                    type="text"
                                    name="facebook-link"
                                    id="facebook-link"
                                    placeholder="your facebook profile link"
                                    value={facebookLink}
                                    onChange={(event) => setFacebookLink(event.target.value)}
                                />
                               </article>
                               <button type="button">Save links</button>
                            </div>
                        </form>
                        {/* reusable components */}
            <AdminAccountUpdateNotificationHamburgComponent />
            <PrimaryPageLoaderComponent />
            {/* avatars form component */}
            <aside className="dashboard-settings-page-avatar-form-component">
                <div className="dashboard-settings-page-avatar-form-component-wrapper">
                    <div className="_wrapper">
                        <span className="span">Choose an avatar</span>
                        <img
                            src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
                            alt="Current Admin Avatar"
                            id="current-admin-avatar-placeholder"
                        />
                        {/* avatars ul list */}
                        <ul className="dashboard-settings-page-avatar-form-component-ul-list">
                            {avatars.map((avatar) => (
                                <li key={avatar.id}>
                                    <img
                                        src={avatar.avatar}
                                        alt="Avatar"
                                        onClick={(event) => {
                                            event.stopPropagation();  // prevent event bubbling
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
            <AdminProfileDeletionWarningComponent />
        </article>
    ); 
};

export default DashboardSettingsPageContentComponent;