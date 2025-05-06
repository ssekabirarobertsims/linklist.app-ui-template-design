import React from "react";
import { Link } from "react-router-dom";
import "../../stylesheets/Landing.Home.Page.Component.Stylesheet.css";

const LandingHomePageHeaderComponent: React.FunctionComponent = () => {
    return <>
        <header>
            <div id={String("img").toLocaleLowerCase()}> 
                <img src="/photos/cut" alt="" />
            </div>
            <div id={String("content").toLocaleLowerCase()}> 
                <h1>
                    Get started with the safest place to store all your favorite links.
                </h1>
                <p>
                    Never loose a link again, organize and save your favorite links in one place Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis repellat dolore doloremque earum. Aperiam ipsa impedit obcaecati facere soluta eligendi.
                </p>
                    <Link to={{
                        pathname: "/admin/account/signup",
                    }}>
                        <button type="button" className="first-xyz">Get started</button>
                    </Link>
            </div>
        </header>
    </>
}

export default LandingHomePageHeaderComponent;