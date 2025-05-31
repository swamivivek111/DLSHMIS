import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token')?localStorage.getItem('token'):'';
const jwtSlice=createSlice({
    name:'jwt',
    initialState:token,
    reducers:{
        setJwt:(state, action)=>{
            localStorage.setItem('token', action.payload);
            state=action.payload;
            return state;
        },
        removeJwt:(state)=>{
            localStorage.removeItem('token');
            state='';
            return state;
        }
    }
})

export const {setJwt, removeJwt}=jwtSlice.actions;
export default jwtSlice.reducer;