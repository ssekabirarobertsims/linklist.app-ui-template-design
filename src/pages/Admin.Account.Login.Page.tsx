import React, { useRef, useState, useEffect } from "react";
import LandingHomePageNavigationBarComponent from "./components/Landing.Home.Page.Navigation.Bar.Component";
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

const AdminAccountLoginPageElementsComponent: React.FunctionComponent = () => {
    const [password, setPassword] = useState<string>("" as string);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [responseMessage, setResponseMessage] = useState<string>("" as string);
    const PrimaryAuthenticationObject: AdminAccountContextProperties = React.useContext(PrimaryAuthenticationObjectContext) as AdminAccountContextProperties;

    useEffect(() => {
        document.title = "Page - Login | LinkList";
    }, []);
    

    const Login = async (): Promise<void> => {
        try {
            const { data: response } = await axios.post("http://localhost:3000/admin/account/login", {
                username: String(PrimaryAuthenticationObject?.username) as string,
                password: password,
                avatar: String(PrimaryAuthenticationObject?.avatar) as string,
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
                setResponseMessage(response?.message || "Login successful!");
                setTimeout(() => {
                    window.location.href = `/dashboard/saved/links`;
                }, 1000);
            } else {
                console.error("Login failed:", response);
                setResponseMessage(response?.message || "Login failed. Please try again.");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error during login:", error);
            setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <>
            <LandingHomePageNavigationBarComponent />
            <CookiesSiteMessageComponent />
            <section className="account-login-page-elements-component">
                <form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="account-login-page-form"
                >
                    <h1>Log into LinkList</h1>
                    <span className="login-response-message-placeholder">{responseMessage}</span>
                    <img src={`${String(`/avatars/${
                        PrimaryAuthenticationObject?.avatar ? PrimaryAuthenticationObject?.avatar : "avatar-2.png"
                        }`).toLocaleLowerCase()}`} alt="Admin Avatar" />
                    <span>{
                            PrimaryAuthenticationObject?.username ? PrimaryAuthenticationObject?.username : "Admin Username Undefined"
                        }</span>
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
                            event.preventDefault();
                            Login();
                        }}
                    >
                        Login
                    </button>
                </form>
                <br />
                <br />
                <p>
                    Have no account?{" "}
                    <Link
                        to={{
                            pathname: "/admin/account/signup",
                            search: "query=signup&form=password&username&email",
                            hash: "#hash",
                        }}
                    >
                        Signup
                    </Link> Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus beatae eius assumenda, hic nesciunt quo?
                </p>
            </section>
        </>
    );
};

export default AdminAccountLoginPageElementsComponent;