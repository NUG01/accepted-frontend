import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import FormikInput from "./FormComponents/FormikInput";
import styles from "./Profile.module.scss";
import { validation } from "./FormComponents/Rules";
import BasicButton from "../../components/BasicButton/BasicButton";
import BasicAxios from "../../helpers/axios/index";
import MediaAxios from "../../helpers/axios/MediaAxios";
import SuccessIcon from "../../assets/icons/SuccessIcon";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const [image, setImage] = useState((state) => user.image);
  const [imageValue, setImageValue] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [requestInProcess, setRequestInProccess] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [requestFailure, setRequestFailure] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  const validate = (values) =>
    validation(values, setNameError, setSurnameError);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      surname: user.surname,
    },
    validate,

    onSubmit: ({ name, surname }) => {
      setRequestInProccess(true);
      setButtonDisabled(true);
      setRequestSuccess(false);
      setRequestFailure(false);
      setErrors([]);
      const form = new FormData();
      if (imageValue) form.append("image", imageValue);
      form.append("name", name);
      form.append("surname", surname);
      MediaAxios.post("user/profile-update/" + user.id, form)
        .then((res) => {
          setRequestSuccess(true);
          setTimeout(() => {
            setRequestSuccess(false);
          }, 3600);
        })
        .catch((err) => {
          setRequestFailure(true);
          setErrors(err.response.data.errors);
        })
        .finally(() => {
          setRequestInProccess(false);
          setButtonDisabled(false);
        });
      setButtonDisabled(false);
      setRequestInProccess(false);
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
              src={imageValue ? image : import.meta.env.VITE_IMAGE_URL + image}
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

        <FormikInput
          name="name"
          label="სახელი"
          errorClassShow={nameError}
          value={user.name}
          formik={formik}
          errors={formik.errors.name}
          touched={formik.touched.name}
        />
        <FormikInput
          name="surname"
          label="გვარი"
          errorClassShow={surnameError}
          value={user.surname}
          formik={formik}
          errors={formik.errors.surname}
          touched={formik.touched.surname}
        />
        {requestFailure && errors.length != 0 && (
          <div>
            {Object.keys(errors).map((error) => (
              <p className={`text-center ${styles.error}`} key={error}>
                {errors[error]}
              </p>
            ))}
          </div>
        )}
        {requestSuccess && (
          <SuccessMessage>პროფილი განახლებულია</SuccessMessage>
        )}
        <BasicButton
          disabled={buttonDisabled}
          spinner={requestInProcess}
          type="submit"
          style="dark-outline"
        >
          <p
            style={{ padding: "2px 12px" }}
            className={requestInProcess ? styles.opacityDecrease : ""}
          >
            დადასტურება
          </p>
        </BasicButton>
      </form>
    </section>
  );
}
export default Profile;
