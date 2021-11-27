import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  data: {
    user: global?.localStorage?.user
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      
      const accessToken = localStorage.getItem("jwt");
      const user = localStorage.getItem("user");
      return {
        ...state,
        data: {
          accessToken,
          user: JSON.parse(user)
        }
      };
    },
    logout: state => {
      localStorage.removeItem("user");
      return {
        ...state,
        data: {
          user: {}
        }
      }
    },
    update: (state) => {
      return {
        ...state
      }
    }
  }
});

export const {
  login,
  logout,
  update
} = authSlice.actions;

export const selectAuth = state => state.auth.data;
export default authSlice.reducer;