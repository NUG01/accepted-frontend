import styles from "./ErrorContainer.module.scss";
import ExclamationIcon from "../../assets/icons/ExclamationIcon";
import { useState } from "react";

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
          <div className={styles.iconContainer}>
            <div>
              <ExclamationIcon></ExclamationIcon>
            </div>
            <div>სახელი</div>
          </div>
          <ul className={styles.ul}>
            <li>მხოლოდ ქართული სიმბოლოები</li>
            <li>მინიმუმ 2 და მაქსიმუმ 16 სიმბოლო</li>
          </ul>
        </div>
      )}
      {surnameError && (
        <div className={styles.ulContainer}>
          <div className={styles.iconContainer}>
            <div>
              <ExclamationIcon></ExclamationIcon>
            </div>
            <div>გვარი</div>
          </div>
          <ul className={styles.ul}>
            <li>მხოლოდ ქართული სიმბოლოები</li>
            <li>მინიმუმ 2 და მაქსიმუმ 16 სიმბოლო</li>
          </ul>
        </div>
      )}
      {emailError && (
        <div className={styles.ulContainer}>
          <div className={styles.iconContainer}>
            <div>
              <ExclamationIcon></ExclamationIcon>
            </div>
            <div>ელ.ფოსტა</div>
          </div>
          <ul className={styles.ul}>
            <li>მეილის ფორმატი</li>
          </ul>
        </div>
      )}
      {passwordError && (
        <div className={styles.ulContainer}>
          <div className={styles.iconContainer}>
            <div>
              <ExclamationIcon></ExclamationIcon>
            </div>
            <div>პაროლი</div>
          </div>
          <ul className={styles.ul}>
            <li>მხოლოდ ლათინური სიმბოლოები</li>
            <li>მინიმუმ ერთი ციფრი</li>
            <li>მინიმუმ რვა სიმბოლო </li>
            <li>მინიმუმ ერთი დაბალი რეგისტრის სიმბოლოო</li>
            <li>მინიმუმ ერთი მაღალი რეგისტრის სიმბოლოო </li>
          </ul>
        </div>
      )}
      {passwordConfirmError && (
        <div className={styles.ulContainer}>
          <div className={styles.iconContainer}>
            <div>
              <ExclamationIcon></ExclamationIcon>
            </div>
            <div>პაროლის გამეორება</div>
          </div>
          <ul className={styles.ul}>
            <li>პაროლის ველის ანალოგიური</li>
          </ul>
        </div>
      )}
      {checkboxError && (
        <div className={styles.ulContainer}>
          <div className={styles.iconContainer}>
            <div>
              <ExclamationIcon></ExclamationIcon>
            </div>
            <div>როლის არჩევა</div>
          </div>
          <ul className={styles.ul}>
            <li>როლის არჩევა აუცილებელია</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ErrorContainer;
