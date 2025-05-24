import React, { useRef } from "react";
import "../stylesheets/Landing.Home.Page.Component.Stylesheet.css";
import LandingHomePageNavigationBarComponent from "./components/Landing.Home.Page.Navigation.Bar.Component";
import LandingHomePageFooterComponent from "./components/Landing.Home.Page.Footer.Component";
import LandingHomePageHeaderComponent from "./components/Landing.Home.Page.Header.Component";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import NotificationsSideBarComponent from "../components/Notifications.Side.Bar.Component";
import { Link } from "react-router-dom";

// Steps for the "How it works" section
const steps = [
  {
    step: "1",
    title: "Sign up for an account",
    description:
      "Sign up for an account on Linklist to get an admin account and proceed to log in to access the dashboard.",
  },
  {
    step: "2",
    title: "Login to your account",
    description:
      "Log in to your admin account to access the main dashboard and manage your links in one perfect secure place.",
  },
  {
    step: "3",
    title: "Save Your Links",
    description:
      "After logging in, access the Linklist dashboard to save all your favorite links in one place and also manage how to handle them.",
  },
];

import LandingHomePageTestimonialsComponent from "./components/Landing.Home.Page.Testimonials.Component";
import { TiTick } from "react-icons/ti";
import PrimaryAuthenticationObjectContext from "../context/Primary.Authentication.Object.Context";

// Define the shape of the primary authentication object from context
interface AdminAccountContextProperties {
  username: string;
  avatar: string;
  email: string;
}

const LandingHomePageElementsComponent: React.FunctionComponent = () => {
  // Set the document title on mount
  React.useEffect(() => {
    document.title = "Page - Home | LinkList";
  }, []);

  // Get the current admin's authentication data from context
  const PrimaryAuthenticationObject = React.useContext(
    PrimaryAuthenticationObjectContext
  ) as AdminAccountContextProperties;
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* Navigation bar and global UI components */}
      <LandingHomePageNavigationBarComponent />
      <CookiesSiteMessageComponent />
      <NotificationsSideBarComponent />
      <section
        className={String(
          "landing-home-page-element-component"
        ).toLocaleLowerCase()}
      >
        <LandingHomePageHeaderComponent />
        <div
          className={String(
            "landing-home-page-element-component-content-wrapper"
          ).toLocaleLowerCase()}
        >
          <article
            className={String(
              "landing-home-page-element-component-content"
            ).toLocaleLowerCase()}
          >
            <br />
            <br />
            {/* How it works section */}
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
              {/* Subscription payment plans section */}
              <h2>Subscription payments plans</h2>
              <p></p>
              <aside className="subscription-payments-component">
                {/* Free Plan */}
                <div className="subscription-payment-plan" id="free">
                  <article>
                    <h2>Free Plan (Starter Tier)</h2>
                    <span>$0/year</span>
                    {/* Button navigates to free plan subscription page */}
                    <Link
                      to={{
                        pathname: `/${String(
                          PrimaryAuthenticationObject?.username
                            ? PrimaryAuthenticationObject?.username.replace(
                                " ",
                                ""
                              )
                            : "admin"
                        )
                          .toLocaleLowerCase()
                          .replace(" ", "")}/account/subscription/free/plan`,
                      }}
                    >
                      <button type="button" ref={buttonRef}>
                        Use linklist for free
                      </button>
                    </Link>
                    <h3>Whats included in plan:</h3>
                    <ul>
                      <li>
                        <TiTick />
                        Limited storage of links(50)
                      </li>
                      <li>
                        <TiTick />
                        No subscription needed
                      </li>
                      <li>
                        <TiTick />
                        Trash bin storage of 25 links
                      </li>
                      <li>
                        <TiTick />
                        Basic metadata preview (title, favicon)
                      </li>
                    </ul>
                    <br />
                    <p>status: available</p>
                  </article>
                </div>
                {/* Pro Plan */}
                <div className="subscription-payment-plan" id="pro">
                  <article>
                    <h2> Pro Plan (Power Users & Professionals)</h2>
                    <span>$15/year</span>
                    <button type="button" ref={buttonRef}>
                      Use linklist as a pro
                    </button>
                    <h3>Whats included in plan:</h3>
                    <ul>
                      <li>
                        <TiTick />
                        Unlimited storage of links
                      </li>
                      <li>
                        <TiTick />
                        API access
                      </li>
                      <li>
                        <TiTick />
                        Boosted performance (faster link previews)
                      </li>
                      <li>
                        <TiTick />
                        End-to-end encryption for sensitive links
                      </li>
                    </ul>
                    <br />
                    <p>status: not available</p>
                  </article>
                </div>
                {/* Basic Plan */}
                <div className="subscription-payment-plan" id="basic">
                  <article>
                    <h2>Basic Plan (Entry Premium Tier)</h2>
                    <span>$5/year</span>
                    <button type="button" ref={buttonRef}>
                      Use linklist at basic
                    </button>
                    <h3>Whats included in plan:</h3>
                    <ul>
                      <li>
                        <TiTick />
                        Save up to 500 links
                      </li>
                      <li>
                        <TiTick />
                        Smart suggestions (duplicates, broken links)
                      </li>
                      <li>
                        <TiTick />
                        Trash bin storage of 250 links
                      </li>
                      <li>
                        <TiTick />
                        Import/export links (CSV/HTML)
                      </li>
                    </ul>
                    <br />
                    <p>status: not available</p>
                  </article>
                </div>
              </aside>
              {/* Testimonials from users */}
              <LandingHomePageTestimonialsComponent />
              {/* Call to action for signup */}
              <aside>
                <div>
                  <h2>Just save links for later</h2>
                  <p>
                    Sign up or log in to your account to start saving links for
                    later. You can access your saved links from any device,
                    anywhere, anytime.
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
          </article>
        </div>
      </section>
      <br />
      <LandingHomePageFooterComponent />
    </>
  );
};

export default LandingHomePageElementsComponent;
