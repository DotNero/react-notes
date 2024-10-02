import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user_id: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setToken: (state, action) => void(state.token = action.payload),
      setUserId: (state, action) => void(state.user_id = action.payload),
      clearAuth: (state) => {
        state.token = null;
        state.user_id = null;
      },
    },
  });
  
  export const { setToken, setUserId, clearAuth } = authSlice.actions;
  export default authSlice.reducer;