import { BASE_URL } from "./const";
import axios from "axios";
interface Item {
  id: number;
  imgSrc: string;
}

interface MainData {
  MainBanner: Item[];
  Popular: Item[];
  PopularRelated: Item[];
  Recommend: Item[];
  RecommendRelated: Item[];
  Sale: Item[];
  SaleRelated: Item[];
}

export const getMainAPI = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/main`);
      console.log(res)
      return res
    } catch (error) {
      console.error("Error fetching main data:", error);
      throw error; 
    }
  };

