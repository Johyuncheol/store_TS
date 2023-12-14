import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../types/Types";
import { MainData } from "../../types/Types";

const initialState:MainData = {
  MainBanner:[],
  Popular:[],
  PopularRelated:[],
  Recommend:[],
  RecommendRelated:[],
  Sale:[],
  SaleRelated: [],
};

const CacheSlice = createSlice({
  name: "Cache",
  initialState,
  reducers: {
    MAIN_CACHE: (state, action) => {
        console.log(action)
        return { ...state, ...action.payload };
    },
  },
});

export const { MAIN_CACHE } = CacheSlice.actions;
export default CacheSlice.reducer;
