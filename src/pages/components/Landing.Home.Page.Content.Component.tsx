import React from "react";
const steps = [
    { step: '1', title: 'Install the Extension', description: 'Download Easy Link Saver from your browser\'s extension store and click "Add to browser".' },
    { step: '2', title: 'Save Your Links', description: 'Click the Easy Link Saver icon, enter a name for your link, and save it with one click.' },
    { step: '3', title: 'Access Anytime', description: 'Open the extension whenever you need to find a saved link and click to visit instantly.' },
  ];

import { Link } from "react-router-dom";
  
const LandingHomePageContentComponent: React.FunctionComponent = () => {
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
                        <button type="button" className="first-xyz">Sign up or in</button>
                    </Link>
        </aside>
        </article>
        <br />
        <br />
    </>
}

export default LandingHomePageContentComponent;
