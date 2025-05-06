import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/Admin.Account.Subscription.Page.Stylesheet..css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import axios from "axios";
import PrimaryAuthenticationObjectContext from "../context/Primary.Authentication.Object.Context";
interface AdminAccountContextProperties {
    username: string;
    avatar: string;
    email: string;
}

const AdminAccountSubscriptionPageElementsComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [responseMessage, setResponseMessage] = useState<string>("" as string);
    const PrimaryAuthenticationObject: AdminAccountContextProperties = React.useContext(PrimaryAuthenticationObjectContext) as AdminAccountContextProperties;

    useEffect(() => {
        document.title = "Page - Subscription | LinkList";
    }, []);
    

    const Subscribe = async (): Promise<void> => {
        try {
            const { data: response } = await axios.post("http://localhost:3500/admin/account/subscription", {
                email: String(PrimaryAuthenticationObject?.email) as string,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            }); 

            if (response.status_code === Number(200) as number) {
                console.log(response);
                window.localStorage.setItem(
                    "secondary_authentication",
                    window.encodeURIComponent(JSON.stringify(response))
                );
                setResponseMessage(response?.message || "Subscription successful!");
                setTimeout(() => {
                    window.location.href = `/dashboard/`;
                }, 1000);
            } else {
                console.error("Subscription failed:", response);
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
            <section className="admin-account-subscription-page-elements-component">
                <form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="admin-account-subscription-page-form"
                >
                    <h1>Subscribe to LinkList</h1>
                    <span className="subscription-response-message-placeholder">{responseMessage}</span>
                    <img src={`${String(`/avatars/${
                        PrimaryAuthenticationObject?.avatar ? PrimaryAuthenticationObject?.avatar : "avatar-2.png"
                        }`).toLocaleLowerCase()}`} alt="Admin Avatar" />
                    <span>{
                            PrimaryAuthenticationObject?.username ? PrimaryAuthenticationObject?.username : "Admin Username Undefined"
                        }</span>
                    <span>{
                            PrimaryAuthenticationObject?.email ? PrimaryAuthenticationObject?.email : "Admin Email Undefined"
                        }</span>
                    <p></p>
                    <button
                        type="button"
                        ref={buttonRef}
                        onClick={(event) => {
                            event.preventDefault();
                            Subscribe();
                        }}
                    >
                        Subscribe
                    </button>
                </form>
                <br />
                <br />
                <p>
                   As you continue to subscribe to linklist as {
                            PrimaryAuthenticationObject?.username ? PrimaryAuthenticationObject?.username : "Admin Username Undefined"
                        }, you will be able to receive an email on  <strong>{
                            PrimaryAuthenticationObject?.email ? PrimaryAuthenticationObject?.email : "Admin Email Undefined"
                        }</strong> to confirm and know that you have been able to subscribe to the monthly newsletter.
                </p>
            </section>
        </>
    );
};

export default AdminAccountSubscriptionPageElementsComponent;