import React, { useState } from "react";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import LeftArrow from "../../assets/main/LeftArrow.svg";
import RightArrow from "../../assets/main/RightArrow.svg";

interface Item {
  id: number;
  imgSrc: string;
}

const MainCarousel: React.FC<{ adata: Item[] }> = ({ adata }) => {
  let aa = [adata[adata.length - 1], ...adata];

  aa = [...aa, adata[0]];
  const [data] = useState(aa);
  console.log(data);

  const carouselRef = useRef<HTMLDivElement>(null);
  const localVarRef = useRef<number>(1);
  const [backgroundImg, setBackgroundImg] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        (carouselRef.current.clientWidth / data.length) * localVarRef.current
      }px)`;
    }
  }, []);

  useEffect(() => {
    setBackgroundImg(data[currentIndex].imgSrc);
  }, [currentIndex]);

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

  return (
    <>
      <BackgroundIMG bgIMG={backgroundImg} />
      <CarouselSection>
        <Inner ref={carouselRef}>
          {data.map((item, index) => {
            return (
              <div className="card" key={index}>
                <img src={item.imgSrc} alt={`id: ${item.id}인 포스트`} />
              </div>
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

export default MainCarousel;

const BackgroundIMG = styled.section<{ bgIMG: string }>`
  background-image: url(${(props) => props.bgIMG});
  background-size: cover;
  width: 100%;
  height: 3rem;
  filter: blur(50px);
`;

const CarouselSection = styled.section`
  display: flex;
  width: 100%;
  height: 26.156rem;
  background-color: none;
  overflow: hidden;
  position: relative;
  box-shadow: 10px 10px 20px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 26.156rem;
  display: flex;

  .card {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 26.156rem;
    background-color: #d9d9d9;
    img {
      display: flex;
      width: 99vw;
    }
  }
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
