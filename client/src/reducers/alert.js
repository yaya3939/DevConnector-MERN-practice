import { createSlice, nanoid } from "@reduxjs/toolkit";

export const alertsSlice = createSlice({
  name: "alerts",
  initialState: [],
  reducers: {
    setAlert: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (msg, alertType) => {
        return {
          payload: { msg, alertType, id: nanoid() },
        };
      },
    },
    removeAlert(state, action) {
      state.pop();
    },
  },
});

export const { setAlert, removeAlert } = alertsSlice.actions;

export const alertAsync = (msg, alertType, time) => (dispatch) => {
  dispatch(setAlert(msg, alertType));
  setTimeout(() => {
    dispatch(removeAlert());
  }, time);
};

export default alertsSlice.reducer;
