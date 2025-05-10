import React, { useRef } from "react";
import { LiaCookieBiteSolid } from "react-icons/lia";
import "../../stylesheets/Dashboard.Settings.Page.Stylesheet.css";

const DashboardSettingsPageSiteCookiesPermissionComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return <>
        <br />
            <h2>Cookies and site permissions</h2>
            <p></p>
            <article className={String("cookies-and-site-permissions-content-wrapper").toLocaleLowerCase()}>
                <div>
                   <aside>
                   <p>Linklist.app uses cookies to enhance your experience by remembering your login session and preferences. We do not use cookies for tracking or advertising. By continuing to use the app, you agree to the use of essential cookies.</p>
                   <br />
                   <label htmlFor="allow-cookies-status">
                    <input type="checkbox" name="allow-cookies-status" id="allow-cookies-status"
                        checked
                        aria-checked="true"
                        onChange={(event) => {
                            console.log((event.target as Required<HTMLInputElement>).value);
                        }}
                    />
                    Allow site to use and save cookies.
                   </label>
                   <br />
                   <button type="button"
                    disabled={Boolean(false) as Required<boolean>}
                    ref={buttonRef}
                   ><span><LiaCookieBiteSolid /></span> Clear Cookies</button>
                   </aside>
                </div>
            </article>
    </>
}

export default DashboardSettingsPageSiteCookiesPermissionComponent;
