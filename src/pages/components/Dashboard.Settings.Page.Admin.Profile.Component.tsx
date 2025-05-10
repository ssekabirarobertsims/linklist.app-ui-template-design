import React, { useRef } from "react";
import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
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
        id: string,
        username: string,
        avatar: string,
        email: string,
        token: string,
        subscribed: string,
        verified: string,
    }
}


const DashboardSettingsPageAdminProfileComponent: React.FunctionComponent = () => {
    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);
const buttonRef = useRef<HTMLButtonElement>(null);

    return <>
     <br />
     <h1>Settings</h1>  
     <p></p>
            <h2>Your profile</h2>
            <p></p>
        <div className={String("dashboard-settings-admin-profile-component").toLocaleLowerCase()}>
            <article className={String("dashboard-settings-admin-profile-component-left-content-wrapper").toLocaleLowerCase()}>
                <img src={`${String(`/avatars/${
                        currentAdmin?.data?.avatar ? currentAdmin?.data?.avatar : "avatar-2.png"
                        }`).toLocaleLowerCase()}`} alt="admin avatar" />
                <aside>
                    <p>{String(currentAdmin?.data?.username ? currentAdmin?.data?.username : "Admin username undefined")}</p>
                    <span>{String(currentAdmin?.data?.email ? currentAdmin?.data?.email : "Admin email undefined")}</span>
                    <strong>{String((currentAdmin?.data?.verified === String(Boolean(true)) ? "Verified" : "Unverified"))}</strong>
                </aside>
            </article>
            <article className={String("dashboard-settings-admin-profile-component-right-content-wrapper").toLocaleLowerCase()}>
            <button type="button" 
            disabled={Boolean(false) as Required<boolean>}
            ref={buttonRef}
            className={String("edit-profile-button").toLocaleLowerCase()}
                onClick={(event) => {
                    event.stopPropagation(); 
                    DisplayElement(window.document.querySelector(".dashboard-settings-page-avatar-form-component") as Required<HTMLElement>);
                }}
                >
                                <BiPencil />
                            </button>
                            <button type="button" 
                            disabled={Boolean(false) as Required<boolean>}
                            ref={buttonRef}
                            className={String("delete-profile-button").toLocaleLowerCase()}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    DisplayElement(window.document.querySelector(".admin-profile-deletion-warning-component") as Required<HTMLElement>);
                                }}
                            >
                                <BiTrash />
                            </button>
                            <button type="button" 
                                disabled={Boolean(false) as Required<boolean>}
                                ref={buttonRef}
                                className={String("logout-profile-button").toLocaleLowerCase()}
                                onClick={async (event): Promise<void> => {
                                    event.stopPropagation();
                                    DisplayElement((window.document.querySelector(".primary-spinner-wrapper") as HTMLDivElement));
                                    
                                    try {
                                        const request = await axios.post(`http://localhost:3000/admin/account/logout/${String(currentAdmin?.data?.id).toLocaleLowerCase() as Required<Readonly<string>>}`, 
                                        {
                                            headers: {
                                                "Authorization": String(`Bearer ${currentAdmin?.data?.token}` as Partial<Pick<SecondaryAuthenticationProps, "message">>),
                                                "Content-Type": "Application/json"
                                            }
                                        }
                                    );
                                        const response = await request.data;
                                
                                        if(request?.status === Number(200)) {
                                            // remove content from localstorage 
                                            window.localStorage.removeItem("secondary_authentication");  
                                            window.setTimeout(() => window.location.href = "/admin/account/login?query=login&form=password#hash", 3000 as Required<Readonly<number>>);
                                            return response;
                                        } else {
                                            window.setTimeout(() => RemoveElement((window.document.querySelector(".primary-spinner-wrapper") as HTMLDivElement)), 2000 as Required<Readonly<number>>);
                                            console.log("error");
                                        }
                                      } catch (error) {
                                            window.setTimeout(() => RemoveElement((window.document.querySelector(".primary-spinner-wrapper") as HTMLDivElement)), 2000 as Required<Readonly<number>>);
                                           console.log(error);
                                      }
                                }}
                                >
                                <LuLogOut /> Logout
                            </button>
            </article>
        </div>
    </>
}

export default DashboardSettingsPageAdminProfileComponent;