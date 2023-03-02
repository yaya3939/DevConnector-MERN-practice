// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "@redux-devtools/extension";

// const middleware = [thunk];
// const initialState = {};

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))  //RTK 自动配置了thunk、devtools
// );

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
