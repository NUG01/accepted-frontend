export const validation = (values, setNameError, setSurnameError) => {
  const errors = {};
  const regexGeorgian = /^[ა-ჰ]{0,}$/;

  if (!values.name) {
    setNameError(true);
    errors.name = "სახელი აუცილებელია";
  } else if (!values.name.match(regexGeorgian)) {
    setNameError(true);
    errors.name = "უნდა შედგებოდეს მხოლოდ ქართული სიმბოლოებისაგან";
  } else if (values.name.length < 2) {
    setNameError(true);
    errors.name = "უნდა შეცავდეს მინიმუმ 2 სიმბოლოს";
  } else if (values.name.length > 16) {
    setNameError(true);
    errors.name = "უნდა შეცავდეს მაქსიმუმ 16 სიმბოლოს";
  } else {
    setNameError(false);
  }

  if (!values.surname) {
    errors.surname = "გვარი აუცილებელია";
    setSurnameError(true);
  } else if (!values.surname.match(regexGeorgian)) {
    errors.surname = "უნდა შედგებოდეს მხოლოდ ქართული სიმბოლოებისაგან";
    setSurnameError(true);
  } else if (values.surname.length < 2) {
    setSurnameError(true);
    errors.surname = "უნდა შეცავდეს მინიმუმ 2 სიმბოლოს";
  } else if (values.surname.length > 16) {
    setSurnameError(true);
    errors.surname = "უნდა შეცავდეს მაქსიმუმ 16 სიმბოლოს";
  } else {
    setSurnameError(false);
  }

  return errors;
};
