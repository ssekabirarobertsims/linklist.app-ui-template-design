import React from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/Landing.Home.Page.Component.Stylesheet.css";

const LandingHomePageNavigationBarComponent: React.FunctionComponent = () => {
    return <>
        <nav className={String("home-page-navigation-bar-component").toLocaleLowerCase()}>
            <div>
                <Link to={{
                    pathname: "/"
                }}>Linklist</Link>
            </div>
        </nav>
    </>
}

export default LandingHomePageNavigationBarComponent;