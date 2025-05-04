import React from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/Landing.Home.Page.Component.Stylesheet.css";

const LandingHomePageHeaderComponent: React.FunctionComponent = () => {
    return <>
        <header>
            <div id={String("content").toLocaleLowerCase()}> 
                <span>linklist.app</span>
                <h1>
                    Get started with the safest place to store all your favorite links in one place.
                </h1>
                <p>
                    Never loose a link again, organize and save your favorite links in one place.
                </p>
                <br />
                <article>
                    <Link to={{
                        pathname: "/admin/account/signup",
                        search: "query=signup&form=password&username&email",
                        hash: "#hash"
                    }}>
                        <button type="button" className="first-xyz">Create Account</button>
                    </Link>
                    <Link to={{
                        pathname: "/admin/account/login",
                        search: "query=login&form=password",
                        hash: "#hash"
                    }}>
                        <button type="button">Log into Account</button>
                    </Link>
                </article>
            </div>
        </header>
    </>
}

export default LandingHomePageHeaderComponent;