import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MainCarousel from "../components/main/MainCarousel";
import CategoryNav from "../components/main/CategoryNav";
import SmallCarousel from "../components/main/SmallCarousel";
import HalfCarousel from "../components/main/HalfCarousel";
import { getMain } from "../api/PageInfo";
import S_MainCarousel from "../components/main/skeleton/MainCarousel";
import S_HalfCarousel from "../components/main/skeleton/HalfCarousel";
import S_SmallCarousel from "../components/main/skeleton/SmallCarousel";
const Main: React.FC = () => {
  interface Item {
    id: number;
    imgSrc: string;
  }

  interface MainData {
    MainBanner: Item[];
    Popular: Item[];
    PopularRelated: Item[];
    Recommend: Item[];
    RecommendRelated: Item[];
    Sale: Item[];
    SaleRelated: Item[];
  }

  const [data, setData] = useState<MainData>();

  // main 페이지 구성에 필요한 데이터를 받아오는 함수
  const fetchData = async () => {
    const res = await getMain();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      {data ? <MainCarousel adata={data.MainBanner} /> : <S_MainCarousel />}

      <CategoryNav />

      <ItemSection>
        <ItemBox>
          {data ? (
            <SmallCarousel
              adata={data.PopularRelated}
              category={"요즘 뜨는 제품"}
              width={"20vw"}
              height="18.156rem"
            />
          ) : (
            <S_SmallCarousel />
          )}{" "}
          {data ? (
            <SmallCarousel
              adata={data.PopularRelated}
              category={"요즘 뜨는 제품"}
              width={"20vw"}
              height="18.156rem"
            />
          ) : (
            <S_SmallCarousel />
          )}
        </ItemBox>

        <ItemBox1>
          <span className="contentsName">무심한듯 가볍게</span>

          {data ? <HalfCarousel adata={data.Recommend} /> : <S_HalfCarousel />}
          {data ? (
            <SmallCarousel
              adata={data.RecommendRelated}
              category={"MD 추천"}
              width={"20vw"}
              height="12.156rem"
            />
          ) : (
            <S_SmallCarousel />
          )}
        </ItemBox1>

        <ItemBox>
          {data ? (
            <SmallCarousel
              adata={data.PopularRelated}
              category={"요즘 뜨는 제품"}
              width={"20vw"}
              height="18.156rem"
            />
          ) : (
            <S_SmallCarousel />
          )}{" "}
          {data ? (
            <SmallCarousel
              adata={data.PopularRelated}
              category={"요즘 뜨는 제품"}
              width={"20vw"}
              height="18.156rem"
            />
          ) : (
            <S_SmallCarousel />
          )}
        </ItemBox>
      </ItemSection>
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
