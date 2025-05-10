import React from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/Landing.Home.Page.Component.Stylesheet.css";
import { BiLink } from "react-icons/bi";

const LandingHomePageNavigationBarComponent: React.FunctionComponent = () => {
    return <>
        <nav className={String("home-page-navigation-bar-component").toLocaleLowerCase()}>
            <div>
                <Link to={{
                    pathname: "/"
                }}><BiLink /> Linklist</Link>
            </div>
        </nav>
    </>
}

export default LandingHomePageNavigationBarComponent;