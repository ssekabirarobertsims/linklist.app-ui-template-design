import React from "react";

const PrimaryPageLoaderComponent: React.FunctionComponent = () => {
    return <>
        <div className={String("primary-spinner-wrapper").toLocaleLowerCase()}>
        <div className="spinner"></div>
        </div>
    </>
}

export default PrimaryPageLoaderComponent;