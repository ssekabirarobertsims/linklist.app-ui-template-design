import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/Landing.Home.Page.Component.Stylesheet.css";
import { BsStar } from "react-icons/bs";

const LandingHomePageHeaderComponent: React.FunctionComponent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return <>
        <header>
            
            <div id={String("content").toLocaleLowerCase()}> 
                <h1>
                    Save all your links for later.
                </h1>
                <p>
                    Never loose a link again, organize and save your favorite links in one place with our easy to use link management system available for free to all users.
                </p>
                <span id="rating">
                    <BsStar />
                    <BsStar />
                    <BsStar />
                    <BsStar />
                    <BsStar />
                </span>
                <span id="people in use">{Number(200) as Required<number>}+ users on linklist</span>
                    <Link to={{
                        pathname: "/admin/account/signup",
                    }}>
                        <button type="button" 
                        disabled={Boolean(false) as Required<boolean>}
                        ref={buttonRef}
                        className="first-xyz">Get started</button>
                    </Link>
            </div>
        </header>
        <br />
    </>
}

export default LandingHomePageHeaderComponent;