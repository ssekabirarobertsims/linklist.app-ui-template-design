import React, { useEffect, useState } from "react";
import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";

// Define the shape of the admin authentication object from context
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

// Define the shape of a saved link item
type ListItemProperties = {
  id: string;
  title: string;
  link: string;
  admin_id: string;
  date_created: string;
};

import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function LinksCreatedChart() {
  // Get the current admin's authentication data from context
  const currentAdmin = React.useContext(
    SecondaryAuthenticationObjectContext
  ) as SecondaryAuthenticationProps;
  // State to hold the list of saved links for the current admin
  const [savedLinksList, setSavedLinksList] = useState<ListItemProperties[]>(
    []
  );

  // Fetch saved links from the server when the admin's token or id changes
  useEffect(() => {
    (async function fetchSavedLinks() {
      try {
        const { data: response } = await axios.get(
          "https://api-linklist-restapi.onrender.com/saved/links",
          {
            headers: {
              Authorization: `Bearer ${currentAdmin?.data?.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        // Filter links to only include those belonging to the current admin
        const links: ListItemProperties[] = response?.saved_links || [];
        setSavedLinksList(
          links.filter((item) => item.admin_id === currentAdmin?.data?.id)
        );
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    })();
  }, [currentAdmin?.data?.token, currentAdmin?.data?.id]);

  // Group links by date and count them for charting
  const chartData = React.useMemo(() => {
    const counts: { [date: string]: number } = {};
    savedLinksList.forEach((item) => {
      // Format the date as 'Mon DD'
      const date = new Date(item.date_created).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      counts[date] = (counts[date] || 0) + 1;
    });
    // Convert to array for recharts
    return Object.entries(counts).map(([date, links]) => ({ date, links }));
  }, [savedLinksList]);

  // Render the responsive line chart with the processed data
  return (
    <div className="chart-container">
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
