import { Routes, Route } from "react-router-dom";
import LandingHomePageElementsComponent from "./pages/Landing.Home.Page";
import DashboardHomePageElementsComponent from "./pages/Dashboard.Home.Page";
import AdminAccountLoginPageElementsComponent from "./pages/Admin.Account.Login.Page";
import AdminAccountSignupPageElementsComponent from "./pages/Admin.Account.Signup.Page";
import DashboardSettingsPageElementsComponent from "./pages/Dashboard.Settings.Page";
import DashboardInformationPageElementsComponent from "./pages/Dashboard.Information.Page";
import DashboardLinksPageElementsComponent from "./pages/Dashboard.Links.Page";
import AdminAccountVerificationPageElementsComponent from "./pages/Admin.Account.Verification.Page";
import RemoveElement from "./functions/Remove.Element.Function";
import AdminAccountSubscriptionPageElementsComponent from "./pages/Admin.Account.Subscription.Page";

try {
  window.document.body.addEventListener("click", (event) => {
    event.stopPropagation();
    RemoveElement(
      window.document.querySelector(
        ".notifications-side-bar-component"
      ) as HTMLElement
    );
    RemoveElement(
      window.document.querySelector(
        ".admin-account-profile-review-side-bar"
      ) as HTMLElement
    );
  });
} catch (error) {
  (async function (): Promise<unknown> {
    return error;
  })();
}

interface PrimaryAuthenticationObjectProps {
  username: string;
  avatar: string;
  email: string;
}

interface SecondaryAuthenticationProps {
  date: string;
  message: string;
  request_id: string; 
  status_code: string;
  data: {
      id: string,
      username: string,
      avatar: string,
      email: string,
      token: string,
      subscribed: string,
      verified: string,
  }
}

import PrimaryAuthenticationObjectContext from "./context/Primary.Authentication.Object.Context";
import SecondaryAuthenticationObjectContext from "./context/Secondary.Authentication.Object.Context";
import OfflinePageElementsComponent from "./pages/Offline.Page";
import DashboardTrashPageElementsComponent from "./pages/Dashboard.Trash.Page";
const PrimaryAuthenticationObject: (object | PrimaryAuthenticationObjectProps) =
  JSON.parse(
    window.decodeURIComponent(
      window.localStorage.getItem("primary_authentication") as string
    )
  ) as (object | PrimaryAuthenticationObjectProps);
const SecondaryAuthenticationObject: (object | SecondaryAuthenticationProps) =
  JSON.parse(
    window.decodeURIComponent(
      window.localStorage.getItem("secondary_authentication") as string
    )
  ) as (object | SecondaryAuthenticationProps);

  console.log(PrimaryAuthenticationObject)
  console.log(SecondaryAuthenticationObject)

function App() {
  return !window.navigator.onLine ? (
    <SecondaryAuthenticationObjectContext.Provider
      value={SecondaryAuthenticationObject as SecondaryAuthenticationProps}
    >
      <Routes>
        <Route index element={<LandingHomePageElementsComponent />} />
        <Route path="/" element={<LandingHomePageElementsComponent />} />
        <Route path="/home" element={<LandingHomePageElementsComponent />} />
        <Route
          path="/home/page"
          element={<LandingHomePageElementsComponent />}
        />

        <Route
          path={`/dashboard`}
          element={
            (SecondaryAuthenticationObject as SecondaryAuthenticationProps) &&
            (PrimaryAuthenticationObject as PrimaryAuthenticationObjectProps) ? (
              <DashboardHomePageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />
        <Route
          path={`/dashboard/saved/links`}
          element={
            (SecondaryAuthenticationObject as SecondaryAuthenticationProps) &&
            (PrimaryAuthenticationObject as PrimaryAuthenticationObjectProps) ? (
              <DashboardLinksPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />
        <Route
          path={`/dashboard/links/trash`}
          element={
            (SecondaryAuthenticationObject as SecondaryAuthenticationProps) &&
            (PrimaryAuthenticationObject as PrimaryAuthenticationObjectProps) ? (
              <DashboardTrashPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />
        <Route
          path={`/dashboard/settings`}
          element={
            (SecondaryAuthenticationObject as SecondaryAuthenticationProps) &&
            (PrimaryAuthenticationObject as PrimaryAuthenticationObjectProps) ? (
              <DashboardSettingsPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />
        <Route
          path={`/dashboard/app/info`}
          element={
            (SecondaryAuthenticationObject as SecondaryAuthenticationProps) &&
            (PrimaryAuthenticationObject as PrimaryAuthenticationObjectProps) ? (
              <DashboardInformationPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        <Route
          path="/admin/account/login"
          element={
            (PrimaryAuthenticationObject as PrimaryAuthenticationObjectProps) ? (
              <PrimaryAuthenticationObjectContext.Provider
                value={
                  PrimaryAuthenticationObject as PrimaryAuthenticationObjectProps
                }
              >
                <AdminAccountLoginPageElementsComponent />
              </PrimaryAuthenticationObjectContext.Provider>
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />
        <Route
          path="/admin/account/subscription"
          element={
            (SecondaryAuthenticationObject as SecondaryAuthenticationProps) &&
            (PrimaryAuthenticationObject as PrimaryAuthenticationObjectProps) ? (
              <PrimaryAuthenticationObjectContext.Provider
                value={
                  PrimaryAuthenticationObject as PrimaryAuthenticationObjectProps
                }
              >
                <AdminAccountSubscriptionPageElementsComponent />
              </PrimaryAuthenticationObjectContext.Provider>
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        <Route
          path="/admin/account/signup"
          element={
            (SecondaryAuthenticationObject as SecondaryAuthenticationProps) ||
            (PrimaryAuthenticationObject as PrimaryAuthenticationObjectProps) ? (
              <AdminAccountLoginPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        <Route
          path="/admin/account/verification"
          element={
              <AdminAccountVerificationPageElementsComponent />
          }
        />
      </Routes>
    </SecondaryAuthenticationObjectContext.Provider>
  ) : (
    <OfflinePageElementsComponent />
  );
}

export default App;
