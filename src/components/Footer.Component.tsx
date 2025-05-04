import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

type ListItemProperties = {
    id: string;
    content: string;
    link: string;
}

const FooterComponent: React.FunctionComponent = () => {
    const [list, setList] = useState<ListItemProperties[]>([
        {
            id: v4() as string,
            content: "about",
            link: ""
        },
        
    ] as ListItemProperties[]);
    useEffect(() => setList(list), [list]);

    return <>
        <footer className={String("dashboard-page-footer-component").toLocaleLowerCase()}>
            <div>
                <ul>
                    {
                        list.map((item: ListItemProperties) => (
                            <li key={item.id}>
                                <Link to={{
                                    pathname: item.link as string,
                            }}>
                                {
                                    item.content as string
                                }
                            </Link>
                            </li>
                        ))
                    }
                    <li>
                        <a href="https://ssekabirarobertsims.netlify.app/" target="_blank">developer</a>
                    </li>
                    <li>
                        <a href="https://api-linklist-restapi.onrender.com" target="_blank">api</a>
                    </li>
                </ul>
                    <p>. Linklist &copy;right {Number(2025 as number)} All Rights Reserved</p>
            </div>
        </footer>
    </>
}

export default FooterComponent;