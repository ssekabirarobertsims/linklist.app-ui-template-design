import React, { ReactNode, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

// Define the type for sidebar navigation items
type ListItemProperties = {
  id: string;
  content: string;
  icon: ReactNode;
  link: string;
  query?: string;
};

import { BiHome } from "react-icons/bi";
import { GrDashboard } from "react-icons/gr";
import { Link } from "react-router-dom";
// import { LuLogOut } from "react-icons/lu";
import { IoInformation } from "react-icons/io5";
import { RiLinksFill } from "react-icons/ri";

interface SecondaryAuthenticationProps {
  date: string;
  message: string;
  request_id: string;
  status_code: string;
  data: {
    id: string;
    username: string;
    avatar: string;
    email: string;
    token: string;
    subscribed: string;
    verified: string;
  };
}

import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";
import { FaRegTrashAlt } from "react-icons/fa";
// import { IoSettingsSharp } from "react-icons/io5";
import { MdSubscriptions } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

const DashboardPageSideBarComponent: React.FunctionComponent = () => {
  // Get the current admin's authentication data from context
  const currentAdmin: SecondaryAuthenticationProps = React.useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;

  // Sidebar navigation list, dynamically generates links based on admin username
  const [list, setList] = useState<ListItemProperties[]>([
    {
      id: uuidV4(),
      content: "Home",
      icon: <BiHome />,
      link: "/",
    },
    {
      id: uuidV4(),
      content: "Dashboard",
      icon: <GrDashboard />,
      link: `/${String(
        currentAdmin?.data?.username
          ? currentAdmin?.data?.username.replace(" ", "")
          : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}/dashboard`,
      query: `admin=${String(
        currentAdmin?.data?.username
          ? currentAdmin?.data?.username.replace(" ", "")
          : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}`,
    },
    {
      id: uuidV4(),
      content: "Saved Links",
      icon: <RiLinksFill />,
      link: `/${String(
        currentAdmin?.data?.username
          ? currentAdmin?.data?.username.replace(" ", "")
          : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}/saved/links`,
      query: `admin=${String(
        currentAdmin?.data?.username
          ? currentAdmin?.data?.username.replace(" ", "")
          : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}`,
    },
    {
      id: uuidV4(),
      content: "Trashed Links",
      icon: <FaRegTrashAlt />,
      link: `/${String(
        currentAdmin?.data?.username
          ? currentAdmin?.data?.username.replace(" ", "")
          : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}/links/trash`,
      query: `admin=${String(
        currentAdmin?.data?.username
          ? currentAdmin?.data?.username.replace(" ", "")
          : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}`,
    },
    {
      id: uuidV4(),
      content: "Subscription",
      icon: <MdSubscriptions />,
      link: `/account/subscription/plans`,
      query: `admin=${String(
        currentAdmin?.data?.username
          ? currentAdmin?.data?.username.replace(" ", "")
          : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}`,
    },
    {
      id: uuidV4(),
      content: "About Linklist",
      icon: <IoInformation />,
      link: `/app/info`,
      query: `admin=${String(
        currentAdmin?.data?.username
          ? currentAdmin?.data?.username.replace(" ", "")
          : "admin"
      )
        .toLocaleLowerCase()
        .replace(" ", "")}`,
    },
  ] as ListItemProperties[]);

  // Keep the sidebar list in sync (not strictly necessary here)
  useEffect(() => setList(list), [list]);

  // Render the sidebar navigation and upgrade prompt
  return (
    <>
      {/* Sidebar container */}
      <aside
        className={String(
          "dashboard-page-side-bar-component"
        ).toLocaleLowerCase()}
      >
        <div>
          <ul
            className={String(
              "dashboard-page-side-bar-component-ul-list"
            ).toLocaleLowerCase()}
          >
            {/* Render each navigation item */}
            {list.map((item: ListItemProperties) => (
              <li key={item.id}>
                <Link
                  to={{
                    pathname: item.link as Required<Readonly<string>>,
                    search: item.query ? item.query : "",
                  }}
                >
                  <span>{item.icon as ReactNode}</span>
                  <p>{item.content as Required<Readonly<string>>}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Upgrade plan prompt at the bottom of the sidebar */}
        <article>
          <div>
            <p>50 links remaining on your free plan</p>
            <Link
              to={{
                pathname: `/${String(
                  currentAdmin?.data?.username
                    ? currentAdmin?.data?.username.replace(" ", "")
                    : "admin"
                )
                  .toLocaleLowerCase()
                  .replace(" ", "")}/account/subscription/plans`,
                search: `admin=${String(
                  currentAdmin?.data?.username
                    ? currentAdmin?.data?.username.replace(" ", "")
                    : "admin"
                )
                  .toLocaleLowerCase()
                  .replace(" ", "")}`,
              }}
            >
              Upgrade plan
              <BsArrowRight />
            </Link>
          </div>
        </article>
      </aside>
    </>
  );
};

export default DashboardPageSideBarComponent;
