import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

// Define the type for footer list items
type ListItemProperties = {
  id: string;
  content: string;
  link: string;
};

const FooterComponent: React.FunctionComponent = () => {
  // Initialize the footer links list with a single "about" item
  const [list, setList] = useState<ListItemProperties[]>([
    {
      id: uuidV4(),
      content: "about",
      link: "/app/info",
    },
  ]);

  // Effect to update the list if it ever changes (not necessary here, but included for future extensibility)
  useEffect(() => {
    setList(list);
  }, [list]);

  // Render the footer with navigation links and copyright
  return (
    <footer className="footer">
      <div>
        <ul>
          {/* Render internal navigation links */}
          {list.map((item) => (
            <li key={item.id}>
              <Link to={item.link}>{item.content}</Link>
            </li>
          ))}
          {/* Render external resource links */}
          <li>
            <a
              href="https://github.com/ssekabirarobertsims/linklist.app-ui-template-design"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
          </li>
          <li>
            <a
              href="https://ssekabirarobertsims.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              developer
            </a>
          </li>
          <li>
            <a
              href="https://api-linklist-restapi.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              api
            </a>
          </li>
        </ul>
        {/* Copyright notice with dynamic year */}
        <p>Linklist &copy; {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
