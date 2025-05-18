import React, { ReactNode, useEffect, useState } from "react";
import { v4 } from "uuid";

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
import { IoSettingsSharp } from "react-icons/io5";

const PrimeSideBarComponent: React.FunctionComponent = () => {
  const currentAdmin: SecondaryAuthenticationProps = React.useContext(
	SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;

  const [list, setList] = useState<ListItemProperties[]>([
	{
	  id: v4(),
	  content: "Home",
	  icon: <BiHome />,
	  link: "/",
	},
	{
	  id: v4(),
	  content: "Dashboard",
	  icon: <GrDashboard />,
	  link: `/dashboard`,
	  query: `admin=${String(
		currentAdmin?.data?.username ? currentAdmin?.data?.username : "admin"
	  )
		.toLocaleLowerCase()
		.replace(" ", "")}`,
	},
	{
	  id: v4(),
	  content: "Saved Links",
	  icon: <RiLinksFill />,
	  link: `/dashboard/saved/links`,
	  query: `admin=${String(
		currentAdmin?.data?.username ? currentAdmin?.data?.username : "admin"
	  )
		.toLocaleLowerCase()
		.replace(" ", "")}`,
	},
	{
	  id: v4(),
	  content: "Trashed Links",
	  icon: <FaRegTrashAlt />,
	  link: `/dashboard/links/trash`,
	  query: `admin=${String(
		currentAdmin?.data?.username ? currentAdmin?.data?.username : "admin"
	  )
		.toLocaleLowerCase()
		.replace(" ", "")}`,
	},
	{
	  id: v4(),
	  content: "Settings",
	  icon: <IoSettingsSharp />,
	  link: `/dashboard/settings`,
	  query: `admin=${String(
		currentAdmin?.data?.username ? currentAdmin?.data?.username : "admin"
	  )
		.toLocaleLowerCase()
		.replace(" ", "")}`,
	},
	{
	  id: v4(),
	  content: "About Linklist",
	  icon: <IoInformation />,
	  link: `/dashboard/app/info`,
	  query: `admin=${String(
		currentAdmin?.data?.username ? currentAdmin?.data?.username : "admin"
	  )
		.toLocaleLowerCase()
		.replace(" ", "")}`,
	},
  ] as ListItemProperties[]);
  useEffect(() => setList(list), [list]);

  return (
	<>
	  <aside
		className={String(
		  "prime-side-bar-component"
		).toLocaleLowerCase()}
	  >
		<div>
		  <ul
			className={String(
			  "dashboard-page-side-bar-component-ul-list"
			).toLocaleLowerCase()}
		  >
			{list.map((item: ListItemProperties) => (
			  <li key={item.id}>
				<Link
				  to={{
					pathname: item.link as Required<Readonly<string>>,
					search: item.query ? item.query : "",
				  }}
				>
				  <span>{item.icon as ReactNode}</span>
				</Link>
			  </li>
			))}
		  </ul>
		</div>
	  </aside>
	</>
  );
};

export default PrimeSideBarComponent;
