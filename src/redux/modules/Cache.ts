import { createSlice } from "@reduxjs/toolkit";
import { pageCacheType } from "../../types/Types";
import { Map } from 'immutable'; 

const initialState: Map<string, pageCacheType> = Map<string, pageCacheType>();

const CacheSlice = createSlice({
  name: "Cache",
  initialState,
  reducers: {
      PAGE_CACHE: (state, action) => {
        return state.set(action.payload.key, action.payload.data)
    },
  },
});

export const { PAGE_CACHE } = CacheSlice.actions;
export default CacheSlice.reducer;
