import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { pageNationType } from "../types/Types";

//페이지네이션 커스텀 훅
// 전체 데이터, 보여지는 데이터, 페이지넘버
// API요청 캐싱 기능

export const usePagination = (
  api: () => Promise<AxiosResponse<any, any>>,
  numOfShow: number
) => {
  const [data, setData] = useState<pageNationType[]>([]);
  const [showData, setShowData] = useState<pageNationType[]>();
  const [currentPage, setCurrentPage] = useState(1);

  const [pageNums, setPageNums] = useState<number[]>([]);
  const [cachedData, setCachedData] = useState<number[]>([]);

  const fetchData = async () => {
    // 이미 요청 보낸 페이지라면
    if (cachedData && cachedData.includes(currentPage)) return 0;

    const res = await api();
    console.log(res);
    setData((prev) => [...res.data.data, ...prev]);

    const pageLength = Math.ceil(res.data.totalNums / numOfShow);
    const newArray = Array.from({ length: pageLength }).map(
      (_, index) => index + 1
    );
    setPageNums(newArray);

    // 캐시데이터에 저장
    setCachedData((prev) => [...prev, currentPage]);
  };

  //처음 랜더링 됐을 때 첫페이지만 캐시에 저장 
  useEffect(() => {
    setCachedData([1]);
  }, []);

  //페이지 변경시 요청
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  //data가 변경되거나 페이지가 변경되었을때 보여지는 데이터 변경
  useEffect(() => {
    const count = currentPage * numOfShow;
    if (data) {
      setShowData(data.slice(count - numOfShow, count));
    }
  }, [data, currentPage]);

  // 좌 우 이동버튼
  const movePageBtnHandler = (type: string) => {
    if (type === "left" && currentPage !== 1) setCurrentPage(currentPage - 1);
    else if (type === "right" && currentPage < pageNums[pageNums.length-1]) setCurrentPage(currentPage + 1);
  };

  return {
    showData,
    pageNums,
    currentPage,
    setCurrentPage,
    movePageBtnHandler,
  };
};
