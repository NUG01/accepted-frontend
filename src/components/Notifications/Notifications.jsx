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
import { useNavigate } from "react-router-dom";

function Notifications({
  notificationData,
  broadcastState,
  loaded,
  readNotifications,
  setGlobalNotifications,
}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const notificationSelector = useState(
    useSelector((state) => state.notifications.notificationData)
  );
  const [notifications, setNotifications] = useState(notificationData);

  const [loading, setLoading] = useState(loaded);
  const [broadcasted, setBroadcasted] = useState(broadcastState);

  const dispatch = useDispatch();

  moment.locale("ka");

  function date(craetedAt) {
    return moment(craetedAt).startOf("minute").fromNow();
  }

  async function readAllHandler() {
    const res = await BasicAxios.get("read-notifications");
    if (res.status == 204) return;
    setNotifications(res.data);
    readNotifications(res.data);
    dispatch(notificationActions.setNotificationData(res.data));
  }

  async function notificationReadHandler({ post_id, id, seen }) {
    if (!seen) {
      const updateObject = (updatedObj) => {
        const updatedArray = notifications.map((obj) => {
          if (obj.id === updatedObj.id) {
            return { ...obj, ...updatedObj };
          }
          return obj;
        });
        setNotifications(updatedArray);
        setGlobalNotifications(updatedArray);
      };
      const res = await BasicAxios.get("read-notification/" + id);
      updateObject(res.data);
      // const index = notifications.findIndex((x) => x.id == id);
      // const index = notifications.findIndex((x) => x.id == id);
      // const newArray = notifications.filter((x) => x.id != index);
      // setNotifications([...newArray, res.data]);
      // console.log(notifications.findIndex((x) => x.id == id));
      // Object.assign(
      //   notifications.find((x) => x.id == id),
      //   res.data
      // );
      // notifications[index].seen = 1;
      // console.log(notifications);
    }
    navigate("/board/post/" + post_id);
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
              onClick={() => notificationReadHandler(notification)}
              key={notification.id}
              className="flex items-center cursor-pointer justify-between border border-solid border-[#c2c2c2] px-[8px] py-[4px] rounded-[3px]"
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
