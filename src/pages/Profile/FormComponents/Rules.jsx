export const validation = (values, setNameError, setSurnameError) => {
  const errors = {};
  const regexGeorgian = /^[ა-ჰ]{2,16}$/;

  if (!values.name) {
    setNameError(true);
    errors.name = "სახელი აუცილებელია";
  } else if (!values.name.match(regexGeorgian)) {
    setNameError(true);
    errors.name = "უნდა შედგებოდეს მხოლოდ ქართული სიმბოლოებისაგან";
  } else {
    setNameError(false);
  }

  if (!values.surname) {
    errors.surname = "გვარი აუცილებელია";
    setSurnameError(true);
  } else if (!values.surname.match(regexGeorgian)) {
    errors.surname = "უნდა შედგებოდეს მხოლოდ ქართული სიმბოლოებისაგან";
    setSurnameError(true);
  } else {
    setSurnameError(false);
  }

  return errors;
};
