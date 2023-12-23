import { BASE_URL } from "./const";
import axios from "axios";

interface LoginRequest {
  id: string;
  password: string;
}

export const LoginAPI = async (user: LoginRequest) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });
    return res.data.data;
  } catch (error) {
    alert(error);
  }
};


export const CheckIsLoginAPI = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/islogin`,null,{withCredentials: true});
    console.log(res)
    return res;
  } catch (error) {
    alert(error);
  }
};

export const LogoutAPI = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/logout`,null);
    console.log(res)
    return res.status;
  } catch (error) {
    alert(error);
  }
};


interface RegisterRequest {
  id: string;
  password: string;
  nickName:string;
}

export const RegisterAPI = async (user: RegisterRequest) => {
  console.log(user)
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, user, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    return res;
  } catch (error) {
    alert(error);
  }
};