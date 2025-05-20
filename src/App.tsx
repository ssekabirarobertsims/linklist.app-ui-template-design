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

// try catch block to prevent errors that may rise due to undefined elements on the DOM
try {
  window.document.body.addEventListener("click", (event) => {
    event.stopPropagation(); // prevent event bubbling

    RemoveElement(
      window.document.querySelector(
        ".notifications-side-bar-component"
      ) as Required<HTMLElement>
    );

    RemoveElement(
      window.document.querySelector(
        ".admin-account-profile-review-side-bar"
      ) as Required<HTMLElement>
    );
  });
} catch (error) { // catch error and return it
  (async function (): Promise<unknown> {
    return error;
  })();
}

interface primaryAuthenticationObjectProps { // props for the primary auth obj about admin
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
 
// when user deletes account, delete all his links saved
import primaryAuthenticationObjectContext from "./context/Primary.Authentication.Object.Context";
import secondaryAuthenticationObjectContext from "./context/Secondary.Authentication.Object.Context";
import OfflinePageElementsComponent from "./pages/Offline.Page";
import DashboardTrashPageElementsComponent from "./pages/Dashboard.Trash.Page";

const primaryAuthenticationObject: (primaryAuthenticationObjectProps) =
  JSON.parse(
    window.decodeURIComponent(
      window.localStorage.getItem("primary_authentication") as string
    )
  ) as (primaryAuthenticationObjectProps);
const secondaryAuthenticationObject: (SecondaryAuthenticationProps) =
  JSON.parse(
    window.decodeURIComponent(
      window.localStorage.getItem("secondary_authentication") as string
    )
  ) as (SecondaryAuthenticationProps);

  console.log(secondaryAuthenticationObject)

function App() {
  return !window.navigator.onLine ? (
    <secondaryAuthenticationObjectContext.Provider
      value={secondaryAuthenticationObject as Required<Readonly<SecondaryAuthenticationProps>>}
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
          path={`/${String(
        secondaryAuthenticationObject?.data?.username ? secondaryAuthenticationObject?.data?.username.replace(" ", "") : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}/dashboard`}
          element={
            (secondaryAuthenticationObject as Required<Readonly<SecondaryAuthenticationProps>>) &&
            (primaryAuthenticationObject as Required<Readonly<primaryAuthenticationObjectProps>>) ? (
              <DashboardHomePageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        <Route
          path={`/dashboard`}
          element={
            (secondaryAuthenticationObject as Required<Readonly<SecondaryAuthenticationProps>>) &&
            (primaryAuthenticationObject as Required<Readonly<primaryAuthenticationObjectProps>>) ? (
              <DashboardHomePageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        <Route
          path={`/${String(
        secondaryAuthenticationObject?.data?.username ? secondaryAuthenticationObject?.data?.username.replace(" ", "") : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}/saved/links`}
          element={
            (secondaryAuthenticationObject as Required<Readonly<SecondaryAuthenticationProps>>) &&
            (primaryAuthenticationObject as Required<Readonly<primaryAuthenticationObjectProps>>) ? (
              <DashboardLinksPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        <Route
          path={`/${String(
        secondaryAuthenticationObject?.data?.username ? secondaryAuthenticationObject?.data?.username.replace(" ", "") : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}/links/trash`}
          element={
            (secondaryAuthenticationObject as Required<Readonly<SecondaryAuthenticationProps>>) &&
            (primaryAuthenticationObject as Required<Readonly<primaryAuthenticationObjectProps>>) ? (
              <DashboardTrashPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        <Route
          path={`/${String(
        secondaryAuthenticationObject?.data?.username ? secondaryAuthenticationObject?.data?.username.replace(" ", "") : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}/settings`}
          element={
            (secondaryAuthenticationObject as Required<Readonly<SecondaryAuthenticationProps>>) &&
            (primaryAuthenticationObject as Required<Readonly<primaryAuthenticationObjectProps>>) ? (
              <DashboardSettingsPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        <Route
          path={`/app/info`}
          element={
            (secondaryAuthenticationObject as Required<Readonly<SecondaryAuthenticationProps>>) &&
            (primaryAuthenticationObject as Required<Readonly<primaryAuthenticationObjectProps>>) ? (
              <DashboardInformationPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        <Route
          path="/admin/account/login"
          element={
            (primaryAuthenticationObject as Required<Readonly<primaryAuthenticationObjectProps>>) ? (
              <primaryAuthenticationObjectContext.Provider
                value={
                  primaryAuthenticationObject as Required<Readonly<primaryAuthenticationObjectProps>>
                }
              >
                <AdminAccountLoginPageElementsComponent />
              </primaryAuthenticationObjectContext.Provider>
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        <Route
          path="/admin/account/subscription"
          element={
            (secondaryAuthenticationObject as Required<Readonly<SecondaryAuthenticationProps>>) &&
            (primaryAuthenticationObject as Required<Readonly<primaryAuthenticationObjectProps>>) ? (
              <primaryAuthenticationObjectContext.Provider
                value={
                  primaryAuthenticationObject as Required<Readonly<primaryAuthenticationObjectProps>>
                }
              >
                <AdminAccountSubscriptionPageElementsComponent />
              </primaryAuthenticationObjectContext.Provider>
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        <Route
          path="/admin/account/signup"
          element={
            (secondaryAuthenticationObject as Required<Readonly<SecondaryAuthenticationProps>>) ||
            (primaryAuthenticationObject as Required<Readonly<primaryAuthenticationObjectProps>>) ? (
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
    </secondaryAuthenticationObjectContext.Provider>
  ) : (
    <OfflinePageElementsComponent />
  );
}

export default App;
