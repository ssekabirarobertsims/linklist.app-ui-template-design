import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

type ListItemProperties = {
  id: string;
  content: string;
  link: string;
};

import { BiLink } from "react-icons/bi";

const LandingHomePageFooterComponent: React.FunctionComponent = () => {
  const [list, setList] = useState<ListItemProperties[]>([
    {
      id: uuidV4(),
      content: "about",
      link: "/dashboard/app/info",
    },
    {
      id: uuidV4(),
      content: "signup",
      link: "/admin/account/signup",
    },
    {
      id: uuidV4(),
      content: "login",
      link: "/admin/account/login",
    },
  ]);

  useEffect(() => {
    setList(list);
  }, [list]);

  return (
    <footer className="landing-page-footer-component">
      <div className="footer-content-wrapper">
        <article>
          <span>
            <BiLink /> Linklist
          </span>
          <p>
            Linklist is a simple and easy to use link management tool that
            allows you to create, manage and share your links with ease. It is
            designed to help you organize your links in a way that makes sense
            to you, so you can find them quickly and easily.
          </p>
        </article>
        <article>
          <span>Resources</span>
          <ul>
            {list.map((item) => (
              <li key={item.id}>
                <Link to={item.link}>{item.content}</Link>
              </li>
            ))}
          </ul>
        </article>
        <article>
          <span>More links</span>
          <ul>
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
            <li>
              <a
                href="https://github.com/ssekabirarobertsims/linklist.app-ui-template-design"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
            </li>
          </ul>
        </article>
      </div>
      <div className="footer-copyright-wrapper">
        <p>Linklist &copy; {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default LandingHomePageFooterComponent;

/*
<ul>
                    {list.map((item) => (
                        <li key={item.id}>
                            <Link to={item.link}>{item.content}</Link>
                        </li>
                    ))}
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
*/
