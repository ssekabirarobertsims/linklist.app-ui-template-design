import React from "react";

const PrimaryPageLoaderComponent: React.FunctionComponent = () => {
    return <>
        <div className={String("primary-spinner-wrapper").toLocaleLowerCase()}>
            <div className="spinner"></div>
            <span>Please be patient as we process request!</span>
        </div>
    </>
}

export default PrimaryPageLoaderComponent;