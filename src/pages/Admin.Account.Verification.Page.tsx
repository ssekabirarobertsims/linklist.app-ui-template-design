import React, { useRef, useState, useEffect, useContext } from "react";
import "../stylesheets/Admin.Account.Verification.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import axios from "axios";
import PrimaryAuthenticationObjectContext from "../context/Primary.Authentication.Object.Context";
import { Link } from "react-router-dom";
import RemoveElement from "../functions/Remove.Element.Function";
import DisplayElement from "../functions/Display.Element.Function";
import PrimaryPageLoaderComponent from "../components/Primary.Page.Loader.Component";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";

interface PrimaryAuthenticationObjectProps {
    username: string;
    avatar: string;
    email: string;
}

const AdminAccountVerificationPageElementsComponent: React.FunctionComponent = () => {
    const PrimaryAuthenticationObject = useContext(PrimaryAuthenticationObjectContext) as PrimaryAuthenticationObjectProps;
    const [codeDigits, setCodeDigits] = useState<string[]>(["", "", "", ""]);
    const [responseMessage, setResponseMessage] = useState<string>("");
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleInputChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const updatedDigits = [...codeDigits];
            updatedDigits[index] = value;
            setCodeDigits(updatedDigits);
        }
    };

    const handleVerification = async () => {
        const loader = document.querySelector(".primary-spinner-wrapper") as HTMLDivElement;
        DisplayElement(loader);

        try {
            const { data: response } = await axios.post("http://localhost:3000/admin/account/verification", {
                email: PrimaryAuthenticationObject?.email || "",
                code: codeDigits.join(""),
            });

            if (response.status_code === 200) {
                setResponseMessage(response?.message || "Admin Account Verified!");
                setTimeout(() => {
                    RemoveElement(loader);
                    window.location.href = `/admin/account/login`;
                }, 2000);
            } else {
                setResponseMessage(response?.message || "Verification failed. Please try again.");
                setTimeout(() => RemoveElement(loader), 2000);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error during verification:", error);
            setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
            setTimeout(() => RemoveElement(loader), 2000);
        }
    };

    useEffect(() => {
        document.title = "Page - Verification | LinkList";
    }, []);

    return (
        <>
            <CookiesSiteMessageComponent />
            <PrimaryPageLoaderComponent />
            <SecondaryNavigationBarComponent />
            <section className="admin-account-verification-page-elements-component">
                <form
                    method="post"
                    encType="multipart/form-data"
                    className="admin-account-verification-page-form"
                >
                    <h1>Verify Account</h1>
                    <span className="verification-response-message-placeholder">{responseMessage}</span>
                    <div>
                        {codeDigits.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder="0"
                                aria-placeholder="Digit"
                                value={digit}
                                onChange={(event) => handleInputChange(index, event.target.value)}
                                required
                                aria-required="true"
                                maxLength={1}
                            />
                        ))}
                    </div>
                    <Link to="/admin/account/signup">Did not get code?</Link>
                    <p></p>
                    <button
                        type="button"
                        ref={buttonRef}
                        onClick={(event) => {
                            event.preventDefault();
                            handleVerification();
                        }}
                    >
                        Verify
                    </button>
                </form>
                <br />
                <br />
                <p>
                    We have sent a verification code to email <strong>{PrimaryAuthenticationObject?.email || "your email"}</strong>. Fill in the form with the sent verification code to enable us to verify your admin account.
                </p>
            </section>
        </>
    );
};

export default AdminAccountVerificationPageElementsComponent;