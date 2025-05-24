import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";

// defined props types for the current admin object
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

const SettingsButtonLinkComponent: React.FunctionComponent = () => {
  // Ref for the settings button (could be used for focus or other DOM operations)
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Get the current admin's authentication data from context
  const currentAdmin = React.useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;

  // Render a Link that navigates to the settings page for the current admin
  return (
    <Link
      to={{
        pathname: `/${String(
          currentAdmin?.data?.username
            ? currentAdmin?.data?.username.replace(" ", "")
            : "admin"
        )
          .toLocaleLowerCase()
          .replace(" ", "")}/settings`,
        search: `admin=${String(
          currentAdmin?.data?.username
            ? currentAdmin?.data?.username.replace(" ", "")
            : "admin"
        )
          .toLocaleLowerCase()
          .replace(" ", "")}`,
      }}
      className="settings-button"
    >
      {/* Settings icon button */}
      <button type="button" title="settings" ref={buttonRef}>
        <CiSettings />
      </button>
    </Link>
  );
};

export default SettingsButtonLinkComponent;
