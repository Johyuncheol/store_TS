import { BASE_URL } from "./const";
import axios from "axios";

interface LoginRequest {
  id: string;
  password: string;
}
export const LoginAPI = async (user: LoginRequest) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    alert(error);
  }
};

export const CheckIsLoginAPI = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/islogin`,null);
    console.log(res)
    return res;
  } catch (error) {
    alert(error);
  }
};

export const LogoutAPI = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/logout`,null);
    console.log(res)
    return res.status;
  } catch (error) {
    alert(error);
  }
};
