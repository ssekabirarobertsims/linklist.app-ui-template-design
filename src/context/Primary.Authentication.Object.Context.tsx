import React from "react";
const data: string = window.localStorage.getItem("primary_authentication") as string;

interface PrimaryAuthenticationProps {
    username: string;
    avatar: string; 
    email: string;
} 

const PrimaryAuthenticationObject: (object | PrimaryAuthenticationProps) = JSON.parse(window.decodeURIComponent(data as string)) as (object | PrimaryAuthenticationProps);
const PrimaryAuthenticationObjectContext: React.Context<object> = React.createContext(PrimaryAuthenticationObject);

export default PrimaryAuthenticationObjectContext;