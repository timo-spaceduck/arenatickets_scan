import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {deleteToken, setToken} from '../services/token.service';

const initialState = {
  user: null,
  token: null,
};

export const deleteTokenThunk = createAsyncThunk(
  'users/deleteToken',
  async () => {
    await deleteToken();
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      // await deleteToken();
      // deleteToken().then(() => {
      state.user = null;
      // });
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteTokenThunk.fulfilled, state => {
      state.user = null;
    });
  },
});

export const {setUser, logout} = userSlice.actions;

export default userSlice.reducer;
