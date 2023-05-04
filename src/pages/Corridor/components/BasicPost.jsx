import React from "react";
import styles from "../Corridor.module.scss";
import { useState } from "react";
import CarouselNextArrow from "../../../assets/icons/CarouselNextArrow";
import CarouselPreviousArrow from "../../../assets/icons/CarouselPreviousArrow";
import NextImageArrow from "./NextImageArrow";
import PreviousImageArrow from "./PreviousImageArrow";
import RockAndRoll from "../../../assets/icons/RockAndRoll";
import CommentIcon from "../../../assets/icons/CommentIcon";

function BasicPost({ data }) {
  const [carousel, setCarousel] = useState(0);
  return (
    <div
      className={`${styles.askQuestionContainer} flex flex-col items-center justify-center pb-[12px]`}
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
        <div className="w-[100%] h-[310px] relative group">
          <NextImageArrow
            imagesLength={data.images.length}
            carousel={carousel}
            carouselSetter={(value) => setCarousel(value)}
          />
          <PreviousImageArrow
            imagesLength={data.images.length}
            carousel={carousel}
            carouselSetter={(value) => setCarousel(value)}
          />

          {data.images.map(
            (img, i) =>
              carousel == i && (
                <div key={img.id}>
                  <img
                    className={`${styles.mainImage} absolute h-[100%] top-0 left-0`}
                    src={import.meta.env.VITE_IMAGE_URL + img.image}
                    alt="Question image"
                  />
                </div>
              )
          )}
        </div>
      )}
      <div className="text-[var(--dark-gray)] self-start flex items-center justify-start px-[12px] gap-[18px] w-[100%]">
        <div className="flex items-center justify-center cursor-pointer rounded-[5px] transition-all hover:bg-[var(--extra-light-ocean-blue)] px-[8px] py-[5px]">
          <RockAndRoll />
          <p className="font-[600]">დაროკება</p>
        </div>
        <div className="flex items-center justify-center cursor-pointer rounded-[5px] transition-all hover:bg-[var(--extra-light-ocean-blue)] px-[8px] py-[5px]">
          <CommentIcon />
          <p className="font-[600]">კომენტირება</p>
        </div>
      </div>
    </div>
  );
}

export default BasicPost;
