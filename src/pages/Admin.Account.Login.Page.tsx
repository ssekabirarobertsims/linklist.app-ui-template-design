import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/Admin.Account.Login.Page.Stylesheet.css";
import { Link } from "react-router-dom";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import axios from "axios";
import PrimaryAuthenticationObjectContext from "../context/Primary.Authentication.Object.Context";
import PrimaryPageLoaderComponent from "../components/Primary.Page.Loader.Component";
import DisplayElement from "../functions/Display.Element.Function";
import RemoveElement from "../functions/Remove.Element.Function";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";

interface AdminAccountContextProperties {
    username: string;
    avatar: string;
    email: string;
}

const AdminAccountLoginPageElementsComponent: React.FunctionComponent = () => {
    const [password, setPassword] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const PrimaryAuthenticationObject = React.useContext(PrimaryAuthenticationObjectContext) as AdminAccountContextProperties;

    useEffect(() => {
        document.title = "Page - Login | LinkList";
    }, []);

    const handleLogin = async () => {
        const loader = document.querySelector(".primary-spinner-wrapper") as HTMLDivElement;
        DisplayElement(loader);

        try {
            const { data: response } = await axios.post(
                "http://localhost:3000/admin/account/login",
                {
                    username: PrimaryAuthenticationObject?.username || "",
                    password,
                    avatar: PrimaryAuthenticationObject?.avatar || "",
                    email: PrimaryAuthenticationObject?.email || "",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            if (response.status_code === Number(200) as Required<number>) {
                setResponseMessage(response?.message || "Login successful!");
                localStorage.setItem("secondary_authentication", encodeURIComponent(JSON.stringify(response)));
                setTimeout(() => window.location.href = `/dashboard`, Number(2500) as Required<number>);
            } else {
                setResponseMessage(response?.message || "Login failed. Please try again.");
                setTimeout(() => RemoveElement(loader), Number(2000) as Required<number>);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error during login:", error);
            setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
            setTimeout(() => RemoveElement(loader), Number(2000) as Required<number>);
        }
    };

    return (
        <>
            <CookiesSiteMessageComponent />
            <PrimaryPageLoaderComponent />
            <SecondaryNavigationBarComponent />
            <section className="account-login-page-elements-component">
                <form
                    method="post"
                    encType="multipart/form-data"
                    className="account-login-page-form"
                >
                    <div id="_wrapper">
                        <h1>
                            Login as{" "}
                            {PrimaryAuthenticationObject?.username || "Admin Username Undefined"}
                        </h1>
                        <span className="login-response-message-placeholder">{responseMessage}</span>
                        <img
                            src={`/avatars/${PrimaryAuthenticationObject?.avatar || "avatar-2.png"}`}
                            alt="Admin Avatar"
                        />
                        <span>
                            {PrimaryAuthenticationObject?.email || "Admin Email Undefined"}
                        </span>
                        <input
                            type="password"
                            placeholder="Password"
                            aria-placeholder="Password"
                            onInput={(event) => setPassword((event.target as HTMLInputElement).value)}
                            value={password}
                            required
                            aria-required="true"
                        />
                        <button
                            type="button"
                            ref={buttonRef}
                            onClick={(event) => {
                                event.preventDefault();  // prevent event bubbling
                                
                                handleLogin();
                            }}
                        >
                            Login
                        </button>
                    </div>
                </form>
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
                    </Link>{" "}
                    for a new admin account to log into a fresh new admin dashboard to manage, organize and start saving your
                    links in one safe place.
                </p>
            </section>
        </>
    );
};

export default AdminAccountLoginPageElementsComponent;