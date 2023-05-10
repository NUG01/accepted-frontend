import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import generalTestReducer from "./tests/general";
import notificationReducer from "./Notifications.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    generalTest: generalTestReducer,
    notifications: notificationReducer,
  },
});

export default store;
