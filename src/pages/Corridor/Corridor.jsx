import { useState } from "react";
import styles from "./Corridor.module.scss";
import checkAuth from "../../guards/checkAuth";
import { useSelector } from "react-redux";
import PostQuestion from "./components/PostQuestion";
import AddQuestionForm from "./components/AddQuestionForm";

function Corridor() {
  const user = useSelector((state) => state.auth.user);

  const [addQuestionModal, setAddquestionModal] = useState(false);

  return (
    <section className={styles.mainGrid}>
      {addQuestionModal && <AddQuestionForm closeModal={()=>setAddquestionModal(false)} />}
      <div className="w-[100%] min-h-[100%]"></div>
      <main className="w-[100%] min-h-[100%] pt-[20px]">
        <PostQuestion openModal={()=>setAddquestionModal(true)} user={user} />
      </main>
      <div className="w-[100%] min-h-[100%]"></div>
    </section>
  );
}

export default checkAuth(Corridor);
