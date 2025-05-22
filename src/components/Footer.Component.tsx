import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

type ListItemProperties = {
    id: string;
    content: string;
    link: string;
};

const FooterComponent: React.FunctionComponent = () => {
    const [list, setList] = useState<ListItemProperties[]>([
        {
            id: uuidV4(),
            content: "about",
            link: "/app/info",
        },
    ]);

     useEffect(() => {
            setList(list);
        }, [list]);

    return (
        <footer className="footer">
            <div>
                <ul>
                    {list.map((item) => (
                        <li key={item.id}>
                            <Link to={item.link}>{item.content}</Link>
                        </li>
                    ))}
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
                <p>
                    Linklist &copy; {new Date().getFullYear()} All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default FooterComponent;