import React, { ReactNode, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

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

const PrimeSideBarComponent: React.FunctionComponent = () => {
  const currentAdmin: SecondaryAuthenticationProps = React.useContext(
	SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;

  const [list, setList] = useState<ListItemProperties[]>([
		{
		  id: uuidV4(),
		  content: "home",
		  icon: <BiHome />,
		  link: "/",
		},
		{
		  id: uuidV4(),
		  content: "dashboard",
		  icon: <GrDashboard />,
		  link: `/${String(
			currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
		  )
			.toLocaleLowerCase()
			.replace(" ", "")}/dashboard`,
		  query: `admin=${String(
			currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
		  )
			.toLocaleLowerCase()
			.replace(" ", "")}`,
		},
		{
		  id: uuidV4(),
		  content: "links",
		  icon: <RiLinksFill />,
		  link: `/${String(
			currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
		  )
			.toLocaleLowerCase()
			.replace(" ", "")}/saved/links`,
		  query: `admin=${String(
			currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
		  )
			.toLocaleLowerCase()
			.replace(" ", "")}`,
		},
		{
		  id: uuidV4(),
		  content: "trash",
		  icon: <FaRegTrashAlt />,
		  link: `/${String(
			currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
		  )
			.toLocaleLowerCase()
			.replace(" ", "")}/links/trash`,
		  query: `admin=${String(
			currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
		  )
			.toLocaleLowerCase()
			.replace(" ", "")}`,
		},
		{
			  id: uuidV4(),
			  content: "Subscription",
			  icon: <MdSubscriptions />,
			  link: `/${String(
				currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
			  )
				.toLocaleLowerCase()
				.replace(" ", "")}/account/subscription`,
			  query: `admin=${String(
				currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
			  )
				.toLocaleLowerCase()
				.replace(" ", "")}`,
			},
		{
		  id: uuidV4(),
		  content: "about",
		  icon: <IoInformation />,
		  link: `/app/info`,
		  query: `admin=${String(
			currentAdmin?.data?.username ? currentAdmin?.data?.username.replace(" ", "") : "admin"
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
				  <p>{item.content as Required<string>}</p>
			  </li>
			))}
		  </ul>
		</div>
	  </aside>
	</>
  );
};

export default PrimeSideBarComponent;
