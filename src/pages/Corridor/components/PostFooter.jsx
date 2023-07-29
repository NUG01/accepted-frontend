import { useState, useRef } from "react";
import RockAndRoll from "../../../assets/icons/RockAndRoll";
import CommentIcon from "../../../assets/icons/CommentIcon";
import styles from "../Corridor.module.scss";
import CloseCircle from "../../../assets/icons/CloseCircle";
import WriteCommentIcon from "../../../assets/icons/WriteCommentIcon";
import { useSelector } from "react-redux";
import BasicAxios from "../../../helpers/axios/MediaAxios";
import BinIcon from "../../../assets/icons/BinIcon";
import DotsIcon from "../../../assets/icons/DotsIcon";

function PostFooter({ data, liked, likeHandler, likeLength }) {
  const [likeListModalShow, setLikeListModalShow] = useState(false);
  const [comment, setComment] = useState("");
  const [commentShow, setCommentShow] = useState(false);
  const [commentsData, setCommentsData] = useState(data.comments);
  const [commentError, setCommentError] = useState(false);
  const commentRef = useRef();
  const user = useSelector((state) => state.auth.user);

  async function commentFormHandler(ev) {
    if (ev.key == "Enter") {
      ev.preventDefault();
      if (!comment) return;
      try {
        const payload = {
          body: comment,
          parent_id: null,
        };
        const res = await BasicAxios.post("comment/" + data.id, payload);
        setComment("");
        const newComment = {
          id: res.data.id,
          body: res.data.body,
          author: res.data.author[0],
          post_id: res.data.post_id,
          replies: res.data.replies,
        };
        setCommentsData((oldComments) => [newComment, ...oldComments]);
      } catch (error) {
        setComment("");
        setCommentError(true);
        setTimeout(() => {
          setCommentError(false);
          setComment(comment);
        }, 3600);
      }
    }
  }

  async function deleteCommentHandler(id) {
    const res = await BasicAxios.delete("comment/" + id);
    setCommentsData((oldArray) => oldArray.filter((c) => c.id != id));
  }
  return (
    <div className="self-start flex flex-col items-center justify-start  w-[100%] px-[12px] mt-[-7px]">
      {likeListModalShow && likeLength > 0 && (
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
                  <p key={user.id} className="text-center mt-[2px]">
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
          className={`scale-[0.7] flex items-center justify-center text-[var(--dark-gray)] text-[21px] ${
            likeLength > 0 ? "cursor-pointer" : undefined
          }`}
        >
          <RockAndRoll />
          <p>{likeLength}</p>
        </div>
        <div
          onClick={() => {
            if (!commentsData.length > 0) return;
            setCommentShow(!commentShow);
          }}
          className={`scale-[0.7] flex items-center justify-center text-[var(--dark-gray)] text-[21px] ${
            commentsData.length > 0 ? "cursor-pointer" : undefined
          }`}
        >
          <CommentIcon />
          <p>{commentsData.length}</p>
        </div>
      </div>
      <div className="text-[var(--dark-gray)] flex items-center justify-start pt-[7px] gap-[18px] w-[100%]">
        <div
          onClick={likeHandler}
          className={` flex items-center justify-center cursor-pointer rounded-[5px] transition-all hover:bg-[var(--extra-light-ocean-blue)] px-[8px] py-[5px] `}
        >
          <RockAndRoll liked={liked} />
          <p className="font-[600]">{liked ? "ანროკება" : "დაროკება"}</p>
        </div>
        <div
          onClick={() => {
            setCommentShow(!commentShow);
            setTimeout(() => {
              document.getElementById("comment-" + data.id)?.focus();
            }, 1);
          }}
          className="flex items-center justify-center cursor-pointer rounded-[5px] transition-all hover:bg-[var(--extra-light-ocean-blue)] px-[8px] py-[5px]"
        >
          <CommentIcon />
          <p className="font-[600]">კომენტირება</p>
        </div>
      </div>
      {commentShow && (
        <div className="w-[100%] border-t-[1px] border-t-[var(--main-gray)] mt-[8px] flex flex-col gap-[5px]">
          {commentsData.map((com) => {
            return (
              <div
                key={com.id}
                className="flex relative items-center mt-[7px] gap-[5px]"
              >
                <img
                  className={styles.commentImage}
                  src={com.author.image}
                  alt="Profile image"
                />
                <div className={styles.comments}>
                  <p className="text-[13px]">
                    {com.author.name} {com.author.surname}
                  </p>
                  <p>{com.body}</p>
                </div>
                {/* <DotsIcon></DotsIcon> */}
                {com.author.id == user.id && (
                  <div
                    onClick={() => deleteCommentHandler(com.id)}
                    className="text-[#000] absolute right-[10px] top-0 cursor-pointer flex items-center justify-center h-[100%]"
                  >
                    <BinIcon width="18px" height="18px" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {commentShow && (
        <div
          className={`${
            commentsData.length == 0
              ? undefined
              : "border-t-[1px] border-t-[var(--main-gray)]"
          } mt-[8px] w-[100%]`}
        >
          <div ref={commentRef} className="relative">
            <textarea
              onKeyDown={(ev) => commentFormHandler(ev)}
              className={styles.textareaComment}
              name={`comment-${data.id}`}
              id={`comment-${data.id}`}
              placeholder={
                commentError
                  ? "კომენატრის დაწერისას დაფიქსირდა შეცდომა!"
                  : `კომენტარის დაწერა...`
              }
              value={comment}
              onChange={(ev) => setComment(ev.target.value)}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostFooter;
