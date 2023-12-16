import React, { useEffect, useState, useRef } from "react";
import { getDetail } from "../api/PageInfo";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../components/detail/Carousel";

import AskPageNation from "../components/detail/AskPageNation";
import ReviewPageNation from "../components/detail/ReviewPageNation";
import ItemSelection from "../components/detail/SelectItem";
const Detail: React.FC = () => {
  const customOptions = [
    {
      label: "Color",
      values: [
        { value: "C", label: "차콜" },
        { value: "B", label: "블루" },
        { value: "G", label: "그레이" },
      ],
    },
    {
      label: "Size",
      values: [
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
      ],
    },
  ];
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [isShowDetail, setIsShowDetail] = useState(false);

  const detailInfoRef = useRef<HTMLSpanElement>(null);
  const reviewInfoRef = useRef<HTMLSpanElement>(null);
  const inquiredInfoRef = useRef<HTMLSpanElement>(null);

  const scrollToElement = (targetRef: React.RefObject<HTMLSpanElement>) => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  interface dataRequire {
    id: string;
    imgSrc: string;
    brand: string;
    name: string;
    price: string;
    carouselImg: string[];
    detailImg: string;
  }
  const [data, setData] = useState<dataRequire>();
  const fetchData = async () => {
    const res = await getDetail(id);
    console.log(res);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DetailSection>
      <div className="mainInfo">
        <div className="left">
          <article className="carosel">
            {data?.carouselImg && <Carousel adata={data?.carouselImg} />}
          </article>

          <article className="nav">
            <span onClick={() => scrollToElement(detailInfoRef)}>상품설명</span>
            <span onClick={() => scrollToElement(reviewInfoRef)}>리뷰</span>
            <span onClick={() => scrollToElement(inquiredInfoRef)}>문의</span>
          </article>

          <DetailArticle state={isShowDetail} ref={detailInfoRef}>
            <div className="detailInfo">
              <img src={data?.detailImg} />
            </div>

            <button onClick={() => setIsShowDetail(!isShowDetail)}>
              {isShowDetail ? "상품정보 접기" : "상품정보 더보기"}
            </button>
          </DetailArticle>

          <DetailArticle state={false} ref={reviewInfoRef}>
            <div className="chapter">
              <span>리뷰</span>
            </div>

            <ReviewPageNation />
          </DetailArticle>

          <DetailArticle state={false} ref={inquiredInfoRef}>
            <div className="chapter">
              <span>문의</span>
            </div>

            <AskPageNation />
          </DetailArticle>
        </div>
        <div className="right">
          <div className="option">
            <div className="itemInfo">
              <span>{data?.brand}</span>
              <span className="large wordBreak">{data?.name}</span>
              <span className="middle">{data?.price}</span>
            </div>
          </div>

          <div className="option2">
            <ItemSelection options={customOptions} price={10000} />

   


          </div>
        </div>
      </div>
    </DetailSection>
  );
};

export default Detail;

const DetailSection = styled.section`
  padding: 0 1rem;
  width: 100%;
  min-width: 850px;
  display: flex;
  flex-direction: column;

  .mainInfo {
    display: flex;
    justify-content: center;

    .left {
      padding: 3rem;
      width: 63%;

      max-width: 1200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 80px;

      .carosel {
        width: 100%;
      }
      .nav {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid black;

        span {
          width: 33%;
          text-align: center;
          height: 2rem;
          cursor: pointer;
        }
      }
    }

    .right {
      padding: 3rem;

      width: 30%;
      min-width: 350px;

      display: flex;
      flex-direction: column;

      gap: 1rem;

      .itemInfo {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        overflow: hidden;
      }

      .wordBreak {
        word-wrap: break-word;
      }
      .large {
        font-size: 2rem;
      }
      .middle {
        font-size: 1.5rem;
      }

      .option {
        top: 5rem;
        display: flex;

        flex-direction: column;
        gap: 1rem;
      }

      .option2 {
        position: sticky;
        top: 5rem;
        display: flex;

        flex-direction: column;
        gap: 1rem;
      }

      select {
        height: 3rem;
        text-align: center;
      }
      option {
        font-size: 1rem;
      }
    }

    .brandImg {
      img {
        max-width: 7rem;
        height: 7rem;
      }
    }

    .btnWrap {
      display: flex;
      gap: 1rem;
    }
  }
`;

const DetailArticle = styled.article<{ state: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .detailInfo {
    height: ${(props) => (props.state ? "" : "300px")};
    width: 100%;
    overflow: ${(props) => (props.state ? "" : "hidden")};
    img {
      width: 100%;
    }
  }
  button {
    width: 80%;
  }

  .chapter {
    width: 100%;
    border-bottom: 4px solid black;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 4rem;
  }
`;



const PageNationBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

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
`;
