import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/Admin.Account.Signup.Page.Stylesheet.css";
import { Link } from "react-router-dom";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import axios from "axios";
import DisplayElement from "../functions/Display.Element.Function";
import RemoveElement from "../functions/Remove.Element.Function";
import PrimaryPageLoaderComponent from "../components/Primary.Page.Loader.Component";

const AdminAccountSignupPageElementsComponent: React.FunctionComponent = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string | number>("");
    const [avatar, setAvatar] = useState<string | number>("avatar-1.png");
    const buttonRef = useRef<HTMLButtonElement>(null);

    const Signup = async (): Promise<void> => {
        const placeholder: HTMLSpanElement = document.querySelector<HTMLSpanElement>(".signup-response-message-placeholder") as HTMLSpanElement;
        setAvatar("avatar-1.png"); // by default
        const loader: HTMLDivElement = (window.document.querySelector(".primary-spinner-wrapper") as HTMLDivElement);
        DisplayElement(loader);

        try {
            const response = await axios.post("http://localhost:3000/admin/account/signup", {
               username: `${firstName} ${lastName}`,
                email,
                password,
                avatar,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": ""
                }
            });

            if (response?.data?.status_code === 201) {
                if (placeholder) placeholder.textContent = response.data.message;

                // Save authentication data to localStorage
                window.localStorage.setItem(
                    "primary_authentication",
                    window.encodeURIComponent(
                        JSON.stringify({
                            email,
                            username: `${firstName} ${lastName}`,
                            avatar,
                        })
                    )
                );
                
                // Redirect to login page after a short delay
                window.setTimeout(() => RemoveElement(loader), 2500 as number);
                setTimeout(() => window.location.href = "/admin/account/verification", 3000);
                
            } else {
                window.setTimeout(() => RemoveElement(loader), 2500 as number);
                console.error("Signup failed:", response.data);
                if (placeholder) placeholder.textContent = response.data.message;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            window.setTimeout(() => RemoveElement(loader), 2500 as number);
            console.error("Error during signup:", error);
            if (placeholder) placeholder.textContent = error?.response?.data?.message || "An error occurred.";
        }
    };

    useEffect(() => {
            document.title = "Page - Signup | LinkList";
    }, []);

    return (
        <>
            <CookiesSiteMessageComponent />
            <PrimaryPageLoaderComponent />
            <section className="account-signup-page-elements-component">
                <form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="account-signup-page-form"
                >
                    <h1>Signup for LinkList</h1>
                    <span className="signup-response-message-placeholder"></span>
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
                            Signup();
                        }}
                    >
                        Signup
                    </button>
                </form>
                <br />
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
                    </Link> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eos adipisci voluptates! Odio, tempora dolorum.
                </p>
            </section>
        </>
    );
};

export default AdminAccountSignupPageElementsComponent;