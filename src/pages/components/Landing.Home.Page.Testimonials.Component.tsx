import React from "react";
import "../../stylesheets/Landing.Home.Page.Component.Stylesheet.css";

const LandingHomePageTestimonialsComponent: React.FunctionComponent = () => {
    return <>
			<h1 id="home-page-testimonials-component-heading">What users say</h1>
        <article className={String("home-page-testimonials-component").toLocaleLowerCase()}>
            <div>
                <article className="testimonial_wrapper">
					<p>
Sign up or log in to your account to start saving links for later. You can access your saved links from any device, anywhere, anytime. Join other users Lorem20 Linklist Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque quae deleniti sapiente tempore obcaecati, impedit saepe, nostrum officia id repellat quia temporibus. Excepturi in soluta laborum, est aliquid amet inventore? Resourcesabout signup login More links developer api guide Linklist © 2025 All Rights Reserved
					</p>
					<div>
						    <img
                            src="/photos/person-1.jpg"
                            alt="Current Admin Avatar"
                            id="current-admin-avatar-placeholder"
                        />
						<div><span>Kennedy Baker</span>
						<p>Data analyst</p></div>
					</div>
				</article>
            </div>
            <div>
                <article className="testimonial_wrapper">
					<p>
Sign up or log in to your account to start saving links for later. You can access your saved links from any device, anywhere, anytime. Join other users Lorem20 Linklist Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque quae deleniti sapiente tempore obcaecati, impedit saepe, nostrum officia id repellat quia temporibus. Excepturi in soluta laborum, est aliquid amet inventore? Resourcesabout signup login More links developer api guide Linklist © 2025 All Rights Reserved
					</p>
					<div>
						    <img
                            src="/photos/person-2.jpg"
                            alt="Current Admin Avatar"
                            id="current-admin-avatar-placeholder"
                        />
						<div><span>Maria Hilda</span>
						<p>Ui/Ux designer</p></div>
					</div>
				</article>
            </div>
        </article>
    </>
}

export default LandingHomePageTestimonialsComponent;