import React, { useRef, useState, useEffect, useContext } from "react";
import "../stylesheets/Admin.Account.Verification.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import axios from "axios";

interface PrimaryAuthenticationObjectProps {
    username: string;
    avatar: string;
    email: string;
  }

import PrimaryAuthenticationObjectContext from "../context/Primary.Authentication.Object.Context";
import { Link } from "react-router-dom";
import RemoveElement from "../functions/Remove.Element.Function";
import DisplayElement from "../functions/Display.Element.Function";
import PrimaryPageLoaderComponent from "../components/Primary.Page.Loader.Component";

const AdminAccountVerificationPageElementsComponent: React.FunctionComponent = () => {
    const PrimaryAuthenticationObject: PrimaryAuthenticationObjectProps = useContext(PrimaryAuthenticationObjectContext) as PrimaryAuthenticationObjectProps;
    const [codeDigit1, setCodeDigit1] = useState<(string | number)>("");
    const [codeDigit2, setCodeDigit2] = useState<(string | number)>("");
    const [codeDigit3, setCodeDigit3] = useState<(string | number)>("");
    const [codeDigit4, setCodeDigit4] = useState<(string | number)>("");

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [responseMessage, setResponseMessage] = useState<string>("");

    class verify {
        private static loader: HTMLDivElement = (window.document.querySelector(".primary-spinner-wrapper") as HTMLDivElement);
        
        constructor() {
            (async function(): Promise<void> {
                window.setTimeout(() => DisplayElement((verify.loader)), 0 as number);

        try {
            const { data: response } = await axios.post("http://localhost:3000/admin/account/verification", {
                email: String(`${PrimaryAuthenticationObject?.email}`),
                code: `${codeDigit1 as (number | string)}${codeDigit2 as (number | string)}${codeDigit3 as (number | string)}${codeDigit4 as (number | string)}`, // by default from admin
            });

            if (response.status_code === 200) {
                console.log(response);
                setResponseMessage(response?.message || "Admin Account Verified!");
                window.setTimeout(() => RemoveElement((verify.loader)), 2000 as number);
                setTimeout(() => {
                    window.location.href = `/admin/account/login`;
                }, 2200);
            } else {
                console.error("Verification failed:", response);
                window.setTimeout(() => RemoveElement((verify.loader)), 2000 as number);
                setResponseMessage(response?.message || "Verification failed. Please try again.");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            window.setTimeout(() => RemoveElement((verify.loader)), 2000 as number);
            console.error("Error during verification:", error);
            setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
        }
            }());
        }
    }


    useEffect(() => {
            document.title = "Page - Verification | LinkList";
        }, []);


    return (
        <>
            <CookiesSiteMessageComponent />
            <PrimaryPageLoaderComponent />
            <section className="admin-account-verification-page-elements-component">
                <form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="admin-account-verification-page-form"
                >
                    <h1>Verify Account</h1>
                    <span className="verification-response-message-placeholder">{responseMessage}</span>
                    <div>
                    <input
                        type="text"
                        placeholder="text"
                        aria-placeholder="text"
                        onInput={(event) => setCodeDigit1((event.target as HTMLInputElement).value)}
                        value={codeDigit1}
                        required
                        aria-required="true"
                        maxLength={1 as number}
                    />
                    <input
                        type="text"
                        placeholder="text"
                        aria-placeholder="text"
                        onInput={(event) => setCodeDigit2((event.target as HTMLInputElement).value)}
                        value={codeDigit2}
                        required
                        aria-required="true"
                        maxLength={1 as number}
                    />
                    <input
                        type="text"
                        placeholder="text"
                        aria-placeholder="text"
                        onInput={(event) => setCodeDigit3((event.target as HTMLInputElement).value)}
                        value={codeDigit3}
                        required
                        aria-required="true"
                        maxLength={1 as number}
                    />
                    <input
                        type="text"
                        placeholder="text"
                        aria-placeholder="text"
                        onInput={(event) => setCodeDigit4((event.target as HTMLInputElement).value)}
                        value={codeDigit4}
                        required
                        aria-required="true"
                        maxLength={1 as number}
                    />
                    </div>
                        <Link 
                        to={{
                            pathname: "/admin/account/signup"
                        }}>Did not get code?</Link>
                    <p></p>
                    <button
                        type="button"
                        ref={buttonRef}
                        onClick={(event) => {
                            event.preventDefault();
                            new verify();
                        }}
                    >
                        Verify
                    </button>
                </form>
                <br />
                <br />
                <p>
                    We have sent a verification code to email <strong>{String(`${PrimaryAuthenticationObject?.email}`)}</strong>, fill in the form with the sent verification code to enable us verify your admin account to continue.
                </p>
            </section>
        </>
    );
};

export default AdminAccountVerificationPageElementsComponent;