import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { pageNationType } from "../types/Types";

//키값을 통한 지역적 캐싱기능이 추가된 페이지네이션
export const usePagination = (
  api: () => Promise<AxiosResponse<any, any>>,
  numOfShow: number
) => {
  const [showData, setShowData] = useState<pageNationType[]>(); //보여줄 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const [pageNums, setPageNums] = useState<number[]>([]); //총 페이지넘버들
  const [cachedData, setCachedData] = useState<Map<string, pageNationType[]>>( //캐시데이터 담는 곳
    new Map()
  );
  const [key, setKey] = useState<any>([]); // 캐싱된 데이터들을 구분할 키요소 배열

  const fetchData = async () => {
    const cacheKey = `${currentPage}-${key.join("-")}`; //키생성

    // 이미 요청 보낸 페이지라면
    if (cachedData.has(cacheKey)) {
      setShowData(cachedData.get(cacheKey));

      return;
    }
    // 새로운 요청이라면
    try {
      const res = await api();
      setShowData(res.data.data);

      const pageLength = Math.ceil(res.data.totalNums / numOfShow); // 전체 페이지 수
      const newArray = Array.from({ length: pageLength }).map(
        (_, index) => index + 1
      );
      setPageNums(newArray);

      // 캐시데이터에 저장
      setCachedData(new Map(cachedData).set(cacheKey, res.data.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //키와 페이지 변화에 따라 변경
  useEffect(() => {
    fetchData();
  }, [currentPage, key]);

  // 좌우 이동 버튼
  const movePageBtnHandler = (type: string) => {
    if (type === "left" && currentPage !== 1) setCurrentPage(currentPage - 1);
    else if (type === "right" && currentPage < pageNums[pageNums.length - 1])
      setCurrentPage(currentPage + 1);
  };

  return {
    showData,
    pageNums,
    currentPage,
    setCurrentPage,
    movePageBtnHandler,
    setKey,
  };
};
