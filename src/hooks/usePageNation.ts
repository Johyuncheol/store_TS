import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { pageNationType } from "../types/pageNation";

//페이지네이션 커스텀 훅 
// 전체 데이터, 보여지는 데이터, 페이지넘버 
// API요청 캐싱 기능  
export const usePagination = (
  api: (id: string, page: number) => Promise<AxiosResponse<any, any>>
) => {
  const numOfShow = 6;
  const [data, setData] = useState<pageNationType[]>([]);
  const [showData, setShowData] = useState<pageNationType[]>();
  const [currentPage, setCurrentPage] = useState(1);

  const [pageNums, setPageNums] = useState<number[]>([]);
  const [cachedData, setCachedData] = useState<number[]>([]);

  const [ExistNext, setExistNext] = useState<boolean>(false);

  const fetchData = async () => {
    // 이미 요청 보낸 페이지라면
    if (cachedData && cachedData.includes(currentPage)) return 0;

    const res = await api("0", currentPage);
    setData((prev) => [...res.data, ...prev]);

    if (res.status === 201) setExistNext(true);
    else setExistNext(false);

    // 캐시데이터에 저장
    setCachedData((prev) => [...prev, currentPage]);
  };

  //처음 랜더링 됐을 때 5페이지(6개씩 5페이지)는 기본으로 가져옴
  useEffect(() => {
    setCachedData([1, 2, 3, 4]);
  }, []);

  //페이지 변경시 요청
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  //data가 변경되거나 페이지가 변경되었을때 보여지는 데이터 변경
  useEffect(() => {
    const count = currentPage * numOfShow;

    if (data) {
      const pageLength = Math.ceil(data.length / numOfShow);
      const newArray = Array.from({ length: pageLength }).map(
        (_, index) => index + 1
      );

      setPageNums(newArray);
      setShowData(data.slice(count - numOfShow, count));
    }
  }, [data, currentPage]);

  const movePageBtnHandler = (type: string) => {
    if (type === "left" && currentPage !== 1) setCurrentPage(currentPage - 1);
    else if (type === "right" && ExistNext) setCurrentPage(currentPage + 1);
  };
  return {
    showData,
    pageNums,
    currentPage,
    setCurrentPage,
    ExistNext,
    movePageBtnHandler
  };
};
