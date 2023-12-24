import { BASE_URL } from "./const";
import axios from "axios";

export const getShoppingBagAPI=async()=>{
    const res = await axios.get(`${BASE_URL}/shoppingBag`);

    return res.data.data
}

interface ItemValue {
    value: string;
    label: string;
  }

interface ItemRequire {
    [key: string]: string | number | ItemValue;
    count: number;
  }

export const putInShoppingBagAPI=async(data :string)=>{
  console.log(data);
  //data 형태 JSON.parse 로 변형한 타입으로 해야함 string 아님 
    const res = await axios.post(`${BASE_URL}/shoppingBag`,data);

}