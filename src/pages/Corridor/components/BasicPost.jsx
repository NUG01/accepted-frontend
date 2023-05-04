import React from "react";
import styles from "../Corridor.module.scss";

function BasicPost({ data }) {
  return (
    <div
      className={`${styles.askQuestionContainer} flex flex-col items-center justify-center overflow-hidden`}
    >
      <div className={`${styles.postHeaderContainer} self-start`}>
        <img
          className={styles.imageSrc}
          src={import.meta.env.VITE_IMAGE_URL + data.user.image}
          alt="Question image"
        />
        <p>{data.user.name}</p>
      </div>
      <div className="px-[12px] mb-[5px] self-start">
        <p className="text-[var(--dark-gray)]">{data.body}</p>
      </div>
      {data.images && data.images.length > 0 && (
        <div className="w-[100%] relative">
          {data.images.map((img, i) => (
            <img
              className={`${
                styles.mainImage
              } absolute top-0 left-0 translate-x-[${i * 100}%]`}
              src={import.meta.env.VITE_IMAGE_URL + data.images[0].image}
              alt="Question image"
            />
          ))}
          <img
            className={styles.mainImage}
            src={import.meta.env.VITE_IMAGE_URL + data.images[0].image}
            alt="Question image"
          />
        </div>
      )}
      <div className="text-[var(--dark-gray)] self-start flex items-center justify-start px-[12px] gap-[18px] w-[100%]">
        <div>like</div>
        <div>comment</div>
      </div>
    </div>
  );
}

export default BasicPost;
