import React from "react";
import DashboardSettingsPageAdminProfileComponent from "./Dashboard.Settings.Page.Admin.Profile.Component";
import DashboardSettingsPageAvatarFormComponent from "./Dashboard.Settings.Page.Avatar.Form.Component";
import AdminProfileDeletionWarningComponent from "../../components/Admin.Profile.Deletion.Warning.Component";
import DashboardSettingsPageSiteCookiesPermissionComponent from "./Dashboard.Settings.Page.Site.Cookies.Permissions.Component";
import "../../stylesheets/Dashboard.Settings.Page.Stylesheet.css";

const DashboardSettingsPageContentComponent: React.FunctionComponent = () => {
    return <>
        <article className={String("dashboard-settings-page-content-component").toLocaleLowerCase()}>
            <DashboardSettingsPageAdminProfileComponent />
            <DashboardSettingsPageAvatarFormComponent />
            <AdminProfileDeletionWarningComponent />
            <DashboardSettingsPageSiteCookiesPermissionComponent />
        </article>
    </>
}

export default DashboardSettingsPageContentComponent;