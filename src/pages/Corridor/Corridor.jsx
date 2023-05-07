import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Corridor.module.scss";
import checkAuth from "../../guards/checkAuth";
import { useSelector } from "react-redux";
import PostQuestion from "./components/PostQuestion";
import AddQuestionForm from "./components/AddQuestionForm";
import BasicPost from "./components/BasicPost";
import BasicAxios from "../../helpers/axios/MediaAxios";
import { number } from "yup";

function Corridor() {
  const user = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [page, setPage] = useState(1);
  const [addQuestionModal, setAddquestionModal] = useState(false);
  const observer = useRef();

  const lastEl = useCallback((node) => {
    if (!isFetched) return;

    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevValue) => number(prevValue + 1));
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  }, []);

  useEffect(() => {
    setIsFetched(false);
    BasicAxios.get("posts?page=" + page).then((res) => {
      setPosts(res.data.data);
      // if (page == 1) setPosts(res.data.data);
      // if (page > 1) setPosts([...posts, ...res.data.data]);
      setIsFetched(true);
    });
  }, [page]);

  if (!isFetched) return;

  return (
    <section className={styles.mainGrid}>
      {addQuestionModal && (
        <AddQuestionForm
          updatePosts={(post) => setPosts((oldArray) => [post, ...oldArray])}
          closeModal={() => setAddquestionModal(false)}
        />
      )}
      <div className="w-[100%] min-h-[100%]"></div>
      <main id="main" className="w-[100%] min-h-[100%] pt-[20px]">
        <PostQuestion openModal={() => setAddquestionModal(true)} user={user} />
        <div>
          {posts.map((post, index) => {
            return (
              <div key={post.id}>
                <BasicPost postData={post} user={user} />
              </div>
            );
            // if (posts.length === index + 1) {
            //   return (
            //     <div id={page} key={post.id} ref={lastEl}>
            //       <BasicPost data={post} />
            //     </div>
            //   );
            // } else {
            //   return (
            //     <div key={post.id}>
            //       <BasicPost data={post} />
            //     </div>
            //   );
            // }
          })}
        </div>
      </main>
      <div className="w-[100%] min-h-[100%]"></div>
    </section>
  );
}

export default checkAuth(Corridor);
