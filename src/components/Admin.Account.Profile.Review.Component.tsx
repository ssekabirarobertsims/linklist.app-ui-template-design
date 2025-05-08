import React from "react";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import { Link } from "react-router-dom";

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

import { CiSettings } from "react-icons/ci";
// import { LuLogOut } from "react-icons/lu";

const AdminAccountProfileReviewComponent: React.FunctionComponent = () => {
    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);
    console.log(currentAdmin);

    return <>
        <article className={String("admin-account-profile-review-side-bar").toLocaleLowerCase()} 
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            <div id="_wrapper">
                <aside>
                <Link to={{
                    pathname: `/dashboard/settings`,
                    search: `admin=${String(currentAdmin?.data?.username ? currentAdmin?.data?.username : "admin").toLocaleLowerCase().replace(" ", "")}`
                }}  className={String("admin-account-profile-review-side-bar-settings-page").toLocaleLowerCase()}>
                    <CiSettings />
                </Link>
                <img src={`${String(`/avatars/${
                        currentAdmin?.data?.avatar ? currentAdmin?.data?.avatar : "avatar-2.png"
                        }`).toLocaleLowerCase()}`} alt="admin avatar" />
                <div>
                    <p>{String(currentAdmin?.data?.username ? currentAdmin?.data?.username : "Admin username undefined")}</p>
                    <span>{String(currentAdmin?.data?.email ? currentAdmin?.data?.email : "Admin email undefined")}</span>
                    <strong>{String((currentAdmin?.data?.verified === String(Boolean(true)) ? "Verified" : "Unverified"))}</strong>
                </div>
                </aside>
                {/* <button type="button" className={String("admin-account-profile-review-side-bar-settings-page").toLocaleLowerCase()}><LuLogOut /> Logout</button> */}
            </div>
        </article>
    </>
}

export default AdminAccountProfileReviewComponent;