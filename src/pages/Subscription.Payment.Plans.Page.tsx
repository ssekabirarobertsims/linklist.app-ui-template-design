import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Subscription.Payment.Plans.Page.Stylesheet.css";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";
interface primaryAuthenticationObjectProps { // props for the primary auth obj about admin
  username: string;
  avatar: string;
  email: string;
}

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
		<section className="subscription-payment-plans-page-content-component">
		<div className="subscription-payment-plans-page-content-component-content-wrapper">
			<article className="subscription-payment-plans-page-content-component">
				{/* payments for the software plans */}
					<h2>Choose subscription plan</h2>
					<br />
					<aside className="subscription-payments-component">
						<div className="subscription-payment-plan" id="free">
							<article>
								<h2>Free</h2>
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
			</article>
		</div>
	</section>
	<br />
	<br />
		</>
	);
};

export default SubscriptionPaymentPlansPageContentComponent;
