import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/Admin.Account.UnRegister.Page.Stylesheet.css";
import { Link } from "react-router-dom";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import axios from "axios";
import PrimaryAuthenticationObjectContext from "../context/Primary.Authentication.Object.Context";
interface AdminAccountContextProperties {
    username: string;
    avatar: string;
    email: string; 
}

import PrimaryPageLoaderComponent from "../components/Primary.Page.Loader.Component";
import DisplayElement from "../functions/Display.Element.Function";
import RemoveElement from "../functions/Remove.Element.Function";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";
import { MdSecurity } from "react-icons/md";

const AdminAccountUnRegisterPageElementsComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [responseMessage, setResponseMessage] = useState<string>("" as Required<Readonly<string>>);
    const PrimaryAuthenticationObject: AdminAccountContextProperties = React.useContext(PrimaryAuthenticationObjectContext) as AdminAccountContextProperties;

    useEffect(() => {
        document.title = "Page - Login | LinkList";
    }, []);
    

    class login {
        private static loader: HTMLDivElement = (window.document.querySelector(".primary-spinner-wrapper") as HTMLDivElement);
        
        constructor() {
            (async function(): Promise<void>  {
                try {
                    const { data: response } = await axios.post("http://localhost:3000/admin/account/login", {
                        username: String(PrimaryAuthenticationObject?.username) as Required<Readonly<string>>,
                        avatar: String(PrimaryAuthenticationObject?.avatar) as Required<Readonly<string>>,
                        email: String(PrimaryAuthenticationObject?.email) as Required<Readonly<string>>,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        } 
                    }); 
        
                    DisplayElement(login.loader);
        
                    if (response.status_code === Number(200) as Required<Readonly<number>>) {
                        // remove loader
                        window.setTimeout(() => RemoveElement(login.loader), 2000 as Required<Readonly<number>>);
        
                        // store last forward auth content to localstorage
                        window.localStorage.setItem(
                            "secondary_authentication",
                            window.encodeURIComponent(JSON.stringify(response))
                        );
                        setResponseMessage(response?.message || "Login successful!");
                        setTimeout(() => window.location.href = `/dashboard`, 2500 as Required<Readonly<number>>);
                    } else {
                        window.setTimeout(() => RemoveElement(login.loader), 2000 as Required<Readonly<number>>);
                        console.error("Login failed:", response);
                        setResponseMessage(response?.message || "Login failed. Please try again.");
                    }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.error("Error during login:", error);
                    window.setTimeout(() => RemoveElement(login.loader), 2000 as Required<Readonly<number>>);
                    setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
                }
            }());
        }
    }

    return (
        <>
            <CookiesSiteMessageComponent />
            <PrimaryPageLoaderComponent />
            <SecondaryNavigationBarComponent />
            <section className="account-un-register-page-elements-component">
                <form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="account-un-register-page-form"
                >
                    <h1>
                       <MdSecurity />
                    </h1>
                    <h2>Forgot admin account login password!</h2>
                    {/* <span className="un-register-response-message-placeholder">{responseMessage}</span> */}
                   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quidem impedit et ipsum, nemo necessitatibus laudantium facilis fuga sapiente, excepturi dolorem suscipit, nostrum quaerat exercitationem. Placeat culpa tempora, quo beatae explicabo velit esse similique dolor voluptatibus ab incidunt, ullam quae.</p>
                    <button
                    disabled={Boolean(false) as Required<boolean>}
                    ref={buttonRef}
                        type="button"
                        onClick={(event) => {
                            event.preventDefault();
                            DisplayElement((window.document.querySelector(".primary-spinner-wrapper") as HTMLDivElement));
                            new login();
                        }}
                    >
                        Unregister Account
                    </button>
                </form>
                <br />
                <br />
                <p>
                    Remembered your admin account login password?{" "}
                    <Link
                        to={{
                            pathname: "/admin/account/login",
                            search: "query=signup&form=password&username&email",
                        }}
                    >
                        Login
                    </Link> to your admin account in order to continue to a fresh new dashboard to continue saving your links in only one safest place anywhere.
                </p>
            </section>
        </>
    );
};

export default AdminAccountUnRegisterPageElementsComponent;