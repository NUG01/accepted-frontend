import { useState } from "react";
import styles from "../Corridor.module.scss";
import CloseCircle from "../../../assets/icons/CloseCircle";
import BasicButton from "../../../components/BasicButton/BasicButton";
import BinIcon from "../../../assets/icons/BinIcon";
import MediaAxios from "../../../helpers/axios/MediaAxios";
function AddQuestionForm({ closeModal, updatePosts }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [requestInProcess, setRequestInProccess] = useState(false);
  const [imagesQuantityError, setImagesQuantityError] = useState(false);
  const [question, setQuestion] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [errors, setErrors] = useState([]);

  function submitHandler(ev) {
    ev.preventDefault();
    setErrors([]);
    if (question.length > 300) {
      setErrors({
        questionError: "მაქსიმუმ 300 სიმბოლო!",
      });
      return;
    }
    if (question.length < 10) {
      setErrors({
        questionError: "მინიმუმ 10 სიმბოლო!",
      });
      return;
    }
    const data = {
      question,
      images,
    };
    setRequestInProccess(true);
    setButtonDisabled(true);
    MediaAxios.post("add-post", data)
      .then((res) => {
        updatePosts(res.data);
        closeModal();
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      })
      .finally(() => {
        setButtonDisabled(false);
        setRequestInProccess(false);
      });
  }

  function imageHandler(ev) {
    if (images.length > 5) {
      setImagesQuantityError(true);
      setTimeout(() => {
        setImagesQuantityError(false);
      }, 3600);

      return;
    }
    const file = ev.target.files[0];
    setImages((oldValue) => [file, ...oldValue]);

    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      setImagesPreview((oldValue) => [...oldValue, dataURL]);
    };
    reader.readAsDataURL(file);
  }

  function updateImagesValues(img) {
    setImagesPreview((prevImgs) => prevImgs.filter((x) => x != img));
    for (let index = 0; index < images.length; index++) {
      let reader = new FileReader();
      reader.onload = function () {
        let dataURL = reader.result;
        if (dataURL == img) {
          setImages((oldValue) => oldValue.filter((x) => x != images[index]));
        }
      };
      reader.readAsDataURL(images[index]);
    }
  }

  return (
    <div className={styles.addQuestionModal}>
      <div onClick={() => closeModal()} className={styles.backdrop}></div>
      <div className={styles.formModal}>
        <div className={styles.modalHeader}>
          <p className="py-[5px]">დასვი კითხვა</p>
          <div
            onClick={() => closeModal()}
            className="absolute right-0 top-1/2 -translate-x-[25%] -translate-y-[50%] cursor-pointer"
          >
            <CloseCircle />
          </div>
        </div>
        <form onSubmit={submitHandler} className={styles.form}>
          <div className="w-[80%]">
            <textarea
              onChange={(ev) => setQuestion(ev.target.value)}
              name="question"
              id="question"
              className={styles.textarea}
              placeholder="მას მას, რა სარგებლობა მოაქვს მამალს?"
              value={question}
            />
          </div>
          <div className="w-[80%] relative mt-[10px]">
            <div className={styles.fileInputContainer}>
              <button
                className="py-[6px] px-[10px] bg-[var(--light-ocean-blue)] rounded-[7px] cursor-pointer"
                type="button"
              >
                სურათი ჩააგდე
              </button>
            </div>

            <input
              onChange={imageHandler}
              className={styles.fileInput}
              type="file"
              name="images"
              id="images"
            />
          </div>
          <div className={styles.form}>
            {images && (
              <div className={styles.imagesContainer}>
                {imagesPreview.map((img, i) => {
                  return (
                    <div
                      key={i}
                      onClick={(ev) => {
                        updateImagesValues(img);
                      }}
                      className="relative group"
                    >
                      <img
                        className={styles.image}
                        src={img}
                        id={i}
                        alt="Uploaded image"
                      />
                      <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden group-hover:block`}
                      >
                        <BinIcon />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {imagesQuantityError && (
              <div className={styles.error}>
                <p className="text-center">მაქსიმუმ 6 სურათი!</p>
              </div>
            )}
          </div>
          <div className="w-[70%] mb-[15px] mt-[10px] flex items-center justify-center flex-col">
            {errors && (
              <div>
                {Object.keys(errors).map((error) => (
                  <p className={`text-center ${styles.error}`} key={error}>
                    {errors[error]}
                  </p>
                ))}
              </div>
            )}
            <div className="w-[40%] ">
              <BasicButton
                disabled={buttonDisabled}
                spinner={requestInProcess}
                type="submit"
                style="dark-outline"
              >
                <p className={requestInProcess ? styles.opacityDecrease : ""}>
                  დაპოსტვა
                </p>
              </BasicButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestionForm;
