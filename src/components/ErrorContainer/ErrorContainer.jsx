import styles from "./ErrorContainer.module.scss";
import ErrorHeader from "./ErrorHeader";

import React from "react";

function ErrorContainer(props) {
  const nameError = props.nameError;
  const surnameError = props.surnameError;
  const emailError = props.emailError;
  const passwordError = props.passwordError;
  const passwordConfirmError = props.passwordConfirmError;
  const checkboxError = props.checkboxError;
  return (
    <div className={styles.container}>
      {nameError && (
        <div className={styles.ulContainer}>
          <ErrorHeader>სახელი</ErrorHeader>
          <ul className={styles.ul}>
            <li>მხოლოდ ქართული სიმბოლოები</li>
            <li>მინიმუმ 2 და მაქსიმუმ 16 სიმბოლო</li>
          </ul>
        </div>
      )}
      {surnameError && (
        <div className={styles.ulContainer}>
          <ErrorHeader>გვარი</ErrorHeader>
          <ul className={styles.ul}>
            <li>მხოლოდ ქართული სიმბოლოები</li>
            <li>მინიმუმ 2 და მაქსიმუმ 16 სიმბოლო</li>
          </ul>
        </div>
      )}
      {emailError && (
        <div className={styles.ulContainer}>
          <ErrorHeader>ელ.ფოსტა</ErrorHeader>

          <ul className={styles.ul}>
            <li>მეილის ფორმატი</li>
          </ul>
        </div>
      )}
      {passwordError && (
        <div className={styles.ulContainer}>
          <ErrorHeader>პაროლი</ErrorHeader>
          <ul className={styles.ul}>
            <li>მხოლოდ ლათინური სიმბოლოები</li>
            <li>მინიმუმ ერთი ციფრი</li>
            <li>მინიმუმ რვა სიმბოლო </li>
            <li>მინიმუმ ერთი დაბალი რეგისტრის სიმბოლო</li>
            <li>მინიმუმ ერთი მაღალი რეგისტრის სიმბოლო</li>
          </ul>
        </div>
      )}
      {passwordConfirmError && (
        <div className={styles.ulContainer}>
          <ErrorHeader>პაროლის გამეორება</ErrorHeader>

          <ul className={styles.ul}>
            <li>პაროლის ველის ანალოგიური</li>
          </ul>
        </div>
      )}
      {checkboxError && (
        <div className={styles.ulContainer}>
          <ErrorHeader>როლის არჩევა</ErrorHeader>

          <ul className={styles.ul}>
            <li>როლის არჩევა აუცილებელია</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ErrorContainer;
