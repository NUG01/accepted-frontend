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
import PasswordFormikInput from "./FormComponents/PasswordFormikInput";
import * as Yup from "yup";

function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const [image, setImage] = useState((state) => user.image);
  const [imageValue, setImageValue] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [requestInProcess, setRequestInProccess] = useState(false);
  const [passwordRequestInProcess, setPasswordRequestInProcess] =
    useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [passwordButtonDisabled, setPasswordButtonDisabled] = useState(false);
  const [requestFailure, setRequestFailure] = useState(false);
  const [passwordRequestFailure, setPasswordRequestFailure] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [passwordRequestSuccess, setPasswordRequestSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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

  const passwordFormik = useFormik({
    initialValues: {
      current_password: "",
      password_confirmation: "",
      new_password: "",
    },
    validationSchema: Yup.object({
      current_password: Yup.string()

        .min(8, "უნდა შეცავდეს მინიმუმ 8 სიმბოლოს")

        .required("პაროლი აუცილებელია"),

      password_confirmation: Yup.string()

        .oneOf([Yup.ref("current_password")], "პაროლები არ ემთხვევა")

        .required("პაროლის გამეორება აუცილებელია"),

      new_password: Yup.string()
        .min(8, "უნდა შეცავდეს მინიმუმ 8 სიმბოლოს")

        .required("ახალი პაროლი აუცილებელია"),
    }),

    onSubmit: ({ current_password, password_confirmation, new_password }) => {
      setPasswordRequestInProcess(true);
      MediaAxios.post("user/password-update", {
        current_password,
        password_confirmation,
        new_password,
      })
        .then((res) => {
          setPasswordRequestSuccess(true);
          setTimeout(() => {
            setPasswordRequestSuccess(false);
          }, 3600);
        })
        .catch((err) => {
          setPasswordRequestFailure(true);
          setPasswordErrors(err.response.data.errors);
        })
        .finally(() => {
          setPasswordButtonDisabled(false);
          setPasswordRequestInProcess(false);
        });
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

      <form
        onSubmit={passwordFormik.handleSubmit}
        className={`${styles.form} ${styles.passwordForm}`}
      >
        <PasswordFormikInput
          name="current_password"
          label="პაროლი"
          value={passwordFormik.initialValues.current_password}
          type={showCurrentPassword ? "text" : "password"}
          formik={passwordFormik}
          errors={passwordFormik.errors.current_password}
          touched={passwordFormik.touched.current_password}
          showPassword={showCurrentPassword}
          toggleState={() => setShowCurrentPassword(!showCurrentPassword)}
        />
        <PasswordFormikInput
          name="password_confirmation"
          label="პაროლის გამეორება"
          value={passwordFormik.initialValues.password_confirmation}
          type={showConfirmPassword ? "text" : "password"}
          formik={passwordFormik}
          errors={passwordFormik.errors.password_confirmation}
          touched={passwordFormik.touched.password_confirmation}
          showPassword={showConfirmPassword}
          toggleState={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        <PasswordFormikInput
          name="new_password"
          label="ახალი პაროლი"
          value={passwordFormik.initialValues.new_password}
          type={showNewPassword ? "text" : "password"}
          formik={passwordFormik}
          errors={passwordFormik.errors.new_password}
          touched={passwordFormik.touched.new_password}
          showPassword={showNewPassword}
          toggleState={() => setShowNewPassword(!showNewPassword)}
        />
        {passwordRequestFailure && passwordErrors.length != 0 && (
          <div>
            {Object.keys(passwordErrors).map((error) => (
              <p className={`text-center ${styles.error}`} key={error}>
                {passwordErrors[error]}
              </p>
            ))}
          </div>
        )}
        {passwordRequestSuccess && (
          <SuccessMessage>პაროლი განახლებულია</SuccessMessage>
        )}
        <BasicButton
          disabled={passwordButtonDisabled}
          spinner={passwordRequestInProcess}
          type="submit"
          style="dark-outline"
        >
          <p
            style={{ padding: "2px 12px" }}
            className={passwordRequestInProcess ? styles.opacityDecrease : ""}
          >
            განახლება
          </p>
        </BasicButton>
      </form>
    </section>
  );
}
export default Profile;
