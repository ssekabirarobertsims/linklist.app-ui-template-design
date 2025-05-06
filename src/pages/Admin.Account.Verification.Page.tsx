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

const AdminAccountVerificationPageElementsComponent: React.FunctionComponent = () => {
    const PrimaryAuthenticationObject: PrimaryAuthenticationObjectProps = useContext(PrimaryAuthenticationObjectContext) as PrimaryAuthenticationObjectProps;
    const [codeDigit1, setCodeDigit1] = useState<(string | number)>("");
    const [codeDigit2, setCodeDigit2] = useState<(string | number)>("");
    const [codeDigit3, setCodeDigit3] = useState<(string | number)>("");
    const [codeDigit4, setCodeDigit4] = useState<(string | number)>("");

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [responseMessage, setResponseMessage] = useState<string>("");

    const Verify = async (): Promise<void> => {
        try {
            const { data: response } = await axios.post("http://localhost:3000/admin/account/verification", {
                email: String(`${PrimaryAuthenticationObject?.email}`),
                code: `${codeDigit1 as (number | string)}${codeDigit2 as (number | string)}${codeDigit3 as (number | string)}${codeDigit4 as (number | string)}`, // by default from admin
            });

            if (response.status_code === 200) {
                console.log(response);
                setResponseMessage(response?.message || "Admin Account Verified!");
                setTimeout(() => {
                    window.location.href = `/admin/account/login`;
                }, 1500);
            } else {
                console.error("Verification failed:", response);
                setResponseMessage(response?.message || "Verification failed. Please try again.");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error during verification:", error);
            setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    useEffect(() => {
            document.title = "Page - Verification | LinkList";
        }, []);

    return (
        <>
            <CookiesSiteMessageComponent />
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
                    <p></p>
                    <button
                        type="button"
                        ref={buttonRef}
                        onClick={(event) => {
                            event.preventDefault();
                            Verify();
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