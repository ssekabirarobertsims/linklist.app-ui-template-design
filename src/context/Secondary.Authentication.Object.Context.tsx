import React from "react";

// Retrieve the secondary authentication data from localStorage
const data: string = window.localStorage.getItem(
  "secondary_authentication"
) as string;

// Define the shape of the secondary authentication object
interface SecondaryAuthenticationProperties {
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

// Parse and decode the authentication object from localStorage
const SecondaryAuthenticationObject:
  | object
  | SecondaryAuthenticationProperties = JSON.parse(
  window.decodeURIComponent(data as string)
) as object | SecondaryAuthenticationProperties;

// Create a React context with the parsed authentication object as the default value
const SecondaryAuthenticationObjectContext: React.Context<object> =
  React.createContext(SecondaryAuthenticationObject);

// Export the context for use in other components
export default SecondaryAuthenticationObjectContext;
