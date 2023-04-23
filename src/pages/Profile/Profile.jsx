import { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const [image, setImage] = useState((state) => user.image);
  const [preview, setPreview] = useState("");
  function profileUpdateHandler(ev) {
    ev.preventDefault();
  }

  function imageHandler(ev) {
    const file = ev.target.files[0];
    setImage(file);

    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      setImage(dataURL);
    };
    reader.readAsDataURL(file);
  }

  return (
    <section className={styles.section}>
      <form onSubmit={profileUpdateHandler} className={styles.form}>
        <div className={styles.imageContainer}>
          <div>
            <img
              className={`${styles.image} ${styles.imageSrc}`}
              src={image}
              alt="Profile image"
            />
          </div>
          <label htmlFor="image">ფოტოს განახლება</label>
          <input
            onChange={imageHandler}
            className={styles.imageInput}
            type="file"
            name="image"
            id="image"
          />
        </div>
        <button className="cursor-pointer"></button>
      </form>
    </section>
  );
}

export default Profile;
