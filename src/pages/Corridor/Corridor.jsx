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

  const [addQuestionModal, setAddquestionModal] = useState(false);

  useEffect(() => {
    BasicAxios.get("posts").then((res) => {
      setPosts(res.data.data);
      setIsFetched(true);
    });
  }, []);

  if (!isFetched) return;

  return (
    <section className={styles.mainGrid}>
      {addQuestionModal && (
        <AddQuestionForm closeModal={() => setAddquestionModal(false)} />
      )}
      <div className="w-[100%] min-h-[100%]"></div>
      <main className="w-[100%] min-h-[100%] pt-[20px]">
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
