import React, { useRef } from "react";
import { Link } from "react-router-dom";

const steps = [
    { step: "1", title: "Sign up for an account", description: "Sign up for an account on Linklist to get an admin account and proceed to log in to access the dashboard." },
    { step: "2", title: "Login to your account", description: "Log in to your admin account to access the main dashboard and manage your links." },
    { step: "3", title: "Save Your Links", description: "After logging in, access the Linklist dashboard to save all your favorite links in one place." },
];

const LandingHomePageContentComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <br />
            <br />
            <article className="landing-home-page-content-component">
                <h2>How It Works</h2>
                <div className="steps">
                    {steps.map((item, index) => (
                        <div key={index} className="step">
                            <article>
                                <span className="step-number">{item.step}</span>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </article>
                        </div>
                    ))}
                </div>
                <aside>
                    <h2>Just save links for later</h2>
                    <p>
                        Sign up or log in to your account to start saving links for later. You can access your saved links from any device, anywhere, anytime.
                    </p>
                    <Link to="/admin/account/signup">
                        <button
                            type="button"
                            disabled={false}
                            ref={buttonRef}
                            className="first-xyz"
                        >
                            Sign up or in
                        </button>
                    </Link>
                </aside>
            </article>
            <br />
            <br />
        </>
    );
};

export default LandingHomePageContentComponent;
