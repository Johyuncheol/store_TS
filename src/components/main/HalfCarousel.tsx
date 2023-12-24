import React, { useState } from "react";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import LeftArrow from "../../assets/main/LeftArrow.svg";
import RightArrow from "../../assets/main/RightArrow.svg";

interface Item {
  id: number;
  imgSrc: string;
  smallImgSrc1?: string;
  smallImgSrc2?: string;
  smallImgSrc3?: string;
}
const HalfCarousel: React.FC<{ adata: Item[] }> = ({ adata }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const localVarRef = useRef<number>(1);

  let carouselData = [adata[adata.length - 1], ...adata];
  carouselData = [...carouselData, adata[0]];

  const [data] = useState(carouselData);

  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        (carouselRef.current.clientWidth / data.length) * localVarRef.current
      }px)`;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        carouselRef.current.style.transition = "";
        carouselRef.current.style.transform = `translateX(-${
          (carouselRef.current.clientWidth / data.length) * localVarRef.current
        }px)`;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = () => {
    if (carouselRef.current) {
      //위치를 나타내는 useRef ++
      // 현재위치를 보여줄 필요없으므로 useRef로 제작
      // 마지막 이미지인경우 index 0 값으로 이동한후 이동
      if (localVarRef.current === data.length - 2) {
        localVarRef.current = 0;
        if (carouselRef.current) {
          carouselRef.current.style.transition = "";
          carouselRef.current.style.transform = `translateX(-${
            (carouselRef.current.clientWidth / data.length) *
            localVarRef.current
          }px)`;
        }
      }

      setTimeout(() => {
        localVarRef.current = localVarRef.current + 1;
        //이동시 0.5초동안 부드럽게 이동
        if (carouselRef.current) {
          carouselRef.current.style.transition = "transform 0.3s ease";
          carouselRef.current.style.transform = `translateX(-${
            (carouselRef.current.clientWidth / data.length) *
            localVarRef.current
          }px)`;
          setCurrentIndex(localVarRef.current);
        }
      }, 0);
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      //위치를 나타내는 useRef ++
      // 현재위치를 보여줄 필요없으므로 useRef로 제작
      // 마지막 이미지인경우 index 0 값으로 이동한후 이동
      if (localVarRef.current === 1) {
        localVarRef.current = data.length - 1;
        if (carouselRef.current) {
          carouselRef.current.style.transition = "";
          carouselRef.current.style.transform = `translateX(-${
            (carouselRef.current.clientWidth / data.length) *
            localVarRef.current
          }px)`;
        }
      }

      setTimeout(() => {
        localVarRef.current = localVarRef.current - 1;
        //이동시 0.5초동안 부드럽게 이동
        if (carouselRef.current) {
          carouselRef.current.style.transition = "transform 0.3s ease";
          carouselRef.current.style.transform = `translateX(-${
            (carouselRef.current.clientWidth / data.length) *
            localVarRef.current
          }px)`;
          setCurrentIndex(localVarRef.current);
        }
      }, 0);
    }
  };
  console.log('HalfCarousel component is being executed!');

  return (
    <>
      <CarouselSection>
        <Inner ref={carouselRef}>
          {data.map((item, index) => {
            return (
              <Card key={index}>
                <img
                  className="resImg"
                  src={item.imgSrc}
                  alt={`id: ${item.id}인 포스트`}
                />

                <div className="contentbox">
                  <div className="innerbox">
                    <img
                      src={item.smallImgSrc1}
                      alt={`id: ${item.id}인 포스트`}
                    />
                    <div className="itemInfo">
                      <span>상품명</span>
                      <span>가갹</span>
                    </div>
                  </div>

                  <div className="innerbox">
                    <img
                      src={item.smallImgSrc2}
                      alt={`id: ${item.id}인 포스트`}
                    />
                    <div className="itemInfo">
                      <span>상품명</span>
                      <span>가갹</span>
                    </div>
                  </div>

                  <div className="innerbox">
                    <img
                      src={item.smallImgSrc3}
                      alt={`id: ${item.id}인 포스트`}
                    />
                    <div className="itemInfo">
                      <span>상품명</span>
                      <span>가갹</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </Inner>

        <LeftBtn src={LeftArrow} onClick={prevSlide} />
        <RightBtn src={RightArrow} onClick={nextSlide} />
        <CurrentPage>{`${currentIndex}/${data.length - 2}`}</CurrentPage>
      </CarouselSection>
    </>
  );
};

export default HalfCarousel;

const CarouselSection = styled.section`
  display: flex;
  width: 100%;
  height: 22.156rem;
  background-color: none;
  overflow: hidden;
  position: relative;
  border-top: 1px solid grey;
  box-shadow: 10px 10px 20px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 22.156rem;
  display: flex;
`;

const RightBtn = styled.img`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const CurrentPage = styled.div`
  position: absolute;
  right: 0;
  bottom: 0%;
  transform: translateY(-50%);
  border: none;
  font-size: 1em;
  cursor: pointer;
`;

const LeftBtn = styled.img`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const Card = styled.div`
  display: flex;
  align-items: Center;
  justify-content: space-around;
  width: 100vw;
  gap:5px;
  background-color:#c1c1c1;


  .contentbox {
    width: 50%;
    height: 33%;
    display: flex;
    gap:5px;
    flex-direction: column;
    color: black;

    .innerbox {
      background-color: #d6d6d6;
      display: flex;
      padding: 1rem;
      align-items: center;

      height: 100%;
      img {
        width: 6rem;
        height: 5rem;
      }

      .itemInfo {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .resImg {
    width: 50%;
    height: 22.156rem;
  }
`;
