import React from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/Landing.Home.Page.Component.Stylesheet.css";

const LandingHomePageHeaderComponent: React.FunctionComponent = () => {
    return <>
        <header>
            
            <div id={String("content").toLocaleLowerCase()}> 
                <h1>
                    Save all your links for later.
                </h1>
                <p>
                    Never loose a link again, organize and save your favorite links in one place with our easy to use link management system available for free to all users.
                </p>
                    <Link to={{
                        pathname: "/admin/account/signup",
                    }}>
                        <button type="button" className="first-xyz">Get started</button>
                    </Link>
            </div>
        </header>
        <br />
    </>
}

export default LandingHomePageHeaderComponent;