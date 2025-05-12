import React, { useRef } from "react";
import { LiaCookieBiteSolid } from "react-icons/lia";
import "../../stylesheets/Dashboard.Settings.Page.Stylesheet.css";

const DashboardSettingsPageSiteCookiesPermissionComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked);
    };

    const handleClearCookies = () => {
        console.log("Cookies cleared!");
        // Add logic to clear cookies if needed
    };

    return (
        <>
            <br />
            <h2>Cookies and site permissions</h2>
            <p></p>
            <article className="cookies-and-site-permissions-content-wrapper">
                <div>
                    <aside>
                        <p>
                            Linklist.app uses cookies to enhance your experience by remembering your login session and preferences. We do not use cookies for tracking or advertising. By continuing to use the app, you agree to the use of essential cookies.
                        </p>
                        <br />
                        <label htmlFor="allow-cookies-status">
                            <input
                                type="checkbox"
                                name="allow-cookies-status"
                                id="allow-cookies-status"
                                defaultChecked
                                aria-checked="true"
                                onChange={handleCheckboxChange}
                            />
                            Allow site to use and save cookies.
                        </label>
                        <br />
                        <button
                            type="button"
                            disabled={false}
                            ref={buttonRef}
                            onClick={handleClearCookies}
                        >
                            <span>
                                <LiaCookieBiteSolid />
                            </span>{" "}
                            Clear Cookies
                        </button>
                    </aside>
                </div>
            </article>
        </>
    );
};

export default DashboardSettingsPageSiteCookiesPermissionComponent;
