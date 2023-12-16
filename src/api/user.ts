import { BASE_URL } from "./const";
import axios from "axios";

export const getShoppingBag=async()=>{
    const res = await axios.get(`${BASE_URL}/shoppingBag`);
    console.log(res);

    return res.data
}

interface ItemValue {
    value: string;
    label: string;
  }

interface ItemRequire {
    [key: string]: string | number | ItemValue;
    count: number;
  }

export const putInShoppingBag=async(data :string)=>{
    const res = await axios.post(`${BASE_URL}/shoppingBag`,data);

}