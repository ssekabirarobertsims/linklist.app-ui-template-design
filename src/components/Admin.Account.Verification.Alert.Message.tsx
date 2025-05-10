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

import { MdSecurity } from "react-icons/md";

const AdminAccountVerificationAlertMessageComponent: React.FunctionComponent = () => {
    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);

    return currentAdmin?.data?.verified === String(Boolean(true)) ? "" : <>
        <article className={String("admin-account-verification-alert-message").toLocaleLowerCase()} 
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            <div>
                <div id="_wrapper">
                    <span>
                    <MdSecurity /> 
                    </span>
                <h3>Admin account verification</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus eaque eos, eius recusandae vitae iusto harum vero ut, possimus nulla, quos minus!</p>
                <Link to={{
                    pathname: "/admin/account/verification"
                }}>
                    <button type="button">Verify Account</button>
                </Link>
                </div>
            </div>
        </article>
    </>
}

export default AdminAccountVerificationAlertMessageComponent;