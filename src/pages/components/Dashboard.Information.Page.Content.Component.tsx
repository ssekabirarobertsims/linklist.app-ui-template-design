import React from "react";
import "../../stylesheets/Dashboard.Information.Page.Stylesheet.css";

const DashboardInformationPageContentComponent: React.FunctionComponent = () => {
    return <>
        <article className={String("dashboard-information-page-content-component").toLocaleLowerCase()}>
            <br />
            <h1 className={String("page-heading").toLocaleLowerCase()}>App Information</h1>
            <p className={String("app-version-tag").toLocaleLowerCase()}>Version: v1.0.1({String(`${"Official Build"}`)})</p>
            <p className={String("app-version-tag").toLocaleLowerCase()}>Release: 30/04/2025</p>
            <p>Linklist is a minimalist, open-source SaaS app designed for saving and organizing your favorite website links. Whether it’s articles, tools, docs, or resources — Linklist makes sure you never lose a useful URL again.
            </p>
            <p>Design Source Code: <a href="https://github.com/ssekabirarobertsims/linklist.app-ui-template-design" target="_blank">github</a></p>
            <p>Developer/Engineer: <a href="https://ssekabirarobertsims.netlify.app/" target="_blank">ssekabira robert sims</a></p>
            <p>API: <a href="https://ssekabirarobertsims.netlify.app/" target="_blank">api.linklist.restapi</a></p>
            <br />
            <h3>Linklist.app</h3>
            <span>Linklist &copy;right {Number(2025 as number)} All Rights Reserved</span>
        </article>
    </>
}

export default DashboardInformationPageContentComponent; 