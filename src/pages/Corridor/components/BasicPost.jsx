import React from "react";
import styles from "../Corridor.module.scss";
import { useState } from "react";
import CarouselNextArrow from "../../../assets/icons/CarouselNextArrow";
import CarouselPreviousArrow from "../../../assets/icons/CarouselPreviousArrow";
import NextImageArrow from "./NextImageArrow";
import PreviousImageArrow from "./PreviousImageArrow";
import RockAndRoll from "../../../assets/icons/RockAndRoll";
import CommentIcon from "../../../assets/icons/CommentIcon";
import BasicAxios from "../../../helpers/axios/MediaAxios";
import PostFooter from "./PostFooter";
import moment from "moment";
import ka from "moment/dist/locale/ka";

function BasicPost({ postData, user }) {
  const [carousel, setCarousel] = useState(0);
  const [liked, setLiked] = useState(postData.liked == "true" ? true : false);
  const [data, setData] = useState(postData);
  const [seeWhoLikedModal, setSeeWhoLikedModal] = useState(false);

  moment.locale("ka");

  const date = moment(data.created_at).startOf("minute").fromNow();

  async function likeOrUnlikePost() {
    const res = await BasicAxios.post("like-post/" + data.id);
    if (res.data == "Liked!") {
      setData({
        ...data,
        users_who_liked: [
          ...data.users_who_liked,
          {
            id: user.id,
            name: user.name,
            surname: user.surname,
            image: user.image,
          },
        ],
      });
      setLiked(true);
    }
    if (res.data == "Unliked!") {
      setData({
        ...data,
        users_who_liked: data.users_who_liked.filter((x) => x.id != user.id),
      });

      setLiked(false);
    }
  }

  return (
    <div
      className={`${styles.askQuestionContainer} flex flex-col items-center justify-center pb-[12px]`}
    >
      <div
        className={`self-start flex items-center justify-between w-[100%] pr-[12px] `}
      >
        <div className={`${styles.postHeaderContainer} `}>
          <img
            className={styles.imageSrc}
            src={import.meta.env.VITE_IMAGE_URL + data.user.image}
            alt="Question image"
          />
          <p>{data.user.name}</p>
        </div>
        <p className="self-start mt-[5px] text-[var(--dark-gray)]">{date}</p>
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
      <PostFooter
        likeLength={data.users_who_liked.length}
        data={data}
        liked={liked}
        likeHandler={likeOrUnlikePost}
      ></PostFooter>
    </div>
  );
}

export default BasicPost;
