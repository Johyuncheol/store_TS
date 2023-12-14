import { BASE_URL } from "./const";
import axios from "axios";



export const getCategoryData = async (path:string,page:number) => {
    try {
      console.log(path)
      const res = await axios.get(`${BASE_URL}/category/${path}?&page=${page}`);
        console.log(res.data)

      return res
    } catch (error) {
      console.error("Error fetching main data:", error);
      throw error; 
    }
  };

