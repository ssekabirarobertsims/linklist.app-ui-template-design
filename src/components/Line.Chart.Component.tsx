import React, { useEffect, useState } from "react";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";

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

type ListItemProperties = {
	id: string;
	title: string;
	link: string;
	admin_id: string;
	date_created: string;
};

import axios from "axios";


import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function LinksCreatedChart() {
	const currentAdmin = React.useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;
		const [savedLinksList, setSavedLinksList] = useState<ListItemProperties[]>([]);
	
		useEffect(() => {
				(async function fetchSavedLinks() {
					try {
						const { data: response } = await axios.get("http://localhost:3000/saved/links", {
							headers: {
								Authorization: `Bearer ${currentAdmin?.data?.token}`,
								"Content-Type": "application/json",
							},
						});
		
						const links: ListItemProperties[] = response?.saved_links || [];
						setSavedLinksList(
							links.filter((item) => item.admin_id === currentAdmin?.data?.id)
						);
					} catch (error) {
						console.error("Error fetching links:", error);
					}
				})();
			}, [currentAdmin?.data?.token, currentAdmin?.data?.id]);

// Group links by date and count them
const chartData = React.useMemo(() => {
  const counts: { [date: string]: number } = {};
  savedLinksList.forEach((item) => {
    // Format the date as needed, e.g., 'YYYY-MM-DD' or a readable format
    const date = new Date(item.date_created).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    counts[date] = (counts[date] || 0) + 1;
  });
  // Convert to array for recharts
  return Object.entries(counts).map(([date, links]) => ({ date, links }));
}, [savedLinksList]);

  return (
	<div className='chart-container'>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="links" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </div>

  );
}
