import SanctumAxios from "../helpers/axios/SanctumAxios";
import BasicAxios from "../helpers/axios/index";

export const csrf = async () => {
  const csrfResponse = await SanctumAxios.get("/sanctum/csrf-cookie");
  return csrfResponse;
};

export const getUser = async () => {
  const {data} = await BasicAxios.get("/user");
  return data.user;
};
