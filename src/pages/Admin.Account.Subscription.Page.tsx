import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/Admin.Account.Subscription.Page.Stylesheet..css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import axios from "axios";

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

import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";

const AdminAccountSubscriptionPageElementsComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [responseMessage, setResponseMessage] = useState<string>("" as Required<Readonly<string>>);
    const currentAdmin: (SecondaryAuthenticationProps) = React.useContext(SecondaryAuthenticationObjectContext) as (SecondaryAuthenticationProps);

    useEffect(() => {
        document.title = "Page - Subscription | LinkList";
    }, []);
    
    class subscribe {
        constructor() {
            (async function(): Promise<void> {
                try {
                    const { data: response } = await axios.post("http://localhost:3000/admin/account/subscription", {
                        email: String(currentAdmin?.data?.email) as Required<Readonly<string>>,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": String(`Bearer ${currentAdmin?.data?.token}` as Partial<Pick<SecondaryAuthenticationProps, "message">>)
                        }
                    }); 

                    console.log(response);
        
                    if (response.status_code === Number(200) as Required<Readonly<number>>) {
                        console.log(response);
                        window.localStorage.removeItem("secondary_authentication");

                        setResponseMessage(response?.message || "Subscription successful!");
                        setTimeout(() => window.localStorage.setItem(
                                "secondary_authentication",
                                window.encodeURIComponent(JSON.stringify(response))
                            ), 900 as Required<Readonly<number>>);
                            
                        setTimeout(() =>  window.location.href = `/dashboard/`, 1000 as Required<Readonly<number>>);
                    } else {
                        console.error("Subscription failed:", response);
                        setResponseMessage(response?.message || "Subscription failed. Please try again.");
                    }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.error("Error during subscription:", error);
                    setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
                }
            }());
        }
    }

    return (
        <>
            <CookiesSiteMessageComponent />
            <SecondaryNavigationBarComponent />
            <section className="admin-account-subscription-page-elements-component">
                <form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="admin-account-subscription-page-form"
                >
                    <div id="_wrapper">
                    <h1>Subscribe to LinkList as {
                            currentAdmin?.data?.username ? currentAdmin?.data?.username : "Admin Username Undefined"
                        }</h1>
                    <span className="subscription-response-message-placeholder">{responseMessage}</span>
                    <img src={`${String(`/avatars/${
                        currentAdmin?.data?.avatar ? currentAdmin?.data?.avatar : "avatar-2.png"
                        }`).toLocaleLowerCase()}`} alt="Admin Avatar" />
                    <span>{
                            currentAdmin?.data?.email ? currentAdmin?.data?.email : "Admin Email Undefined"
                        }</span>
                    <p></p>
                   {
                    (currentAdmin?.data?.subscribed !== String(Boolean(true))) ? <p>
                        Currently you are already subscribed to linklist monthly newsletter as {
                            currentAdmin?.data?.username ? currentAdmin?.data?.username : "Admin Username Undefined"
                        } with email {
                            currentAdmin?.data?.email ? currentAdmin?.data?.email : "Admin Email Undefined"
                        } and for this no need to resubscribe again.
                    </p> :  (
                        <>
                            <p></p>
                            <p></p>
                            <p></p>
                        <button
                    type="button"
                    disabled={Boolean(false) as Required<boolean>}
                    ref={buttonRef}
                    onClick={(event) => {
                        event.preventDefault();
                        new subscribe();
                    }}
                >
                    Subscribe
                </button>
                        </>
                )
                   }
                    </div>
                </form>
                <br />
                <br />
                <p>
                   As you continue to subscribe to linklist as {
                            currentAdmin?.data?.username ? currentAdmin?.data?.username : "Admin Username Undefined"
                        }, you will be able to receive an email on  <strong>{
                            currentAdmin?.data?.email ? currentAdmin?.data?.email : "Admin Email Undefined"
                        }</strong> to confirm and know that you have been able to subscribe to the monthly newsletter.
                </p>
            </section>
        </>
    );
};

export default AdminAccountSubscriptionPageElementsComponent;