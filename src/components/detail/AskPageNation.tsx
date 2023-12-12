import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAsk } from "../../api/PageInfo";
import { usePagination } from "../../hooks/usePageNation";

const AskPageNation: React.FC = () => {
  const {
    showData,
    pageNums,
    currentPage,
    setCurrentPage,
    ExistNext,
    movePageBtnHandler,
  } = usePagination(getAsk);

  
  return (
    <PageNationBox currentPage={currentPage}>
      {showData?.map((item) => {
        if ("owner" in item)
          return (
            <div className="review">
              <div className="header">
                <span>{item.owner}</span>
                <span>{item.date}</span>
              </div>

              <div className="main">
                <div className="mainInfo">
                  <span>{item.state}</span>
                  <span>{item.title}</span>
                </div>
                <div>
                  비밀번호 : <input type="text" />
                </div>
              </div>
            </div>
          );
      })}
      <div className="pageNums">
        <span onClick={() => movePageBtnHandler("left")}>{"<"}</span>
        {pageNums.map((item, index) => {
          return currentPage === item ? (
            <span
              className="bold"
              key={index}
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </span>
          ) : (
            <span
              className="grey"
              key={index}
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </span>
          );
        })}
        {ExistNext && <span>...</span>}
        <span onClick={() => movePageBtnHandler("right")}>{">"}</span>
      </div>
    </PageNationBox>
  );
};

export default AskPageNation;

const PageNationBox = styled.div<{ currentPage: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;

  .bold {
    font-weight: 600;
  }

  .grey {
    color: grey;
  }

  .review {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid black;
    padding: 10px 0;

    .header {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
    }
  }

  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .mainInfo {
      flex-direction: column;
    }
  }

  img {
    width: 8rem;
  }

  .pageNums {
    display: flex;
    justify-content: center;
    gap: 1rem;

    span {
      cursor: pointer;
    }
  }
`;
