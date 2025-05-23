import { Routes, Route } from "react-router-dom";
import LandingHomePageElementsComponent from "./pages/Landing.Home.Page";
import DashboardHomePageElementsComponent from "./pages/Dashboard.Home.Page";
import AdminAccountLoginPageElementsComponent from "./pages/Admin.Account.Login.Page";
import AdminAccountSignupPageElementsComponent from "./pages/Admin.Account.Signup.Page";
import DashboardSettingsPageElementsComponent from "./pages/Dashboard.Settings.Page";
import DashboardInformationPageElementsComponent from "./pages/Dashboard.Information.Page";
import DashboardLinksPageElementsComponent from "./pages/Dashboard.Links.Page";
import AdminAccountVerificationPageElementsComponent from "./pages/Admin.Account.Verification.Page";
import removeElement from "./functions/Remove.Element.Function";

// Global click handler to close sidebars if open
try {
  window.document.body.addEventListener("click", (event) => {
    event.stopPropagation(); // prevent event bubbling

    // Remove notifications sidebar if present
    removeElement(
      window.document.querySelector(
        ".notifications-side-bar-component"
      ) as Required<HTMLElement>
    );

    // Remove admin profile review sidebar if present
    removeElement(
      window.document.querySelector(
        ".admin-account-profile-review-side-bar"
      ) as Required<HTMLElement>
    );
  });
} catch (error) {
  // catch error and return it
  (async function (): Promise<unknown> {
    return error;
  })();
}

// Define types for authentication objects
interface primaryAuthenticationObjectProps {
  // props for the primary auth obj about admin
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
    id: string;
    username: string;
    avatar: string;
    email: string;
    token: string;
    subscribed: string;
    verified: string;
  };
}

// Import authentication contexts and additional pages
import primaryAuthenticationObjectContext from "./context/Primary.Authentication.Object.Context";
import secondaryAuthenticationObjectContext from "./context/Secondary.Authentication.Object.Context";
import OfflinePageElementsComponent from "./pages/Offline.Page";
import DashboardTrashPageElementsComponent from "./pages/Dashboard.Trash.Page";
import SubscriptionPaymentPlansPageContentComponent from "./pages/Subscription.Payment.Plans.Page";
import FreeAdminAccountSubscriptionPaymentPageElementsComponent from "./pages/Free.Subscription.Payment.Plan.Page";
import AdminAccountSubscriptionStatusPageElementsComponent from "./pages/Admin.Account.Subscription.Status.Page";

// Parse authentication objects from localStorage
const primaryAuthenticationObject: primaryAuthenticationObjectProps =
  JSON.parse(
    window.decodeURIComponent(
      window.localStorage.getItem("primary_authentication") as string
    )
  ) as primaryAuthenticationObjectProps;
const secondaryAuthenticationObject: SecondaryAuthenticationProps = JSON.parse(
  window.decodeURIComponent(
    window.localStorage.getItem("secondary_authentication") as string
  )
) as SecondaryAuthenticationProps;

function App() {
  // If user is online, render the app; otherwise, show offline page
  return window.navigator.onLine ? (
    <secondaryAuthenticationObjectContext.Provider
      value={
        secondaryAuthenticationObject as Required<
          Readonly<SecondaryAuthenticationProps>
        >
      }
    >
      <Routes>
        {/* Public landing routes */}
        <Route index element={<LandingHomePageElementsComponent />} />
        <Route path="/" element={<LandingHomePageElementsComponent />} />
        <Route path="/home" element={<LandingHomePageElementsComponent />} />
        <Route
          path="/home/page"
          element={<LandingHomePageElementsComponent />}
        />

        {/* Dashboard home route, protected by authentication */}
        <Route
          path={`/${String(
            secondaryAuthenticationObject?.data?.username
              ? secondaryAuthenticationObject?.data?.username.replace(" ", "")
              : "admin"
          )
            .toLocaleLowerCase()
            .replace(" ", "")}/dashboard`}
          element={
            (secondaryAuthenticationObject as Required<
              Readonly<SecondaryAuthenticationProps>
            >) &&
            (primaryAuthenticationObject as Required<
              Readonly<primaryAuthenticationObjectProps>
            >) ? (
              <DashboardHomePageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        {/* Fallback dashboard route */}
        <Route
          path={`/dashboard`}
          element={
            (secondaryAuthenticationObject as Required<
              Readonly<SecondaryAuthenticationProps>
            >) &&
            (primaryAuthenticationObject as Required<
              Readonly<primaryAuthenticationObjectProps>
            >) ? (
              <DashboardHomePageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        {/* Saved links route */}
        <Route
          path={`/${String(
            secondaryAuthenticationObject?.data?.username
              ? secondaryAuthenticationObject?.data?.username.replace(" ", "")
              : "admin"
          )
            .toLocaleLowerCase()
            .replace(" ", "")}/saved/links`}
          element={
            (secondaryAuthenticationObject as Required<
              Readonly<SecondaryAuthenticationProps>
            >) &&
            (primaryAuthenticationObject as Required<
              Readonly<primaryAuthenticationObjectProps>
            >) ? (
              <DashboardLinksPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        {/* Trashed links route */}
        <Route
          path={`/${String(
            secondaryAuthenticationObject?.data?.username
              ? secondaryAuthenticationObject?.data?.username.replace(" ", "")
              : "admin"
          )
            .toLocaleLowerCase()
            .replace(" ", "")}/links/trash`}
          element={
            (secondaryAuthenticationObject as Required<
              Readonly<SecondaryAuthenticationProps>
            >) &&
            (primaryAuthenticationObject as Required<
              Readonly<primaryAuthenticationObjectProps>
            >) ? (
              <DashboardTrashPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        {/* Settings route */}
        <Route
          path={`/${String(
            secondaryAuthenticationObject?.data?.username
              ? secondaryAuthenticationObject?.data?.username.replace(" ", "")
              : "admin"
          )
            .toLocaleLowerCase()
            .replace(" ", "")}/settings`}
          element={
            (secondaryAuthenticationObject as Required<
              Readonly<SecondaryAuthenticationProps>
            >) &&
            (primaryAuthenticationObject as Required<
              Readonly<primaryAuthenticationObjectProps>
            >) ? (
              <DashboardSettingsPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        {/* Info/about route */}
        <Route
          path={`/app/info`}
          element={
            (secondaryAuthenticationObject as Required<
              Readonly<SecondaryAuthenticationProps>
            >) &&
            (primaryAuthenticationObject as Required<
              Readonly<primaryAuthenticationObjectProps>
            >) ? (
              <DashboardInformationPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        {/* Login route */}
        <Route
          path="/admin/account/login"
          element={
            (primaryAuthenticationObject as Required<
              Readonly<primaryAuthenticationObjectProps>
            >) ? (
              <primaryAuthenticationObjectContext.Provider
                value={
                  primaryAuthenticationObject as Required<
                    Readonly<primaryAuthenticationObjectProps>
                  >
                }
              >
                <AdminAccountLoginPageElementsComponent />
              </primaryAuthenticationObjectContext.Provider>
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        {/* Subscription status route */}
        <Route
          path={`/${String(
            secondaryAuthenticationObject?.data?.username
              ? secondaryAuthenticationObject?.data?.username.replace(" ", "")
              : "admin"
          )
            .toLocaleLowerCase()
            .replace(" ", "")}/account/subscription/status`}
          element={
            (secondaryAuthenticationObject as Required<
              Readonly<SecondaryAuthenticationProps>
            >) &&
            (primaryAuthenticationObject as Required<
              Readonly<primaryAuthenticationObjectProps>
            >) ? (
              <primaryAuthenticationObjectContext.Provider
                value={
                  primaryAuthenticationObject as Required<
                    Readonly<primaryAuthenticationObjectProps>
                  >
                }
              >
                <AdminAccountSubscriptionStatusPageElementsComponent />
              </primaryAuthenticationObjectContext.Provider>
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        {/* Free plan subscription route */}
        <Route
          path={`/${String(
            primaryAuthenticationObject?.username
              ? primaryAuthenticationObject?.username.replace(" ", "")
              : "admin"
          )
            .toLocaleLowerCase()
            .replace(" ", "")}/account/subscription/free/plan`}
          element={
            (primaryAuthenticationObject as Required<
              Readonly<primaryAuthenticationObjectProps>
            >) ? (
              <primaryAuthenticationObjectContext.Provider
                value={
                  primaryAuthenticationObject as Required<
                    Readonly<primaryAuthenticationObjectProps>
                  >
                }
              >
                <FreeAdminAccountSubscriptionPaymentPageElementsComponent />
              </primaryAuthenticationObjectContext.Provider>
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        {/* Subscription payment plans route */}
        <Route
          path={`/account/subscription/plans`}
          element={
            primaryAuthenticationObject ? (
              <primaryAuthenticationObjectContext.Provider
                value={
                  primaryAuthenticationObject as Required<
                    Readonly<primaryAuthenticationObjectProps>
                  >
                }
              >
                <SubscriptionPaymentPlansPageContentComponent />
              </primaryAuthenticationObjectContext.Provider>
            ) : (
              <AdminAccountSubscriptionStatusPageElementsComponent />
            )
          }
        />

        {/* Subscription payment plans route (with username) */}
        <Route
          path={`/${String(
            secondaryAuthenticationObject?.data?.username
              ? secondaryAuthenticationObject?.data?.username.replace(" ", "")
              : "admin"
          )
            .toLocaleLowerCase()
            .replace(" ", "")}/account/subscription/plans`}
          element={
            primaryAuthenticationObject ? (
              <primaryAuthenticationObjectContext.Provider
                value={
                  primaryAuthenticationObject as Required<
                    Readonly<primaryAuthenticationObjectProps>
                  >
                }
              >
                <SubscriptionPaymentPlansPageContentComponent />
              </primaryAuthenticationObjectContext.Provider>
            ) : (
              <AdminAccountSubscriptionStatusPageElementsComponent />
            )
          }
        />

        {/* Signup route (fallback to login if already authenticated) */}
        <Route
          path="/admin/account/signup"
          element={
            (secondaryAuthenticationObject as Required<
              Readonly<SecondaryAuthenticationProps>
            >) ||
            (primaryAuthenticationObject as Required<
              Readonly<primaryAuthenticationObjectProps>
            >) ? (
              <AdminAccountLoginPageElementsComponent />
            ) : (
              <AdminAccountSignupPageElementsComponent />
            )
          }
        />

        {/* Account verification route */}
        <Route
          path="/admin/account/verification"
          element={<AdminAccountVerificationPageElementsComponent />}
        />
      </Routes>
    </secondaryAuthenticationObjectContext.Provider>
  ) : (
    <OfflinePageElementsComponent />
  );
}

export default App;
