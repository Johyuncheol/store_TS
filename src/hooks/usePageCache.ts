import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { pageCacheType } from "../types/Types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/config";
import { PAGE_CACHE } from "../redux/modules/Cache";

// 서버로 부터 받아오는 데이터를 캐싱하는 함수 

export const usePageCache = (api: () => Promise<AxiosResponse<any, any>>) => {
  const dispatch = useDispatch();
  const cacheRedux = useSelector((state: RootState) => state.Cache);

  const [cacheData, setCacheData] = useState<pageCacheType>(); // 컴포넌트로 전달해줄 데이터

  const [pageKey, setPageKey] = useState<any>([]); // 데이터를 구분할 키값

  //API 수행 및 캐싱 진행 
  const fetchData = async () => {

    const cacheKey = `${pageKey.join("-")}`; //키값 설정  
    console.log(cacheRedux)
    // 이미 요청 보낸 페이지라면 메모리에서 추출 
    if (cacheRedux.has(cacheKey)) {
 
      setCacheData(cacheRedux.get(cacheKey));

      return;
    }

    try {
      const res = await api(); // 서버로 요청 
        
      setCacheData(res.data.data);
      console.log(1)
      // 캐시데이터에 저장
      dispatch(PAGE_CACHE({ key: cacheKey, data: res.data.data }));
      console.log(cacheRedux)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageKey]);

  return {
    cacheData,
    pageKey,
    setPageKey,
  };
};
