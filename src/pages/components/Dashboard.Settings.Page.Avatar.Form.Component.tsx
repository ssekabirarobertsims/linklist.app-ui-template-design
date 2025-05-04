import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import "../../stylesheets/Dashboard.Settings.Page.Stylesheet.css";

type AvatarProperties = {
    id: string;
    content: string;
    avatar: string;
}

import ChangeAdminAvatarFunction from "../../functions/Change.Admin.Avatar.Function";
import RemoveElement from "../../functions/Remove.Element.Function";
import axios from "axios";
import SecondaryAuthenticationObjectContext from "../../context/Secondary.Authentication.Object.Context";

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

import { format } from "date-fns";
import AdminAccountUpdateNotificationHamburgComponent from "../../components/Admin.Account.Update.Notification.Hamburg.Component";
import DisplayElement from "../../functions/Display.Element.Function";
import PrimaryPageLoaderComponent from "../../components/Primary.Page.Loader.Component";

const DashboardSettingsPageAvatarFormComponent: React.FunctionComponent = () => {
    const [avatars, setAvatars] = useState<AvatarProperties[]>([
        {
            id: v4(),
            content: "avatar 1",
            avatar: "/avatars/avatar-1.png",
        },
        {
            id: v4(),
            content: "avatar 2",
            avatar: "/avatars/avatar-2.png",
        },
        {
            id: v4(),
            content: "avatar 8",
            avatar: "/avatars/avatar-8.png",
        },
        {
            id: v4(),
            content: "avatar 3",
            avatar: "/avatars/avatar-3.png",
        },
        {
            id: v4(),
            content: "avatar 4",
            avatar: "/avatars/avatar-4.png",
        },
        {
            id: v4(),
            content: "avatar 5",
            avatar: "/avatars/avatar-5.png",
        },
        {
            id: v4(),
            content: "avatar 10",
            avatar: "/avatars/avatar-10.png",
        },
        {
            id: v4(),
            content: "avatar 6",
            avatar: "/avatars/avatar-6.png",
        },
        {
            id: v4(),
            content: "avatar 7",
            avatar: "/avatars/avatar-7.png",
        },
        {
            id: v4(),
            content: "avatar 9",
            avatar: "/avatars/avatar-9.png",
        },
    ] as AvatarProperties[]);
    useEffect(() => setAvatars(avatars), [avatars]);
    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);
    const [username, setUsername] = useState<string>(String(`${currentAdmin?.data?.username ? currentAdmin?.data?.username : "Admin username undefined"}`) as string); // by default set current admin username
    const [responseMessage, setResponseMessage] = useState<string>("");

    const updateAdmin = async function (): Promise<void> {
        const loader: HTMLDivElement = (window.document.querySelector(".primary-spinner-wrapper") as HTMLDivElement);
        const placeholder: HTMLImageElement = window.document.querySelector(".admin-form-avatar-placeholder") as HTMLImageElement;
        const responseMessagePlaceholder: HTMLSpanElement = (window.document.querySelector(".span") as HTMLSpanElement);
        window.setTimeout(() => DisplayElement(loader), 0 as number);
        
        try {
         const request = await axios.patch(`http://localhost:3000/admin/account/append/${String(currentAdmin?.data?.id)}`, {
             username,
             avatar: String(placeholder.src).slice(30),
            }, {
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": String(`Bearer ${currentAdmin?.data?.token}`)
            }
        });
        const response = await request.data;
         setResponseMessage(response?.message);
         
         if(request?.status === Number(200)) {
            //  responseMessagePlaceholder.textContent = response?.message ? response?.message : response?.response?.data?.message;
             RemoveElement(window.document.querySelector(".dashboard-settings-page-avatar-form-component") as HTMLElement);
             DisplayElement(window.document.querySelector(".admin-account-update-notification-hamburg-component") as HTMLElement);

             // remove old data from the localstorage
             window.localStorage.removeItem("primary_authentication");
             window.localStorage.removeItem("secondary_authentication");
             
            //  insert in new content to localstorage
            window.setTimeout(() => {
                // update primary authentication object
                window.localStorage.setItem(
                    "primary_authentication",
                    window.encodeURIComponent(
                        JSON.stringify({
                            email: `${currentAdmin?.data?.email}`,
                            username: username,
                            avatar: String(placeholder.src).slice(30),
                        })
                    )
                );

                // update secondary authentication object
                window.localStorage.setItem(
                    "secondary_authentication",
                    window.encodeURIComponent(JSON.stringify({
                        data: {
                            avatar: String(placeholder.src).slice(30),
                            email: currentAdmin?.data?.email as string,
                            id: currentAdmin?.data?.id as string,
                            token: currentAdmin?.data?.token as string,
                            username: username,
                        },
                        date: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
                        message: "Login Successful!",
                        request_id: "a60d8edf-0004-4f61-8898-4b912d9de3d6",
                        status_code: 200
                    }))
                );
             }, Number(1000) as number);

            window.setTimeout(() => RemoveElement(loader), 2000 as number);
            window.setTimeout(() => window.location.reload(), Number(3200) as number);
        } else {
            console.log("error");
            window.setTimeout(() => DisplayElement(loader), 0 as number);
            window.setTimeout(() => RemoveElement(loader), 2000 as number);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
            window.setTimeout(() => DisplayElement(loader), 0 as number);
            window.setTimeout(() => RemoveElement(loader), 2000 as number);
            setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
            responseMessagePlaceholder.textContent = responseMessage;
            console.log(responseMessage);
       }
    }


    return <>
        <AdminAccountUpdateNotificationHamburgComponent />
        <PrimaryPageLoaderComponent />
        <aside className={String("dashboard-settings-page-avatar-form-component").toLocaleLowerCase()}>
            <div>
                <div className="wrapper">
                <span className="span">Choose an avatar</span>
                <img src={`${String(`/avatars/${
                        currentAdmin?.data?.avatar ? currentAdmin?.data?.avatar : "avatar-2.png"
                        }`).toLocaleLowerCase()}`} alt="" id="current-admin-avatar" 
                        className={String("admin-form-avatar-placeholder").toLocaleLowerCase()}
                        />
                        <p></p>
                <ul className={String("dashboard-settings-page-avatar-form-component-ul-list").toLocaleLowerCase()}>
                    {
                        avatars.map((avatar: AvatarProperties) => (
                            <li key={avatar.id}>
                               <img src={String(avatar.avatar)} alt="avatar"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        ChangeAdminAvatarFunction((event.target as HTMLImageElement));
                                    }}
                               />
                            </li>
                        ))
                    }
                </ul>
                <p></p>
                <span>Edit profile username</span>
                    <input type="text" name="username" id="username"
                    placeholder="current admin username"
                    aria-placeholder="current admin username"
                    onInput={(event) => setUsername((event.target as HTMLInputElement).value)}
                    value={username as string}
                />
                <p></p>
                <article>
                    <button type="button"
                    id="save"
                         onClick={(event) => {
                            event.stopPropagation();
                            updateAdmin(); 
                        }}
                    >Save</button>
                    <button type="button" 
                     id="discard"
                        onClick={(event) => {
                            event.stopPropagation();
                            RemoveElement(window.document.querySelector(".dashboard-settings-page-avatar-form-component") as HTMLElement);
                        }}
                    >Discard</button>
                </article>
                </div>
            </div>
        </aside>
    </>
}

export default DashboardSettingsPageAvatarFormComponent;