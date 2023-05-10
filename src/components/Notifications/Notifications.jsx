import { useEffect, useState } from "react";
import styles from "./Notifications.module.scss";
import CommentIcon from "../../assets/icons/CommentIcon";
import { useSelector } from "react-redux";
import RockAndRoll from "../../assets/icons/RockAndRoll";
import BasicAxios from "../../helpers/axios/index";
import moment from "moment";
import ka from "moment/dist/locale/ka";
import Loader from "./Loader";
import EmptyNotifications from "../../assets/icons/EmptyNotifications";

function Notifications() {
  const user = useSelector((state) => state.auth.user);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  moment.locale("ka");

  function date(craetedAt) {
    return moment(craetedAt).startOf("minute").fromNow();
  }
  useEffect(() => {
    BasicAxios.get("notifications")
      .then((res) => {
        setNotifications(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className={`${styles.notificationsContainer} ${styles.scrollHide}`}>
        <div className="flex items-center justify-between text-[13px] mb-[5px]">
          <p className="font-[500] text-[16px]">ცნობები</p>
          <p className="cursor-pointer underline decoration-[0.5px] underline-offset-2">
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
            <div className="flex items-center justify-between border border-solid border-[#c2c2c2] px-[8px] py-[4px] rounded-[3px]">
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
              <div className="flex flex-col items-end justify-start">
                <p>{date(notification.created_at)}</p>
                <p className="text-[var(--dark-ocean-blue)]">ახალი</p>
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
