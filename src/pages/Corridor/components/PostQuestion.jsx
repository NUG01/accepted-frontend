import React from "react";
import styles from "../Corridor.module.scss";

function PostQuestion({ user, openModal }) {
  return (
    <div className={`${styles.askQuestionContainer} p-[12px] mb-[45px]`}>
      <img
        className={styles.imageSrc}
        src={import.meta.env.VITE_IMAGE_URL + user.image}
        alt="Profile image"
      />
      <div onClick={() => openModal()} className={styles.addPostInput}>
        <p>{user.name}, ხელის აწევა არაა აუცილებელი, შეგიძლია კითხვა დასვა</p>
      </div>
    </div>
  );
}

export default PostQuestion;
