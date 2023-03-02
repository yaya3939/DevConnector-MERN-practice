import { combineReducers } from "redux";
import alertsReducer from "./alert";
import authReducer from "./auth";
import profileReducer from "./profile";
import postReducer from "./post";

export default combineReducers({
  alerts: alertsReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
});

// export default configureStore({
//   reducer: {
//     posts: postsReducer
//   }
// })

// 这告诉 Redux 我们希望我们的根部 state 对象内部有一个名为 posts 的字段，
//并且 state.posts 的所有数据都将在 dispatch action 时由 postsReducer 函数更新。
