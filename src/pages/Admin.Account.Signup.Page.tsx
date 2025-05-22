import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/Admin.Account.Signup.Page.Stylesheet.css";
import { Link } from "react-router-dom";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import axios from "axios";
import displayElement from "../functions/Display.Element.Function";
import removeElement from "../functions/Remove.Element.Function";
import PrimaryPageLoaderComponent from "../components/Primary.Page.Loader.Component";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";

const AdminAccountSignupPageElementsComponent: React.FunctionComponent = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSignup = async () => {
        const loader = document.querySelector(".primary-spinner-wrapper") as HTMLDivElement;
        const placeholder = document.querySelector(".signup-response-message-placeholder") as HTMLSpanElement;

        displayElement(loader);

        try {
            const response = await axios.post(
                "http://localhost:3000/admin/account/signup",
                {
                    username: `${firstName} ${lastName}`,
                    email,
                    password,
                    avatar: "avatar-1.png", // Default avatar
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            if (response?.data?.status_code === 201) {
                setResponseMessage(response.data.message || "Signup successful!");
                placeholder.textContent = response.data.message;

                // Save authentication data to localStorage
                localStorage.setItem(
                    "primary_authentication",
                    encodeURIComponent(
                        JSON.stringify({
                            email,
                            username: `${firstName} ${lastName}`,
                            avatar: "avatar-1.png",
                        })
                    )
                );

                // Redirect to verification page
                setTimeout(() => {
                    removeElement(loader);
                    window.location.href = "/admin/account/verification";
                }, 3000);
            } else {
                setResponseMessage(response.data.message || "Signup failed. Please try again.");
                placeholder.textContent = response.data.message;
                setTimeout(() => removeElement(loader), 2500);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error during signup:", error);
            setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
            placeholder.textContent = error?.response?.data?.message || "An error occurred.";
            setTimeout(() => removeElement(loader), 2500);
        }
    };

    useEffect(() => {
        document.title = "Page - Signup | LinkList";
    }, []);

    return (
        <>
            <CookiesSiteMessageComponent />
            <SecondaryNavigationBarComponent />
            <PrimaryPageLoaderComponent />
            <section className="account-signup-page-elements-component">
                <form
                    method="post"
                    encType="multipart/form-data"
                    className="account-signup-page-form"
                >
                    <h1>Signup to LinkList</h1>
                    <span className="signup-response-message-placeholder">{responseMessage}</span>
                    <article>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            aria-placeholder="First Name"
                            onInput={(event) => setFirstName((event.target as HTMLInputElement).value)}
                            value={firstName}
                            required
                            aria-required="true"
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            aria-placeholder="Last Name"
                            onInput={(event) => setLastName((event.target as HTMLInputElement).value)}
                            value={lastName}
                            required
                            aria-required="true"
                        />
                    </article>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        aria-placeholder="Email"
                        onInput={(event) => setEmail((event.target as HTMLInputElement).value)}
                        value={email}
                        required
                        aria-required="true"
                    />
                    <input
                        type="password"
                        name="password"
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
                            event.preventDefault();
                            handleSignup();
                        }}
                    >
                        Signup
                    </button>
                </form>
                <br />
                <p>
                    Already have an account?{" "}
                    <Link
                        to={{
                            pathname: "/admin/account/login",
                            search: "query=login&form=password",
                            hash: "#hash",
                        }}
                    >
                        Login
                    </Link>{" "}
                    to access your dashboard and start saving your links.
                </p>
            </section>
        </>
    );
};

export default AdminAccountSignupPageElementsComponent;