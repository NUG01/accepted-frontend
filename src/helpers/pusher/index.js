import Echo from "laravel-echo";
import BasicAxios from "../axios/index";
import { useSelector } from "react-redux";

export const BasicEcho = () => {
  const userId = useSelector((state) => state.auth.user.id);

  // const echo = () =>
  window.Pusher = Pusher;
  const echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
    authorizer: (channel) => {
      return {
        authorize: (socketId, callback) => {
          BasicAxios.post("/broadcasting/auth", {
            socket_id: socketId,
            channel_name: "notifications." + userId,
          })
            .then((response) => {
              callback(null, response.data);
            })
            .catch((error) => {
              callback(error);
            });
        },
      };
    },
  });
  return echo;
};

// export default pusher;
