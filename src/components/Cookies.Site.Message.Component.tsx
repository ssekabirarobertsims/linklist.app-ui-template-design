import React from "react";

const CookiesSiteMessageComponent: React.FunctionComponent = () => {
    return (
        <aside className="cookies-site-message-component">
            <div>
                <p>
                    This site uses cookies. By continuing to use this software, you agree to their use in your browser and operation to enhance performance!
                </p>
                <button type="button">Accept</button>
            </div>
        </aside>
    );
};

export default CookiesSiteMessageComponent;