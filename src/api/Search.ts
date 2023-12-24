import { BASE_URL } from "./const";
import axios from "axios";


export const searchAPI = async (text:string,page:number) => {
    try {

      const res = await axios.get(`${BASE_URL}/search?text=${text}&page=${page}`);
      console.log(res);
      return res.data.data;
  
    } catch (error) {
      console.error("Error fetching main data:", error);
      throw error; 
    }
  };