import { BASE_URL } from "./const";
import axios from "axios";



export const getCategoryData = async (category:string,detail:string) => {
    try {
      console.log("111111111111111",detail)
      const res = await axios.get(`${BASE_URL}/category/${category}/${detail}`);
        console.log(res.data)

      return res.data
    } catch (error) {
      console.error("Error fetching main data:", error);
      throw error; 
    }
  };