import { BASE_URL } from "./const";
import axios from "axios";

export const getShoppingBag=async()=>{
    const res = await axios.get(`${BASE_URL}/shoppingBag`);
    console.log(res);

    return res.data
}