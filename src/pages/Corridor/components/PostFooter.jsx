import { useState } from "react";
import RockAndRoll from "../../../assets/icons/RockAndRoll";
import CommentIcon from "../../../assets/icons/CommentIcon";
import styles from "../Corridor.module.scss";
import CloseCircle from "../../../assets/icons/CloseCircle";

function PostFooter({ data, liked, likeHandler, likeLength }) {
  const [likeListModalShow, setLikeListModalShow] = useState(false);
  return (
    <div className="self-start flex flex-col items-center justify-start  w-[100%] px-[12px] mt-[-7px]">
      {likeListModalShow && (
        <div className={styles.addQuestionModal}>
          <div
            onClick={() => setLikeListModalShow(false)}
            className={`${styles.backdrop}`}
          ></div>
          <div className={`${styles.likesModal}`}>
            <div className={styles.modalHeader}>
              <p className="py-[5px] text-[20px] text-[var(--extra-light-normal-beige)]">
                როკერები
              </p>
              <div
                onClick={() => setLikeListModalShow(false)}
                className="absolute right-0 top-1/2 -translate-x-[25%] -translate-y-[50%] cursor-pointer"
              >
                <CloseCircle />
              </div>
            </div>
            <div>
              {data.users_who_liked.map((user) => {
                return (
                  <p className="text-center mt-[2px]">
                    {user.name} {user.surname}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div className="w-[100%] px-[5px] flex items-center justify-start  border-b-[1px] border-b-[var(--main-gray)]">
        <div
          onClick={() => setLikeListModalShow(true)}
          className="scale-[0.7] flex items-center justify-center text-[var(--dark-gray)] text-[21px] cursor-pointer"
        >
          <RockAndRoll />
          <p>{likeLength}</p>
        </div>
      </div>
      <div className="text-[var(--dark-gray)] flex items-center justify-start pt-[3px] gap-[18px] w-[100%]">
        <div
          onClick={likeHandler}
          className={` flex items-center justify-center cursor-pointer rounded-[5px] transition-all hover:bg-[var(--extra-light-ocean-blue)] px-[8px] py-[5px] `}
        >
          <RockAndRoll liked={liked} />
          <p className="font-[600]">{liked ? "ანროკება" : "დაროკება"}</p>
        </div>
        <div className="flex items-center justify-center cursor-pointer rounded-[5px] transition-all hover:bg-[var(--extra-light-ocean-blue)] px-[8px] py-[5px]">
          <CommentIcon />
          <p className="font-[600]">კომენტირება</p>
        </div>
      </div>
    </div>
  );
}

export default PostFooter;
