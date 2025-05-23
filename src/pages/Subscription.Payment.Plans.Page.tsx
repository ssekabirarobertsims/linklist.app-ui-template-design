import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Subscription.Payment.Plans.Page.Stylesheet.css";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";
interface primaryAuthenticationObjectProps { // props for the primary auth obj about admin
  username: string;
  avatar: string; 
  email: string;
}

import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import { TiTick } from "react-icons/ti";

const SubscriptionPaymentPlansPageContentComponent: React.FunctionComponent = () => {
	const buttonRef = useRef<HTMLButtonElement>(null);
 const primaryAuthenticationObject: (primaryAuthenticationObjectProps) =
  JSON.parse(
    window.decodeURIComponent(
      window.localStorage.getItem("primary_authentication") as string
    )
  ) as (primaryAuthenticationObjectProps);
  console.log(primaryAuthenticationObject)

	return (
		<>
		<SecondaryNavigationBarComponent />
		<CookiesSiteMessageComponent />
		<section className="subscription-payment-plans-page-content-component">
		<div className="subscription-payment-plans-page-content-component-content-wrapper">
			<article className="subscription-payment-plans-page-content-component">
				{/* payments for the software plans */}
					<h2>Choose subscription plan</h2>
					<br />
					<aside className="subscription-payments-component">
						<div className="subscription-payment-plan" id="free">
							<article>
								<h2>Free Plan (Starter Tier)</h2> 
								<span>$0/year</span>
								<Link to={{
									pathname: `/${String(
		primaryAuthenticationObject?.username ? primaryAuthenticationObject?.username.replace(" ", "") : "admin"
	  )
		.toLocaleLowerCase()
		.replace(" ", "")}/account/subscription/free/plan`
								}}><button type="button" ref={buttonRef}>Use linklist for free</button></Link>
								<h3>Whats included in plan:</h3>
								<ul>
									<li>
										<TiTick />Limited storage of links(50)
									</li>
									<li>
										<TiTick />No subscription needed
									</li>
									<li>
										<TiTick />Trash bin storage of 25 links
									</li>
									<li>
										<TiTick />Basic metadata preview (title, favicon)
									</li>
								</ul>
								<br />
								<p>status: available</p>
							</article>
						</div>
						<div className="subscription-payment-plan" id="pro">
							<article>
								<h2> Pro Plan (Power Users & Professionals)</h2>
								<span>$15/year</span>
								<button type="button" ref={buttonRef}>Use linklist as a pro</button>
								<h3>Whats included in plan:</h3>
								<ul>
									<li><TiTick />Unlimited storage of links</li>
									<li><TiTick />API access</li>
									<li><TiTick />Boosted performance (faster link previews)</li>
									<li><TiTick />End-to-end encryption for sensitive links</li>
								</ul>
								<br />
								<p>status: not available</p>
							</article>
						</div>
						<div className="subscription-payment-plan" id="basic">
							<article>
								<h2>Basic Plan (Entry Premium Tier)</h2>
								<span>$5/year</span>
								<button type="button" ref={buttonRef}>Use linklist at basic</button>
								<h3>Whats included in plan:</h3>
								<ul>
									<li><TiTick />Save up to 500 links</li>
									<li><TiTick />Smart suggestions (duplicates, broken links)</li>
									<li><TiTick />Trash bin storage of 250 links</li>
									<li><TiTick />Import/export links (CSV/HTML)</li>
								</ul>
								<br />
								<p>status: not available</p>
							</article>
						</div>
					</aside>
			</article>
		</div>
	</section>
	<br />
	<br />
		</>
	);
};

export default SubscriptionPaymentPlansPageContentComponent;
