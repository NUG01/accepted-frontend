import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Corridor.module.scss";
import checkAuth from "../../guards/checkAuth";
import { useSelector } from "react-redux";
import PostQuestion from "./components/PostQuestion";
import AddQuestionForm from "./components/AddQuestionForm";
import BasicPost from "./components/BasicPost";
import BasicAxios from "../../helpers/axios/MediaAxios";
import { number } from "yup";
import DotsSpinner from "../../components/Spinner/DotsSpinner";

function Corridor() {
  const user = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [page, setPage] = useState(1);
  const [addQuestionModal, setAddquestionModal] = useState(false);
  const [sending, setSending] = useState(false);
  const observer = useRef();
  const paginationTrigger = useRef();

  useEffect(() => {
    if (page == 1) setIsFetched(false);
    BasicAxios.get("posts?page=" + page).then((res) => {
      setSending(true);
      if (page == 1) setPosts(res.data.data);
      if (page > 1) setPosts([...posts, ...res.data.data]);
      setIsFetched(true);
      if (res.data.meta.current_page == res.data.meta.last_page) {
        setSending(false);
        return;
      }
      setTimeout(() => {
        document.querySelector("body").onscroll = () => {
          if (
            scrollY >
            document.querySelector("body").offsetTop +
              document.querySelector("body").clientHeight -
              screen.height
          ) {
            setPage(page + 1);
          }
        };
      }, 1);
    });
  }, [page]);

  if (!isFetched) return;

  return (
    <section className={styles.mainGrid + " postParent"}>
      {sending && (
        <div className={styles.spinnerContainer}>
          <DotsSpinner />
        </div>
      )}
      {addQuestionModal && (
        <AddQuestionForm
          updatePosts={(post) => setPosts((oldArray) => [post, ...oldArray])}
          closeModal={() => setAddquestionModal(false)}
        />
      )}
      <div className="w-[100%] h-[100%] md:block hidden"></div>
      <main id="main" className="w-[100%] h-[100%] pt-[20px]">
        <PostQuestion openModal={() => setAddquestionModal(true)} user={user} />
        <div ref={paginationTrigger}>
          {posts.map((post, index) => {
            return (
              <div key={post.id}>
                <BasicPost postData={post} user={user} />
              </div>
            );
          })}
        </div>
      </main>
      <div className="w-[100%] h-[100%] hidden md:block"></div>
    </section>
  );
}

export default Corridor;
