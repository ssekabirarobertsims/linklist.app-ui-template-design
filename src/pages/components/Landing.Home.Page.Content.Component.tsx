import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/Landing.Home.Page.Component.Stylesheet.css";

const steps = [
    { step: "1", title: "Sign up for an account", description: "Sign up for an account on Linklist to get an admin account and proceed to log in to access the dashboard." },
    { step: "2", title: "Login to your account", description: "Log in to your admin account to access the main dashboard and manage your links." },
    { step: "3", title: "Save Your Links", description: "After logging in, access the Linklist dashboard to save all your favorite links in one place." },
];

import LandingHomePageTestimonialsComponent from "./Landing.Home.Page.Testimonials.Component";
import SecondaryAuthenticationObjectContext from "../../context/Secondary.Authentication.Object.Context";

interface SecondaryAuthenticationProps {
  date: string;
  message: string;
  request_id: string;
  status_code: string;
  data: {
    id: string;
    username: string;
    avatar: string;
    email: string;
    token: string;
    subscribed: string;
    verified: string;
  };
}

const LandingHomePageContentComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
 const currentAdmin: SecondaryAuthenticationProps = React.useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;

    return (
        <>
            <br />
            <br />
            <article className="landing-home-page-content-component">
                <h2>How it works</h2>
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
                {/* payments for the software */}
                    <h2>Subscription payments plans</h2>
                    <p></p>
                    <aside className="subscription-payments-component">
                        <div className="subscription-payment-plan" id="free">
                            <article>
                                <h2>Free</h2>
                                <span>$0/year</span>
                                <Link to={{
                                    pathname: `/${String(
        currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}/account/subscription`
                                }}><button type="button" ref={buttonRef}>Use linklist for free</button></Link>
                                <h3>Whats included in plan:</h3>
                                <ul>
                                    <li>limited storage of links(50)</li>
                                    <li>no subscription needed</li>
                                    <li>sample</li>
                                    <li>sample</li>
                                </ul>
                                <br />
                                <p>status: available</p>
                            </article>
                        </div>
                        <div className="subscription-payment-plan" id="pro">
                            <article>
                                <h2>Pro</h2>
                                <span>$15/year</span>
                                <button type="button" ref={buttonRef}>Use linklist as a pro</button>
                                <h3>Whats included in plan:</h3>
                                <ul>
                                    <li>sample</li>
                                    <li>sample</li>
                                    <li>sample</li>
                                    <li>sample</li>
                                </ul>
                                <br />
                                <p>status: not available</p>
                            </article>
                        </div>
                        <div className="subscription-payment-plan" id="basic">
                            <article>
                                <h2>Basic</h2>
                                <span>$5/year</span>
                                <button type="button" ref={buttonRef}>Use linklist at basic</button>
                                <h3>Whats included in plan:</h3>
                                <ul>
                                    <li>sample</li>
                                    <li>sample</li>
                                    <li>sample</li>
                                    <li>sample</li>
                                </ul>
                                <br />
                                <p>status: not available</p>
                            </article>
                        </div>
                    </aside>

                {/* testimonials from users */}
                <LandingHomePageTestimonialsComponent />
                {/* aside component */}
                <aside>
                    <div>
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
                            Join other users 
                        </button>
                    </Link>
                    </div>
                </aside>
            </article>
            <br />
            <br />
        </>
    );
};

export default LandingHomePageContentComponent;
