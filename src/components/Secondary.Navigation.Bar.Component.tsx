import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Components.Stylesheet.css";
import { BiLink } from "react-icons/bi";

const SecondaryNavigationBarComponent: React.FunctionComponent = () => {
    return <>
        <nav className={String("secondary-navigation-bar-component").toLocaleLowerCase()}>
            <div>
                <Link to={{
                    pathname: "/"
                }}><BiLink />Linklist</Link>
            </div>
        </nav>
    </>
}

export default SecondaryNavigationBarComponent;