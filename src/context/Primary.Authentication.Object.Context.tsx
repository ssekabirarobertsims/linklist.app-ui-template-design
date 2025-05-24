import React from "react";

// Retrieve the primary authentication data from localStorage
const data: string = window.localStorage.getItem(
  "primary_authentication"
) as string;

// Define the shape of the primary authentication object
interface PrimaryAuthenticationProps {
  username: string;
  avatar: string;
  email: string;
}

// Parse and decode the authentication object from localStorage
const PrimaryAuthenticationObject: object | PrimaryAuthenticationProps =
  JSON.parse(window.decodeURIComponent(data as string)) as
    | object
    | PrimaryAuthenticationProps;

// Create a React context with the parsed authentication object as the default value
const PrimaryAuthenticationObjectContext: React.Context<object> =
  React.createContext(PrimaryAuthenticationObject);

// Export the context for use in other components
export default PrimaryAuthenticationObjectContext;
