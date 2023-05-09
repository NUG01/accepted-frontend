import React from "react";
import styles from "./Notifications.module.scss";
import CommentIcon from "../../assets/icons/CommentIcon";
import { useSelector } from "react-redux";
import RockAndRoll from "../../assets/icons/RockAndRoll";

function Notifications() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <div className={`${styles.notificationsContainer} ${styles.scrollHide}`}>
        <div className="flex items-center justify-between text-[13px] mb-[5px]">
          <p className="font-[500] text-[16px]">ცნობები</p>
          <p className="cursor-pointer underline decoration-[0.5px] underline-offset-2">
            ყველას წაკითხულად მონიშვნა
          </p>
        </div>
        <div className="flex items-center justify-between border border-solid border-[#c2c2c2] px-[8px] py-[4px] rounded-[3px]">
          <div className="flex items-center justify-center gap-[5px]">
            <img
              className={`${styles.image}`}
              src={import.meta.env.VITE_IMAGE_URL + user.image}
              alt="Profile picture"
            />
            <div className="flex flex-col items-start justify-center gap-[3px]">
              <p className="ml-[3px] text-[15px]">ლუბა ლუბიანი</p>
              <div className="flex items-center justify-center">
                <CommentIcon width="21px" height="21px" />
                <p>პოსტზე დააკომენტარა</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-start">
            <p>5 წუთის წინა</p>
            <p className="text-[var(--dark-ocean-blue)]">ახალი</p>
          </div>
        </div>
        <div className="flex items-center justify-between border border-solid border-[#c2c2c2] px-[8px] py-[4px] rounded-[3px]">
          <div className="flex items-center justify-center gap-[5px]">
            <img
              className={`${styles.image}`}
              src={import.meta.env.VITE_IMAGE_URL + user.image}
              alt="Profile picture"
            />
            <div className="flex flex-col items-start justify-center gap-[3px]">
              <p className="ml-[3px] text-[15px]">ლუბა ლუბიანი</p>
              <div className="flex items-center justify-center">
                <RockAndRoll width="19px" height="19px" />
                <p>პოსტი დააროკა</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-start">
            <p>5 წუთის წინა</p>
            <p className="text-[var(--dark-ocean-blue)]">ახალი</p>
          </div>
        </div>
      </div>
      <div className={styles.triangle}></div>
    </>
  );
}

export default Notifications;
