import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('token')?localStorage.getItem('token'):'';
const initialUser = token ? jwtDecode(token) : null;

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser:(state, action)=>{
        state=action.payload;
        return state;
    },
    removeUser: (state) => {
      state={};
      return state;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
