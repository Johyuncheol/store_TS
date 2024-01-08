import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMainAPI } from "../api/Main";

import { usePageCache } from "../hooks/usePageCache";

const MainCarousel = React.lazy(
  () => import("../components/main/MainCarousel")
);
const SmallCarousel = React.lazy(
  () => import("../components/main/SmallCarousel")
);
const HalfCarousel = React.lazy(
  () => import("../components/main/HalfCarousel")
);
const Main: React.FC = () => {
  const { cacheData, setPageKey } = usePageCache(() => getMainAPI());

  useEffect(() => {
    setPageKey(["main"]);
  }, []);

  return (
    <>
      {cacheData ? (
        <>
          <ItemSection>
            <MainCarousel adata={cacheData.MainBanner} />
            <ItemBox1>
              <FigureQuarter>
                <img
                  src="https://cdn.pixabay.com/photo/2022/11/01/17/44/showroom-7562924_1280.jpg"
                  alt=""
                />
                <span className="detail">
                  EveryDay: <br /> 쇼룸
                </span>
              </FigureQuarter>
              <FigureQuarter>
                <img
                  src="https://cdn.pixabay.com/photo/2022/04/30/20/45/friendship-7166375_1280.jpg"
                  alt=""
                />
                <span className="detail">
                  EveryDay: <br />
                  크루 취향
                </span>
              </FigureQuarter>

              <FigureHalf>
                <img
                  src="https://cdn.pixabay.com/photo/2019/01/01/12/17/clothing-3906637_1280.jpg"
                  alt=""
                />
                <span className="detail">
                  EveryDay: <br />
                  Best
                </span>
              </FigureHalf>
            </ItemBox1>

            <Border />

            <ItemBox>
              <SmallCarousel
                adata={cacheData.PopularRelated}
                category={"요즘 뜨는 제품"}
                width={"20vw"}
                height="18.156rem"
              />
              <SmallCarousel
                adata={cacheData.PopularRelated}
                category={"요즘 뜨는 제품"}
                width={"20vw"}
                height="18.156rem"
              />
            </ItemBox>

            <Border />
            <ItemBox>
              <FigureWhole>
                <img
                  src="https://cdn.pixabay.com/photo/2017/03/25/03/19/the-work-2172684_1280.jpg"
                  alt=""
                />
                <span className="detail"> 일상의 자연스러움</span>
              </FigureWhole>

              <SmallCarousel
                adata={cacheData.PopularRelated}
                category={"관련 상품"}
                width={"20vw"}
                height="18.156rem"
              />
            </ItemBox>
            <Border />

            <ItemBox>
              <ItemBox1>
                <FigureHalf>
                  <img
                    src="https://cdn.pixabay.com/photo/2017/03/25/03/19/the-work-2172684_1280.jpg"
                    alt=""
                  />
                  <span className="detail"> 일상의 자연스러움</span>
                </FigureHalf>
                <FigureHalf>
                  <img
                    src="https://cdn.pixabay.com/photo/2017/03/25/03/19/the-work-2172684_1280.jpg"
                    alt=""
                  />
                  <span className="detail"> 일상의 자연스러움</span>
                </FigureHalf>
              </ItemBox1>

              <SmallCarousel
                adata={cacheData.PopularRelated}
                category={"관련 상품"}
                width={"20vw"}
                height="18.156rem"
              />
            </ItemBox>
            <Border />
            {/*  <span className="contentsName">무심한듯 가볍게</span> */}
            <ItemBox>
              <HalfCarousel adata={cacheData.Recommend} />

              <SmallCarousel
                adata={cacheData.RecommendRelated}
                category={"크루 추천"}
                width={"20vw"}
                height="12.156rem"
              />
            </ItemBox>
          </ItemSection>
        </>
      ) : (
        <>스켈레톤 자리</>
      )}
    </>
  );
};

export default Main;

const FigureWhole = styled.figure`
  width: 100%;

  height: 300px;
  margin: 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    &:hover {
      filter: brightness(0.8);
    }
  }
  .detail {
    position: absolute;
    bottom: 10%;
    left: 5%;
    color: white;

    font-size: 2rem;
  }
`;

const FigureHalf = styled.figure`
  width: 50%;
  max-width: 1600px;
  height: calc(width + 30px);
  max-height: 300px;
  margin: 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    &:hover {
      filter: brightness(0.8);
    }
  }
  .detail {
    position: absolute;
    bottom: 10%;
    left: 5%;
    color: white;

    font-size: 2rem;
  }
`;

const FigureQuarter = styled.figure`
  width: 25%;
  max-width: 1600px;
  height: calc(width + 30px);
  max-height: 300px;
  margin: 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    &:hover {
      filter: brightness(0.8);
    }
  }
  .detail {
    position: absolute;
    bottom: 10%;
    left: 5%;
    color: white;

    font-size: 2rem;
  }
`;

const ItemSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4rem;
`;
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4rem;

  padding-top: 5rem;
`;

const ItemBox1 = styled.div`
  display: flex;
  gap: 1rem;
`;

const Border = styled.div`
  width: 30%;
  border: 0.5rem solid black;
`;
