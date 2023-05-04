import { useState, useEffect } from "react";
import styles from "./Corridor.module.scss";
import checkAuth from "../../guards/checkAuth";
import { useSelector } from "react-redux";
import PostQuestion from "./components/PostQuestion";
import AddQuestionForm from "./components/AddQuestionForm";
import BasicPost from "./components/BasicPost";
import BasicAxios from "../../helpers/axios/MediaAxios";

function Corridor() {
  const user = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [page, setPage] = useState(1);

  const [addQuestionModal, setAddquestionModal] = useState(false);

  useEffect(() => {
    BasicAxios.get("posts?page=" + page).then((res) => {
      setPosts(res.data.data);
      setIsFetched(true);
    });
    const observerTarget = document.getElementById("main")[0];
    console.log(observerTarget);

    let options = {
      root: observerTarget,
      rootMargin: "0px",
      threshold: 1,
    };

    let observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(page + 1);
        console.log(entries);
        BasicAxios.get("posts?page=" + page + 1).then((res) => {
          // setPosts(res.data.data);
          // setIsFetched(true);
        });
      }
    }, options);

    // const observer = new IntersectionObserver(
    //   (entries) => {
    //     if (entries[0].isIntersecting) {
    //       setPage(page + 1);
    //       console.log(entries);
    //       BasicAxios.get("posts?page=" + page + 1).then((res) => {
    //         // setPosts(res.data.data);
    //         // setIsFetched(true);
    //       });
    //     }
    //   },
    //   { threshold: 0.9 }
    // );

    if (observerTarget?.current) {
      console.log(observerTarget);

      observer.observe(observerTarget.current);
    }

    console.log(observer);
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, []);

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
      <main id="main" className="w-[100%] min-h-[100%] pt-[20px] main">
        <PostQuestion openModal={() => setAddquestionModal(true)} user={user} />

        {posts.map((post) => (
          <BasicPost key={post.id} data={post} />
        ))}
      </main>
      <div className="w-[100%] min-h-[100%]"></div>
    </section>
  );
}

export default checkAuth(Corridor);
