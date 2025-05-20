import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/Admin.Account.Subscription.Page.Stylesheet..css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import axios from "axios";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";

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

const AdminAccountSubscriptionPageElementsComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;

    useEffect(() => {
        document.title = "Page - Subscription | LinkList";
    }, []);

    const handleSubscribe = async () => {
        try {
            const { data: response } = await axios.post(
                "http://localhost:3000/admin/account/subscription",
                {
                    email: currentAdmin?.data?.email || "",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${currentAdmin?.data?.token || ""}`,
                    },
                }
            );

            if (response.status_code === 200) {
                setResponseMessage(response?.message || "Subscription successful!");
                localStorage.removeItem("secondary_authentication");

                setTimeout(() => {
                    localStorage.setItem(
                        "secondary_authentication",
                        encodeURIComponent(JSON.stringify(response))
                    );
                    window.location.href = `/dashboard/`;
                }, 1000);
            } else {
                setResponseMessage(response?.message || "Subscription failed. Please try again.");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error during subscription:", error);
            setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
        }
    };

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
                        <h1>
                            Subscribe to LinkList as{" "}
                            {currentAdmin?.data?.username || "Admin Username Undefined"}
                        </h1>
                        <span className="subscription-response-message-placeholder">
                            {responseMessage}
                        </span>
                        <img
                            src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
                            alt="Admin Avatar"
                        />
                        <span>{currentAdmin?.data?.email || "Admin Email Undefined"}</span>
                        {currentAdmin?.data?.subscribed === "true" ? (
                            <p>
                                Currently, you are already subscribed to LinkList's monthly newsletter as{" "}
                                {currentAdmin?.data?.username || "Admin Username Undefined"} with email{" "}
                                {currentAdmin?.data?.email || "Admin Email Undefined"}. No need to resubscribe.
                            </p>
                        ) : (
                            <button
                                type="button"
                                ref={buttonRef}
                                onClick={(event) => {
                                    event.preventDefault();  // prevent event bubbling
                                    handleSubscribe();
                                }}
                            >
                                Subscribe
                            </button>
                        )}
                    </div>
                </form>
                <br />
                <p>
                    By subscribing to LinkList as{" "}
                    {currentAdmin?.data?.username || "Admin Username Undefined"}, you will receive
                    an email at <strong>{currentAdmin?.data?.email || "Admin Email Undefined"}</strong> to confirm your subscription to the monthly newsletter.
                </p>
            </section>
        </>
    );
};

export default AdminAccountSubscriptionPageElementsComponent;