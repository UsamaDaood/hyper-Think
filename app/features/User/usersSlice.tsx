import {createSlice} from '@reduxjs/toolkit';
import {userLoginAsync} from './thunks';

const initialState = {
  userDetails: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(userLoginAsync.fulfilled, (state, action) => {
      const data: any = action.payload,
        {token} = data || {};
      if (token) {
        state.userDetails = action.payload;
        // return data;
      }
    });
  },
});
export const {logoutUser} = userSlice.actions;
export const user = userSlice.reducer;
