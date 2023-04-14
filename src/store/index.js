import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import generalTestReducer from "./tests/general";

const store = configureStore({
  reducer: { auth: authReducer, generalTest: generalTestReducer },
});

export default store;
