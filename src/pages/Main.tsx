import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMainAPI } from "../api/Main";
import S_MainCarousel from "../components/main/skeleton/MainCarousel";
import S_HalfCarousel from "../components/main/skeleton/HalfCarousel";
import S_SmallCarousel from "../components/main/skeleton/SmallCarousel";
import { usePageCache } from "../hooks/usePageCache";

const MainCarousel = React.lazy(
  () => import("../components/main/MainCarousel")
);
const CategoryNav = React.lazy(() => import("../components/main/CategoryNav"));
const SmallCarousel = React.lazy(
  () => import("../components/main/SmallCarousel")
);
const HalfCarousel = React.lazy(
  () => import("../components/main/HalfCarousel")
);

const Main: React.FC = () => {

  const { cacheData, setPageKey } = usePageCache(() =>
    getMainAPI()
  );

  useEffect(()=>{
    setPageKey(['main'])
  },[])


  return (
    <section>
      {cacheData ? (
        <>
          <MainCarousel adata={cacheData.MainBanner} />

          <CategoryNav />

          <ItemSection>
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

            <ItemBox1>
              <span className="contentsName">무심한듯 가볍게</span>

              <HalfCarousel adata={cacheData.Recommend} />

              <SmallCarousel
                adata={cacheData.RecommendRelated}
                category={"MD 추천"}
                width={"20vw"}
                height="12.156rem"
              />
            </ItemBox1>

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
          </ItemSection>
        </>
      ) : (
        <>
          <S_MainCarousel />

          <CategoryNav />

          <ItemSection>
            <ItemBox>
              <S_SmallCarousel />

              <S_SmallCarousel />
            </ItemBox>

            <ItemBox1>
              <span className="contentsName">무심한듯 가볍게</span>

              <S_HalfCarousel />

              <S_SmallCarousel />
            </ItemBox1>

            <ItemBox>
              <S_SmallCarousel />

              <S_SmallCarousel />
            </ItemBox>
          </ItemSection>
        </>
      )}
    </section>
  );
};

export default Main;

const ItemSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10rem;
`;
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 4rem;
`;

const ItemBox1 = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #363535;
  color: whitesmoke;
  border-top-right-radius: 30px;
  gap: 4rem;
  padding: 8rem 1rem 10rem 2rem;

  .contentsName {
    font-size: 2rem;
    font-weight: 600;
  }
`;
