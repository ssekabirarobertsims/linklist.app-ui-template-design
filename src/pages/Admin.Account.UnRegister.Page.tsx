import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/Admin.Account.UnRegister.Page.Stylesheet.css";
import { Link } from "react-router-dom";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import axios from "axios";
import PrimaryAuthenticationObjectContext from "../context/Primary.Authentication.Object.Context";
import PrimaryPageLoaderComponent from "../components/Primary.Page.Loader.Component";
import DisplayElement from "../functions/Display.Element.Function";
import RemoveElement from "../functions/Remove.Element.Function";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";
import { MdSecurity } from "react-icons/md";

interface AdminAccountContextProperties {
    username: string;
    avatar: string;
    email: string;
}

const AdminAccountUnRegisterPageElementsComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const PrimaryAuthenticationObject = React.useContext(PrimaryAuthenticationObjectContext) as AdminAccountContextProperties;

    useEffect(() => {
        document.title = "Page - Unregister | LinkList";
    }, []);

    const handleUnregister = async () => {
        const loader = document.querySelector(".primary-spinner-wrapper") as HTMLDivElement;
        DisplayElement(loader);

        try {
            const { data: response } = await axios.post(
                "http://localhost:3000/admin/account/login",
                {
                    username: PrimaryAuthenticationObject?.username || "",
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

            if (response.status_code === 200) {
                setResponseMessage(response?.message || "Login successful!");
                localStorage.setItem(
                    "secondary_authentication",
                    encodeURIComponent(JSON.stringify(response))
                );

                setTimeout(() => {
                    RemoveElement(loader);
                    window.location.href = `/dashboard`;
                }, 2500);
            } else {
                setResponseMessage(response?.message || "Login failed. Please try again.");
                setTimeout(() => RemoveElement(loader), 2000);
            }
        } catch (error: any) {
            console.error("Error during login:", error);
            setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
            setTimeout(() => RemoveElement(loader), 2000);
        }
    };

    return (
        <>
            <CookiesSiteMessageComponent />
            <PrimaryPageLoaderComponent />
            <SecondaryNavigationBarComponent />
            <section className="account-un-register-page-elements-component">
                <form
                    method="post"
                    encType="multipart/form-data"
                    className="account-un-register-page-form"
                >
                    <h1>
                        <MdSecurity />
                    </h1>
                    <h2>Forgot admin account login password!</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quidem impedit et ipsum, nemo necessitatibus laudantium facilis fuga sapiente, excepturi dolorem suscipit, nostrum quaerat exercitationem. Placeat culpa tempora, quo beatae explicabo velit esse similique dolor voluptatibus ab incidunt, ullam quae.
                    </p>
                    <button
                        type="button"
                        ref={buttonRef}
                        onClick={(event) => {
                            event.preventDefault();
                            handleUnregister();
                        }}
                    >
                        Unregister Account
                    </button>
                </form>
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
                    </Link>{" "}
                    to your admin account in order to continue to a fresh new dashboard to continue saving your links in only one safest place anywhere.
                </p>
            </section>
        </>
    );
};

export default AdminAccountUnRegisterPageElementsComponent;