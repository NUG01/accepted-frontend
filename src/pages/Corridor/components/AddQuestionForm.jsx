import React from "react";
import styles from "../Corridor.module.scss";
import CloseCircle from "../../../assets/icons/CloseCircle";

function AddQuestionForm({ closeModal }) {
  return (
    <div className={styles.addQuestionModal}>
      <div onClick={() => closeModal()} className={styles.backdrop}></div>
      <div className={styles.formModal}>
        <div className={styles.modalHeader}>
          <p>დასვი კითხვა</p>
          <div
            onClick={() => closeModal()}
            className="absolute right-0 top-1/2 -translate-x-[25%] -translate-y-[25%] cursor-pointer"
          >
            <CloseCircle />
          </div>
        </div>
        <form>
          <div>
            <label htmlFor=""></label>
            <input type="textarea" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestionForm;
