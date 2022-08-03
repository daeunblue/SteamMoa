import { createSlice } from "@reduxjs/toolkit";


export const AuthSlice = createSlice(
  {
      name:"auth",
      initialState:{
          isLoggedIn:false, //인증상태
          token:null, //access token
          userId: null,
        },
      reducers:{
          SET_AUTH:(state,action) => {
              state.isLoggedIn = true; 
              state.token = action.token;
              state.userId = action.userId;
          },
          DELETE_AUTH:(state) => {
            state.isLoggedIn = false; 
            state.token = null;
            state.userId = null;
          }
      }
  }
)

export const {
  SET_AUTH,
  DELETE_AUTH
} = AuthSlice.actions;

export default AuthSlice.reducer;