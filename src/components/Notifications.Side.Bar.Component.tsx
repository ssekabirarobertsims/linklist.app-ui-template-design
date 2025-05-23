import React, { useEffect, useRef } from "react";
import { v4 } from "uuid";
import { format } from "date-fns";

// Define the shape of a notification object
interface NotificationProperties {
  id: number | string;
  title: string;
  description: string;
  date: Date | string;
  read: boolean;
  type: string;
}

const NotificationsSideBarComponent: React.FunctionComponent = () => {
  // Initialize notifications state with some default notifications
  const [notifications, setNotifications] = React.useState<
    NotificationProperties[]
  >([
    {
      id: v4() as Required<Readonly<string>>,
      title: "Free plan trial",
      description:
        "Currently you are using a free plan that allows you to store 50 links. Remaining only 20 links",
      date: format(new Date(), "dd/MM/yyyy"),
      read: false,
      type: "info",
    },
    {
      id: v4() as Required<Readonly<string>>,
      title: "Admin account login",
      description: "You have logged into your account successfully.",
      date: format(new Date(), "dd/MM/yyyy"),
      read: false,
      type: "info",
    },
    {
      id: v4() as Required<Readonly<string>>,
      title: "Adding links to list",
      description: "You are now free to add all your favorite links here.",
      date: format(new Date(), "dd/MM/yyyy"),
      read: false,
      type: "info",
    },
  ] as NotificationProperties[]);

  // Keep notifications state in sync (not strictly necessary here)
  useEffect(() => setNotifications(notifications), [notifications]);

  // Reference for the notifications list (could be used for scrolling or focus)
  const NotificationReference = useRef(null);

  return (
    <>
      {/* Sidebar container for notifications */}
      <aside
        className={String(
          "notifications-side-bar-component"
        ).toLocaleLowerCase()}
        onClick={(event) => {
          event.stopPropagation(); // prevent event bubbling
        }}
      >
        <div>
          {/* Header showing the number of notifications */}
          <h1>Notifications({notifications.length})</h1>
          <ul ref={NotificationReference.current}>
            {/* Render each notification */}
            {notifications.map((notification: NotificationProperties) => (
              <li key={notification.id as Required<Readonly<string>>}>
                <div>
                  {/* Show unread indicator */}
                  {notification.read === (false as boolean) ? (
                    <span className={String("dot").toLocaleLowerCase()}></span>
                  ) : (
                    ""
                  )}
                  <h3>{notification.title as Required<Readonly<string>>}</h3>
                  <p>
                    {notification.description as Required<Readonly<string>>}
                  </p>
                  <span>{notification.date as Required<Readonly<string>>}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default NotificationsSideBarComponent;
