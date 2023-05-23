import { Fragment, useState, useEffect } from "react";
import { Outlet, Link, useLocation, NavLink } from "react-router-dom";
import { Dialog, Menu, Transition } from "@headlessui/react";
import checkAuth from "../../guards/checkAuth";
import BasicAxios from "../../helpers/axios/index";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useSelector } from "react-redux";
import styles from "./DashboardLayout.module.scss";
import Notifications from "../Notifications/Notifications";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { notificationActions } from "../../store/Notifications";

import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Disclosure } from "@headlessui/react";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
let rendered = false;

function Dashboard() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [notificationsShow, setNotificationsShow] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const notifications = useSelector(
    (state) => state.notifications.notificationData
  );

  const [notificationData, setNotificationData] = useState(
    notifications ? notifications : []
  );
  const [broadcasted, setBroadcasted] = useState(false);
  const [notLoaded, setNotLoaded] = useState(true);

  const navigation = [
    { name: "დერეფანი", href: "/board/corridor" },
    {
      name: "ტესტები",
      href: "tests",
    },
    // { name: "Projects", href: "#", current: false },
    // { name: "Calendar", href: "#", current: false },
    // { name: "Reports", href: "#", current: false },
  ];

  const dispatch = useDispatch();
  function logoutHandler() {
    BasicAxios.post("logout").then((res) => {
      dispatch(authActions.setUser(null));
      dispatch(notificationActions.setNotificationData([]));
      dispatch(authActions.setIsLoggedIn(false));
      window.location.reload();
    });
  }

  useEffect(() => {
    window.Pusher = Pusher;

    const echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
      encrypted: true,
      authorizer: (channel) => {
        return {
          authorize: (socketId, callback) => {
            BasicAxios.post("/broadcasting/auth", {
              socket_id: socketId,
              channel_name: "private-notifications." + user.id,
            })
              .then((response) => {
                callback(null, response.data);
              })
              .catch((error) => {
                callback(error);
              });
          },
        };
      },
    });

    echo
      .private("notifications." + user.id)
      .listen("NotificationReceived", (e) => {
        const pusherNotification = {
          id: e.notification.data.id,
          author: e.notification.author,
          comment_id: e.notification.data.comment_id,
          like_id: e.notification.data.like_id,
          post_id: e.notification.data.post_id,
          created_at: e.notification.data.created_at,
        };

        if (e?.notification?.data?.user_id != user.id) {
          dispatch(
            notificationActions.setNotificationData([
              pusherNotification,
              ...notificationData,
            ])
          );
          setNotificationData((oldArray) => [pusherNotification, ...oldArray]);
          setBroadcasted(true);
        }
      });

    if (notifications.length != 0 && !broadcasted && rendered == false) {
      setNotificationData(notifications);
      setNotLoaded(false);
      return;
    }
    BasicAxios.get("notifications")
      .then((res) => {
        setNotificationData(res.data.data);
        dispatch(notificationActions.setNotificationData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setNotLoaded(false);
      });
    rendered = true;
  }, []);

  if (notLoaded) return;

  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800">
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-[75px] 2xl:px-[60px] lg:px-[150px] md:px-[30px]  items-center justify-between z-[100px]">
                <div className="flex items-center">
                  <div className="flex-shrink-0 hidden md:block">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="block">
                    <div className="md:ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            isActive
                              ? "bg-gray-900 text-white rounded-md px-3 py-2 text-lg font-medium"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-medium"
                          }
                          end
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <div className="relative z-[100]">
                      <button
                        onClick={() => setNotificationsShow(!notificationsShow)}
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-9 w-9" aria-hidden="true" />
                      </button>
                      {notificationsShow && (
                        <Notifications
                          notificationData={notificationData}
                          broadcastState={broadcasted}
                          loaded={notLoaded}
                          setGlobalNotifications={(data) =>
                            setNotificationData(data)
                          }
                          readNotifications={(data) =>
                            setNotificationData(data)
                          }
                        />
                      )}
                      {!notificationsShow &&
                        notificationData.filter((x) => x.seen == null).length !=
                          0 && (
                          <div className="w-[18px] h-[18px] absolute top-[-1px] left-[3px] bg-red-500 z-[150] pointer-events-none opacity-[0.9] rounded-[100%] flex items-center justify-center">
                            <span className="text-center">
                              {
                                notificationData.filter((x) => x.seen == null)
                                  .length
                              }
                            </span>
                          </div>
                        )}
                    </div>

                    {/* Profile dropdown */}
                    <div className="relative ml-3">
                      <div>
                        <button
                          onClick={() => {
                            setTimeout(() => {
                              setDropDownOpen(false);
                            }, 7200);

                            setDropDownOpen(!dropDownOpen);
                          }}
                          type="button"
                          className="flex max-w-md items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <img
                            className={`${styles.imageSrc} w-[42px] h-[42px] rounded-full`}
                            src={import.meta.env.VITE_IMAGE_URL + user.image}
                          />
                        </button>
                      </div>
                      {dropDownOpen && (
                        <div>
                          <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Link
                              to="/board/profile"
                              className="block px-4 py-2 text-md text-gray-700 w-[100%] text-start hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                            <button
                              onClick={logoutHandler}
                              id="logout"
                              className="block px-4 py-2 text-md text-gray-700 w-[100%] text-start hover:bg-gray-100"
                            >
                              Sign out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    href={item.href}
                    className={
                      (item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium")
                    }
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className={`${styles.imageSrc} w-8 h-8 rounded-full`}
                      src={import.meta.env.VITE_IMAGE_URL + user.image}
                      alt="Profile picture"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <div className="relative z-[100]">
                    <button
                      onClick={() => setNotificationsShow(!notificationsShow)}
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-12 w-12" aria-hidden="true" />
                    </button>
                    {notificationsShow && (
                      <Notifications
                        notificationData={notificationData}
                        broadcastState={broadcasted}
                        loaded={notLoaded}
                        setGlobalNotifications={(data) =>
                          setNotificationData(data)
                        }
                        readNotifications={(data) => setNotificationData(data)}
                      />
                    )}
                    {!notificationsShow &&
                      notificationData.filter((x) => x.seen == null).length !=
                        0 && (
                        <div className="w-[42px] h-[42px] absolute top-[-4px] left-[-1px] bg-red-500 z-[150] pointer-events-none opacity-[0.9] rounded-[100%] flex items-center justify-center">
                          <spam>
                            {
                              notificationData.filter((x) => x.seen == null)
                                .length
                            }
                          </spam>
                        </div>
                      )}
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link
                    to="/board/profile"
                    className="block px-4 py-2 text-sm text-gray-700 w-[100%] text-start hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    id="logout"
                    className="block px-4 py-2 text-sm text-gray-700 w-[100%] text-start hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div> */}
          </>
        </div>
        <main
          className={`${styles.mainCalc} bg-[var(--light-soft-gray)] w-[100vw]`}
        >
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Outlet></Outlet>
          </div>
        </main>
      </div>
    </>
  );
}

export default checkAuth(Dashboard);
