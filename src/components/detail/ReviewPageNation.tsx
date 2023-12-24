import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getReview } from "../../api/Detail";
import { usePagination } from "../../hooks/usePageNation";

const ReviewPageNation: React.FC = () => {
  const {
    showData,
    pageNums,
    currentPage,
    setCurrentPage,
    movePageBtnHandler,
  } = usePagination(() => getReview("0", currentPage), 6);

  const [showAllIndex, setShowAllIndex] = useState<number>();
  const showAll = (index: number) => {
    if (index === showAllIndex) return setShowAllIndex(-1);
    setShowAllIndex(index);
  };
  return (
    <PageNationBox>
      {showData?.map((item, index) => {
        if (
          "star" in item &&
          "option" in item &&
          "detail" in item &&
          "date" in item &&
          "user" in item &&
          "imgUrl" in item
        )
          return (
            <ReviewCard
              size={`${showAllIndex === index ? "true" : "false"}`}
              key={index}
              onClick={() => showAll(index)}
            >
              <div className="header">
                <div>
                  <span>*****</span>
                  <span>{item.user}</span>
                </div>
                <span>{item.date}</span>
              </div>

              <div className="main">
                <div className="mainInfo">
                  <span>{item.option}</span>
                  <span className="detail">{item.detail}</span>
                </div>
                <img src={item.imgUrl} />
              </div>
            </ReviewCard>
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
        <span onClick={() => movePageBtnHandler("right")}>{">"}</span>
      </div>
    </PageNationBox>
  );
};

export default ReviewPageNation;

const PageNationBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .bold {
    font-weight: 600;
  }

  .grey {
    color: grey;
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

const ReviewCard = styled.div<{ size: string }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid black;
  padding: 10px 0;
  cursor: pointer;
  span {
    word-break: break-all;
  }
  .header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }

  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${(props) => (props.size === "true" ? "300px" : "")};

    .mainInfo {
      flex-direction: column;
    }

    .detail {
      overflow: ${(props) => (props.size === "true" ? "hidden" : "")};
    }
  }

  img {
    width: 8rem;
  }
`;
