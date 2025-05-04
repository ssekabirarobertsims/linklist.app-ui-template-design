import React from "react";
const data: string = window.localStorage.getItem("secondary_authentication") as string;

interface SecondaryAuthenticationProperties {
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
    } 
}

const SecondaryAuthenticationObject: (object | SecondaryAuthenticationProperties) = JSON.parse(window.decodeURIComponent(data as string)) as (object | SecondaryAuthenticationProperties);
const SecondaryAuthenticationObjectContext: React.Context<object> = React.createContext(SecondaryAuthenticationObject);

export default SecondaryAuthenticationObjectContext;