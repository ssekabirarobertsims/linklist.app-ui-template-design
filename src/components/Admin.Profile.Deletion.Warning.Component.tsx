import React from "react";
import RemoveElement from "../functions/Remove.Element.Function";

import axios from "axios";
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

const AdminProfileDeletionWarningComponent: React.FunctionComponent = () => {
    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);
     
    return <>
        <aside className={String("admin-profile-deletion-warning-component").toLocaleLowerCase()}>
            <div>
                <h2>Delete this profile?</h2>
                <p>This will permanently delete saved links, username, emails or profile from this device. However, any data that was previously synced to your profile will remain associated with your email account.</p>
                <article>
                    <button type="button" onClick={async (event) => {
                        event.stopPropagation();
 
                         try {
                            const request = await axios.delete(`http://localhost:3000/admin/account/unlink/${String(currentAdmin?.data?.id)}`);
                            const response = await request.data;
                    
                            if(request?.status === Number(200) as number) {
                                console.log(response);
                                window.localStorage.removeItem("primary_authentication");
                                window.localStorage.removeItem("secondary_authentication");
                                window.setTimeout(() => window.location.href = "/", 1000 as number);
                            } else {
                                console.log("error");
                            }
                          } catch (error) {
                               console.log(error);
                          }

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