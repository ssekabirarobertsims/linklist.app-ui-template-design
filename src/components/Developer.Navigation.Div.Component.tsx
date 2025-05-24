import React, { useRef } from "react";

const SiteDeveloperNavigationComponent: React.FC = () => {
  const photosRef = useRef<HTMLImageElement>(null);

  return (
    <div
      className="site-developer-navigation-component"
      title="Get helped out by our expert software engineer about all your needs."
    >
      <p>Need some little help!</p>
      <a
        href="http://ssekabirarobertsims.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/photos/ssekabirarobertsims-2.png"
          alt="Developer's profile"
          ref={photosRef}
        />
      </a>
    </div>
  );
};

export default SiteDeveloperNavigationComponent;
