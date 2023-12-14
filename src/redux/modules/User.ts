import { createSlice } from "@reduxjs/toolkit";

interface UserInfoState {
  name: string | null;
}

// 세션 스토리지에서 사용자 정보 가져오기
const loadUserInfoFromSessionStorage = (): UserInfoState => {
  const userInfoString = sessionStorage.getItem("userInfo");
  return userInfoString ? JSON.parse(userInfoString) : { name: null };
};

const initialState: UserInfoState = loadUserInfoFromSessionStorage();


const UserInfoSlice = createSlice({
    name: "setUserInfo",
    initialState,
    reducers:{
        LOGIN_USER:(state,action)=>{
            state.name=action.payload.name;
            sessionStorage.setItem("userInfo", JSON.stringify(state));

        },

        LOGOUT_USER:(state,action)=>{
            state.name=action.payload.name;
            sessionStorage.removeItem("userInfo");
        }
    }
})

export const {LOGIN_USER, LOGOUT_USER} = UserInfoSlice.actions
export default UserInfoSlice.reducer

