import { useEffect, useState } from "react";
import styles from "./Notifications.module.scss";
import CommentIcon from "../../assets/icons/CommentIcon";
import RockAndRoll from "../../assets/icons/RockAndRoll";
import BasicAxios from "../../helpers/axios/index";
import moment from "moment";
import ka from "moment/dist/locale/ka";
import Loader from "./Loader";
import EmptyNotifications from "../../assets/icons/EmptyNotifications";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../store/Notifications";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
// let rendered = false;
function Notifications({
  notificationData,
  broadcastState,
  loaded,
  readNotifications,
}) {
  const user = useSelector((state) => state.auth.user);
  const notificationSelector = useState(
    useSelector((state) => state.notifications.notificationData)
  );
  const [notifications, setNotifications] = useState(notificationData);
  // const [notifications, setNotifications] = useState(
  //   useSelector((state) => state.notifications.notificationData) && []
  // );
  const [loading, setLoading] = useState(loaded);
  const [broadcasted, setBroadcasted] = useState(broadcastState);

  const dispatch = useDispatch();

  moment.locale("ka");

  function date(craetedAt) {
    return moment(craetedAt).startOf("minute").fromNow();
  }

  useEffect(() => {
    // window.Pusher = Pusher;
    // const echo = new Echo({
    //   broadcaster: "pusher",
    //   key: import.meta.env.VITE_PUSHER_APP_KEY,
    //   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    //   forceTLS: true,
    //   encrypted: true,
    //   authorizer: (channel) => {
    //     return {
    //       authorize: (socketId, callback) => {
    //         BasicAxios.post("/broadcasting/auth", {
    //           socket_id: socketId,
    //           channel_name: "notifications." + user.id,
    //         })
    //           .then((response) => {
    //             callback(null, response.data);
    //           })
    //           .catch((error) => {
    //             callback(error);
    //           });
    //       },
    //     };
    //   },
    // });
    // echo
    //   .private("notifications." + user.id)
    //   .listen("NotificationReceived", (e) => {
    //     if (e.notification.author.id == user.id) return;
    //     const pusherNotification = {
    //       author: e.notification.author,
    //       comment_id: e.notification.data.comment_id,
    //       like_id: e.notification.data.like_id,
    //       post_id: e.notification.data.post_id,
    //       created_at: e.notification.data.created_at,
    //     };
    //     dispatch(
    //       notificationActions.setNotificationData([
    //         pusherNotification,
    //         ...notifications,
    //       ])
    //     );
    //     setNotifications((oldArray) => [pusherNotification, ...oldArray]);
    //     setBroadcasted(true);
    //   });
    // if (
    //   notificationSelector[0].length != 0 &&
    //   !broadcasted &&
    //   rendered == false
    // ) {
    //   setNotifications(notificationSelector[0]);
    //   setLoading(false);
    //   return;
    // }
    // BasicAxios.get("notifications")
    //   .then((res) => {
    //     setNotifications(res.data.data);
    //     dispatch(notificationActions.setNotificationData(res.data.data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    // rendered = true;
  }, []);

  async function readAllHandler() {
    const res = await BasicAxios.get("read-notifications");
    if (res.status == 204) return;
    setNotifications(res.data);
    readNotifications(res.data);
    dispatch(notificationActions.setNotificationData(res.data));
  }

  return (
    <>
      <div className={`${styles.notificationsContainer} ${styles.scrollHide}`}>
        <div className="flex items-center justify-between text-[13px] mb-[5px]">
          <p className="font-[500] text-[16px]">ცნობები</p>
          <p
            onClick={readAllHandler}
            className="cursor-pointer underline decoration-[0.5px] underline-offset-2"
          >
            ყველას წაკითხულად მონიშვნა
          </p>
        </div>
        {notifications.length == 0 && !loading && (
          <div className="text-[var(--dark-gray)] text-[30px] flex flex-col items-center justify-center px-[20px] pt-[50px] gap-[10px]">
            <p>შენზე დეპეშა არაა</p>

            <EmptyNotifications />
          </div>
        )}
        {loading ? (
          <Loader />
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between border border-solid border-[#c2c2c2] px-[8px] py-[4px] rounded-[3px]"
            >
              <div className="flex items-center justify-center gap-[5px]">
                <img
                  className={`${styles.image}`}
                  src={
                    import.meta.env.VITE_IMAGE_URL +
                    notification.author[0].image
                  }
                  alt="Profile picture"
                />
                <div className="flex flex-col items-start justify-center gap-[3px]">
                  <p className="ml-[3px] text-[15px]">
                    {notification.author[0].name}{" "}
                    {notification.author[0].surname}
                  </p>
                  <div className="flex items-center justify-center">
                    {notification.comment_id && (
                      <CommentIcon width="21px" height="21px" />
                    )}
                    {notification.like_id && (
                      <RockAndRoll width="19px" height="19px" />
                    )}
                    {notification.comment_id && <p>პოსტზე დააკომენტარა</p>}
                    {notification.like_id && <p>პოსტი დააროკა</p>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-start self-start">
                <p>{date(notification.created_at)}</p>
                {!notification.seen && (
                  <p className="text-[var(--dark-ocean-blue)]">ახალი</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.triangle}></div>
    </>
  );
}

export default Notifications;
