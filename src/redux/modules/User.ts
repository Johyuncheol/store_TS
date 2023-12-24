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
            //clear로 한번에 지울수있지만
            //추후 지워지면 안되는 정보를 담을수도있어서 우선은 유지
            sessionStorage.clear();
        }
    }
})

export const {LOGIN_USER, LOGOUT_USER} = UserInfoSlice.actions
export default UserInfoSlice.reducer

