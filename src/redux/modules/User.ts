import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    name:null
}

const UserInfoSlice = createSlice({
    name: "setUserInfo",
    initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            state.name=action.payload.name;
        }
    }
})

export const {setUserInfo} = UserInfoSlice.actions
export default UserInfoSlice.reducer

