import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/Admin.Account.Login.Page.Stylesheet.css";
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

const AdminAccountLoginPageElementsComponent: React.FunctionComponent = () => {
    const [password, setPassword] = useState<string>("" as Required<Readonly<string>>);
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
                        password: password,
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
            <section className="account-login-page-elements-component">
                <form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="account-login-page-form"
                >
                    <div id="_wrapper">
                    <h1>Login as {
                        PrimaryAuthenticationObject?.username ? PrimaryAuthenticationObject?.username : "Admin Username Undefined"
                    }</h1>
                    <span className="login-response-message-placeholder">{responseMessage}</span>
                    <p></p>
                    <img src={`${String(`/avatars/${
                        PrimaryAuthenticationObject?.avatar ? PrimaryAuthenticationObject?.avatar : "avatar-2.png"
                        }`).toLocaleLowerCase()}`} alt="Admin Avatar" />
                    <span>{
                        PrimaryAuthenticationObject?.email ? PrimaryAuthenticationObject?.email : "Admin Email Undefined"
                    }</span>
                    <input
                        type="password"
                        placeholder="Password"
                        aria-placeholder="Password"
                        onInput={(event) => setPassword((event.target as Required<HTMLInputElement>).value)}
                        value={password}
                        required
                        aria-required="true"
                    />
                    <Link to={{
                        pathname: "/admin/account/un-register"
                    }}>
                        Forgot password?
                    </Link>
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
                        Login
                    </button>
                    </div>
                </form>
                <br />
                <br />
                <p>
                    Have no admin account?{" "}
                    <Link
                        to={{
                            pathname: "/admin/account/signup",
                            search: "query=signup&form=password&username&email",
                        }}
                    >
                        Signup
                    </Link> for a new admin account in order to log into a fresh new dashboard to start saving your links in only one safest place anywhere.
                </p>
            </section>
        </>
    );
};

export default AdminAccountLoginPageElementsComponent;