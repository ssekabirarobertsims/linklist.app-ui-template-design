import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/Free.Subscription.Payment.Plan.Page.Stylesheet.css";
import CookiesSiteMessageComponent from "../components/Cookies.Site.Message.Component";
import axios from "axios";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import SecondaryNavigationBarComponent from "../components/Secondary.Navigation.Bar.Component";
import { Link } from "react-router-dom";
import { BiLink } from "react-icons/bi";

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

import { MdVerified } from "react-icons/md";

const FreeAdminAccountSubscriptionPaymentPageElementsComponent: React.FunctionComponent = () => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [responseMessage, setResponseMessage] = useState<string>("");
	const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;
	const isVerified = currentAdmin?.data?.verified === "true" ? "verified" : "unverified";

	useEffect(() => {
		document.title = "Page - Subscription | LinkList";
	}, []);

	const handleSubscribe = async () => {
		try {
			const { data: response } = await axios.post(
				"http://localhost:3000/admin/account/subscription",
				{
					email: currentAdmin?.data?.email || "",
				},
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: `Bearer ${currentAdmin?.data?.token || ""}`,
					},
				}
			);

			if (response.status_code === 200) {
				setResponseMessage(response?.message || "Subscription successful!");
				localStorage.removeItem("secondary_authentication");

				setTimeout(() => {
					localStorage.setItem(
						"secondary_authentication",
						encodeURIComponent(JSON.stringify(response))
					);
					window.location.href = `/admin/account/login`;
				}, 1000);
			} else {
				setResponseMessage(response?.message || "Subscription failed. Please try again.");
			}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error("Error during subscription:", error);
			setResponseMessage(error?.response?.data?.message || "An error occurred. Please try again.");
		}
	};

	return (
		<>
			<CookiesSiteMessageComponent /> 
			<SecondaryNavigationBarComponent />
			<section className="free-admin-account-subscription-payment-plan-page-elements-component">
				<form
					method="post"
					encType="multipart/form-data"
					className="free-admin-account-subscription-payment-plan-page-form"
				>
					<div id="_wrapper">
						<strong><MdVerified />{isVerified} admin account</strong>
						<h1>
							Subscribe to LinkList for a free plan
						</h1>
						<span className="subscription-response-message-placeholder">
							{responseMessage}
						</span>
						<img
							src={`/avatars/${currentAdmin?.data?.avatar || "avatar-2.png"}`}
							alt="Admin Avatar"
						/>
						<span>{currentAdmin?.data?.username || "Admin username undefined"}</span>
						<span>{currentAdmin?.data?.email || "Admin email undefined"}</span>
						<br />
						{currentAdmin?.data?.subscribed === "true" ? (
							<Link to={{
									pathname: `/${String(
									currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
								  )
									.toLocaleLowerCase()
									.replace(" ", "")}/account/subscription/plans`,
									search: `admin=${String(
									currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
								  )
									.toLocaleLowerCase()
									.replace(" ", "")}`
													}}><button
															type="button" 
															ref={buttonRef}
														>
															Upgrade plan
														</button></Link>
						) : (
							<button
								type="button"
								ref={buttonRef}
								onClick={(event) => {
									event.preventDefault();  // prevent event bubbling
									handleSubscribe();
								}}
							>
								subscribe
							</button>
						)}
					</div>
				</form>
				<br />
				<p>
					By subscribing to  <Link to={{
					pathname: "/"
				}}><BiLink />Linklist</Link> free payment plan as{" "}
					{currentAdmin?.data?.username || "Admin Username Undefined"}, you will receive
					an email at <strong>{currentAdmin?.data?.email || "Admin Email Undefined"}</strong> to confirm your subscription to the monthly newsletter and be able to get access to minimum storage of links that are not more than 50 links stored in your admin account links list per year without any subscription plan or fee.
				</p>
			</section>
		</>
	);
};

export default FreeAdminAccountSubscriptionPaymentPageElementsComponent;