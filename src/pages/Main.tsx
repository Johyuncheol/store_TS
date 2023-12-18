import React, { useEffect, useState } from "react";
import styled from "styled-components";
/* import MainCarousel from "../components/main/MainCarousel";
import CategoryNav from "../components/main/CategoryNav";
import SmallCarousel from "../components/main/SmallCarousel";
import HalfCarousel from "../components/main/HalfCarousel"; */
import { getMain } from "../api/PageInfo";
import { MAIN_CACHE } from "../redux/modules/Cache";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/config";
import S_MainCarousel from "../components/main/skeleton/MainCarousel";
import S_HalfCarousel from "../components/main/skeleton/HalfCarousel";
import S_SmallCarousel from "../components/main/skeleton/SmallCarousel";

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
  const dispatch = useDispatch();
  const mainData = useSelector((state: RootState) => state.Cache);

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
    dispatch(MAIN_CACHE(res));
  };

  useEffect(() => {
    if (
      mainData.MainBanner.length &&
      mainData.Popular.length &&
      mainData.PopularRelated.length &&
      mainData.Recommend.length &&
      mainData.RecommendRelated.length &&
      mainData.Sale.length &&
      mainData.SaleRelated.length
    ) {
      setData(mainData);
    } else {
      fetchData();
    }
  }, []);
  console.log(mainData);
  return (
    <section>
      {data ? (
        <>
          <MainCarousel adata={data.MainBanner} />

          <CategoryNav />

          <ItemSection>
            <ItemBox>
              <SmallCarousel
                adata={data.PopularRelated}
                category={"요즘 뜨는 제품"}
                width={"20vw"}
                height="18.156rem"
              />

              <SmallCarousel
                adata={data.PopularRelated}
                category={"요즘 뜨는 제품"}
                width={"20vw"}
                height="18.156rem"
              />
            </ItemBox>

            <ItemBox1>
              <span className="contentsName">무심한듯 가볍게</span>

              <HalfCarousel adata={data.Recommend} />

              <SmallCarousel
                adata={data.RecommendRelated}
                category={"MD 추천"}
                width={"20vw"}
                height="12.156rem"
              />
            </ItemBox1>

            <ItemBox>
              <SmallCarousel
                adata={data.PopularRelated}
                category={"요즘 뜨는 제품"}
                width={"20vw"}
                height="18.156rem"
              />

              <SmallCarousel
                adata={data.PopularRelated}
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
