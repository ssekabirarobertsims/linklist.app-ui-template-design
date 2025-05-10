import React, { useRef } from "react";
const steps = [
    { step: '1', title: 'Sign up for an account', description: 'Sign up for an account on linklist to get an admin account to proceed logging in to your account to access the dashboard.' },
    { step: '2', title: 'Login to your account', description: 'Sign up for an admin account to get access to log into admin account and be able to access the main dashboard.' },
    { step: '3', title: 'Save Your Links', description: 'Access after admin account login the linklist dashboard to be able to save all your favorite links in one place.' },
];

import { Link } from "react-router-dom";
  
const LandingHomePageContentComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return <>
        <br />
        <br />
        <article className={String("landing-home-page-content-component").toLocaleLowerCase()}>
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
        <Link to={{
                        pathname: "/admin/account/signup",
                    }}>
                        <button type="button" 
                        disabled={Boolean(false) as Required<boolean>}
                        ref={buttonRef}
                        className="first-xyz">Sign up or in</button>
                    </Link>
        </aside>
        </article>
        <br />
        <br />
    </>
}

export default LandingHomePageContentComponent;
