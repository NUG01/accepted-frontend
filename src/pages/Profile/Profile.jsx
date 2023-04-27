import { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  const regexGeorgian = /^[ა-ჰ]{2,16}$/;

  if (!values.name) {
    errors.name = "სახელი აუცილებელია";
  } else if (!values.name.match(regexGeorgian)) {
    errors.name = "უნდა შედგებოდეს მხოლოდ ქართული სიმბოლოებისაგან";
  }

  if (!values.surname) {
    errors.surname = "სახელი აუცილებელია";
  } else if (!values.surname.match(regexGeorgian)) {
    errors.surname = "უნდა შედგებოდეს მხოლოდ ქართული სიმბოლოებისაგან";
  }

  // if (!values.email) {
  //   errors.email = "Required";
  // } else if (
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  // ) {
  //   errors.email = "Invalid email address";
  // }

  return errors;
};

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const [image, setImage] = useState((state) => user.image);
  const [imageValue, setImageValue] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
    },
    validate,

    onSubmit: ({ name, surname }) => {
      const form = new FormData();
      form.append("image", imageValue);
      alert(JSON.stringify({ name, surname }, null, 2));
    },
  });

  function imageHandler(ev) {
    const file = ev.target.files[0];
    setImageValue(file);
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
      <form onSubmit={formik.handleSubmit} className={styles.form}>
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
        <div className={styles.inputContainer}>
          <label htmlFor="name">სახელი</label>

          <input
            className={styles.input}
            id="name"
            name="name"
            type="text"
            placeholder={user.name}
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.error}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="surname">გვარი</label>

          <input
            className={styles.input}
            id="surname"
            name="surname"
            type="text"
            placeholder={user.surname}
            {...formik.getFieldProps("surname")}
          />
          {formik.touched.surname && formik.errors.surname ? (
            <div className={styles.error}>{formik.errors.surname}</div>
          ) : null}
        </div>
        <button type="submit" className="cursor-pointer w-[4rem]">
          wow
        </button>
      </form>
    </section>
  );
}
export default Profile;
