import React, { useRef, useEffect } from "react";
import "../stylesheets/Admin.Account.Subscription.Page.Stylesheet..css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";
import { Link } from "react-router-dom";
import { BiLink } from "react-icons/bi";

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

import { MdVerified } from "react-icons/md";

const AdminAccountSubscriptionStatusPageElementsComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;
    const isVerified = currentAdmin?.data?.verified === "true" ? "verified" : "unverified";

    useEffect(() => {
        document.title = "Page - Subscription | LinkList";
    }, []);

    return (
        <>
            <CookiesSiteMessageComponent /> 
            <SecondaryNavigationBarComponent />
            <section className="admin-account-subscription-page-elements-component">
                <form
                    method="post"
                    encType="multipart/form-data"
                    className="admin-account-subscription-page-form"
                >
                    <div id="_wrapper">
                        <strong><MdVerified />{isVerified} admin account</strong>
                        <h1>
                            Subscribed to LinkList free plan
                        </h1>
                        <img
                            src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
                            alt="Admin Avatar"
                        />
                        <span>{currentAdmin?.data?.username || "Admin Username Undefined"}</span>
                        <span>{currentAdmin?.data?.email || "Admin email undefined"}</span>
                        <p></p>
                        <Link to={{
                            pathname: `/${String(
        currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}/account/subscription/plans`,
        search: `admin=${String(
        currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}`
                        }}><button
                                type="button" 
                                ref={buttonRef}
                                onClick={(event) => {
                                    event.preventDefault();  // prevent event bubbling
                                }}
                            >
                                Upgrade plan
                            </button></Link>
                        
                    </div>
                </form>
                <br />
                <p>
                    By subscribing to LinkList as{" "}
                    {currentAdmin?.data?.username || "Admin Username Undefined"}, you will receive
                    an email at <strong>{currentAdmin?.data?.email || "Admin Email Undefined"}</strong> to confirm your subscription to the monthly newsletter though this feature has not been properly established for production purpose but soon it will be updated and soon you will start to receive the monthly newsletter from  <Link to={{
                    pathname: "/"
                }}><BiLink />Linklist</Link> to you on a monthly basis.
                </p>
            </section>
        </>
    );
};

export default AdminAccountSubscriptionStatusPageElementsComponent;