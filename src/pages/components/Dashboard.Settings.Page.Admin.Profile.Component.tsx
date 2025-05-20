import React, { useRef } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import axios from "axios";
import DisplayElement from "../../functions/Display.Element.Function";
import SecondaryAuthenticationObjectContext from "../../context/Secondary.Authentication.Object.Context";
import "../../stylesheets/Dashboard.Settings.Page.Stylesheet.css";
import RemoveElement from "../../functions/Remove.Element.Function";

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

const DashboardSettingsPageAdminProfileComponent: React.FunctionComponent = () => {
    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleEditProfile = (event: React.MouseEvent) => {
        event.stopPropagation();  // prevent event bubbling

        const avatarForm = document.querySelector(".dashboard-settings-page-avatar-form-component") as HTMLElement;
        if (avatarForm) DisplayElement(avatarForm);
    };

    const handleDeleteProfile = (event: React.MouseEvent) => {
        event.stopPropagation();  // prevent event bubbling

        const deletionWarning = document.querySelector(".admin-profile-deletion-warning-component") as HTMLElement;
        if (deletionWarning) DisplayElement(deletionWarning);
    };

    const handleLogout = async (event: React.MouseEvent): Promise<void> => {
        event.stopPropagation();  // prevent event bubbling
        
        const spinner = document.querySelector(".primary-spinner-wrapper") as HTMLDivElement;
        DisplayElement(spinner);

        try {
            const response = await axios.post(
                `http://localhost:3000/admin/account/logout/${currentAdmin?.data?.id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${currentAdmin?.data?.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                localStorage.removeItem("secondary_authentication");
                setTimeout(() => (window.location.href = "/admin/account/login?query=login&form=password#hash"), 3000);
            } else {
                console.error("Error logging out");
                setTimeout(() => RemoveElement(spinner), 2000);
            }
        } catch (error) {
            console.error("Error:", error);
            setTimeout(() => RemoveElement(spinner), 2000);
        }
    };

    return (
        <>
            <br />
            <h1>Settings</h1>
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
                        <strong>{currentAdmin?.data?.verified === "true" ? "Verified" : "Unverified"}</strong>
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
        </>
    );
};

export default DashboardSettingsPageAdminProfileComponent;