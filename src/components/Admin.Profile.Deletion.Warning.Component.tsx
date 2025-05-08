import React from "react";
import RemoveElement from "../functions/Remove.Element.Function";

import axios from "axios";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import DisplayElement from "../functions/Display.Element.Function";

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

import PrimaryPageLoaderComponent from "./Primary.Page.Loader.Component";

const AdminProfileDeletionWarningComponent: React.FunctionComponent = () => {
    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);

    class del {
        private static loader: HTMLDivElement = (window.document.querySelector(".primary-spinner-wrapper") as HTMLDivElement);

        constructor() {
            (async function(): Promise<void> {
                try {
                    const request = await axios.delete(`http://localhost:3000/admin/account/unlink/${String(currentAdmin?.data?.id)}`, {
                        headers: {
                            "Content-Type": "Application/json",
                            "Authorization": String(`Bearer ${currentAdmin?.data?.token}`)
                    }
                });
                    const response = await request.data;
                    
                    if(request?.status === Number(200) as number) {
                        console.log(response);
                        window.localStorage.removeItem("primary_authentication");
                        window.localStorage.removeItem("secondary_authentication");
                        window.setTimeout(() => RemoveElement(del.loader), 1900 as number);
                        window.setTimeout(() => window.location.href = "/", 2100 as number);
                    } else {
                        window.setTimeout(() => RemoveElement(del.loader), 2000 as number);
                        console.log("error");
                    }
                  } catch (error) {
                        window.setTimeout(() => RemoveElement(del.loader), 2000 as number);
                       console.log(error);
                  }
            }());
        }
    }

    return <>
    <PrimaryPageLoaderComponent />
        <aside className={String("admin-profile-deletion-warning-component").toLocaleLowerCase()}>
            <div>
                <h2>Delete this profile?</h2>
                <p>This will permanently delete saved links, username, emails or profile from this device. However, any data that was previously synced to your profile will remain associated with your email account.</p>
                <article>
                    <button type="button" onClick={async (event) => {
                        event.stopPropagation();
                        window.setTimeout(() => DisplayElement((window.document.querySelector(".primary-spinner-wrapper") as HTMLDivElement)), 0 as number);
                        
                        new del();
                    }}>Delete Profile</button>
                    <button type="button"
                        onClick={async (event): Promise<void> => {
                            event.stopPropagation();
                            RemoveElement(
                                window.document.querySelector(".admin-profile-deletion-warning-component") as HTMLElement
                            )
                        }}
                    >Cancel</button>
                </article>
            </div>
        </aside>
    </>
}

export default AdminProfileDeletionWarningComponent;