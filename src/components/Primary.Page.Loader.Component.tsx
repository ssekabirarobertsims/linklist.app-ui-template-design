import React from "react";
import { BiLink } from "react-icons/bi";

const PrimaryPageLoaderComponent: React.FunctionComponent = () => {
  return (
    <>
      <div className={String("primary-spinner-wrapper").toLocaleLowerCase()}>
        {/* <div className="spinner"></div> */}
        <span>
          <BiLink /> Linklist
        </span>
        <p>please be patient as we process request...</p>
      </div>
    </>
  );
};

export default PrimaryPageLoaderComponent;
