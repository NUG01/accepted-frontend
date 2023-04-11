export const getJwtToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`is_authenticated=`);
  const token = parts.length === 2 ? parts.pop().split(";").shift() : null;

  return token;
};

export const setJwtToken = (value, expires_in) => {
  let expires = new Date();
  expires.setTime(expires.getTime() + expires_in * 1000);
  document.cookie = `is_authenticated=${value}; expires=${expires.toUTCString()}; path=/`;
};
