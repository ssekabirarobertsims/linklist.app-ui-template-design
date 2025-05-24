import React from "react";
import SecondaryAuthenticationObjectContext from "../../context/Secondary.Authentication.Object.Context";
import { Link } from "react-router-dom";

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

import { MdSubscriptions } from "react-icons/md";

const AdminAccountSubscriptionAlertMessageComponent: React.FunctionComponent =
  () => {
    const currentAdmin = React.useContext(
      SecondaryAuthenticationObjectContext
    ) as SecondaryAuthenticationProps;

    // Check if the admin is verified
    const isVerified = currentAdmin?.data?.subscribed === "true";

    if (isVerified) {
      return null; // Return null if the admin is verified
    }

    return (
      <article
        className="admin-account-subscription-alert-message"
        onClick={(event) => event.stopPropagation()} // prevent event bubbling
      >
        <div>
          <div id="_wrapper">
            <span>
              <MdSubscriptions />
            </span>
            <h3>Admin account subscription</h3>
            <p>
              Make sure to subscribe to our subscription plan to unlock all
              features and benefits of LinkList.
            </p>
            <Link
              to={{
                pathname: "/account/subscription/plans",
              }}
            >
              <button type="button">Make subscription</button>
            </Link>
          </div>
        </div>
      </article>
    );
  };

export default AdminAccountSubscriptionAlertMessageComponent;
