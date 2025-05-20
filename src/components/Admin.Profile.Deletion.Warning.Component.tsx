import React from "react";
import axios from "axios";
import RemoveElement from "../functions/Remove.Element.Function";
import DisplayElement from "../functions/Display.Element.Function";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import PrimaryPageLoaderComponent from "./Primary.Page.Loader.Component";

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

const AdminProfileDeletionWarningComponent: React.FunctionComponent = () => {
    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;

    const handleDeleteProfile = async (event: React.MouseEvent) => {
        event.stopPropagation();  // prevent event bubbling

        const loader: HTMLDivElement = document.querySelector(".primary-spinner-wrapper") as HTMLDivElement;

        try {
            DisplayElement(loader);

            const response = await axios.delete(
                `http://localhost:3000/admin/account/unlink/${currentAdmin?.data?.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${currentAdmin?.data?.token}`,
                    },
                }
            );

            if (response.status === 200) {
                console.log(response.data);
                localStorage.removeItem("primary_authentication");
                localStorage.removeItem("secondary_authentication");

                setTimeout(() => RemoveElement(loader), 1900);
                setTimeout(() => (window.location.href = "/"), 2100);
            } else {
                console.error("Error deleting profile");
                setTimeout(() => RemoveElement(loader), 2000);
            }
        } catch (error) {
            console.error("Error:", error);
            setTimeout(() => RemoveElement(loader), 2000);
        }
    };

    const handleCancel = (event: React.MouseEvent) => {
        event.stopPropagation();  // prevent event bubbling
        
        const warningComponent = document.querySelector(
            ".admin-profile-deletion-warning-component"
        ) as HTMLElement;

        if (warningComponent) {
            RemoveElement(warningComponent);
        }
    };

    return (
        <>
            <PrimaryPageLoaderComponent />
            <aside className="admin-profile-deletion-warning-component">
                <div>
                    <article className="_wrapper">
                        <img
                        src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
                        alt="admin avatar"
                    />
                    <h2>Delete this profile for {currentAdmin?.data?.username}!</h2>
                    <p>
                        This will permanently delete saved links, username, emails, or profile
                        from this device. However, any data that was previously synced to your
                        profile will remain associated with your email account.
                    </p>
                    <article>
                        <button type="button" onClick={handleDeleteProfile}>
                            Delete Profile
                        </button>
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </article>
                    </article>
                </div>
            </aside>
        </>
    );
};

export default AdminProfileDeletionWarningComponent;