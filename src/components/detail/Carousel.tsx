import React, { useState } from "react";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import LeftArrow from "../../assets/main/LeftArrow.svg";
import RightArrow from "../../assets/main/RightArrow.svg";

const Carousel: React.FC<{ adata: string[] }> = ({ adata }) => {
  const [data] = useState(adata);

  const carouselRef = useRef<HTMLDivElement>(null);
  const cRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const localVarRef = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        carouselRef.current.clientWidth * localVarRef.current
      }px)`;

      if (cardRef.current && cRef.current)
        cardRef.current.style.width = `${cRef.current.clientWidth}px`;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        carouselRef.current.style.transition = "";
        carouselRef.current.style.transform = `translateX(-${
          carouselRef.current.clientWidth * localVarRef.current
        }px)`;

        if (cardRef.current && cRef.current)
          cardRef.current.style.width = `${cRef.current.clientWidth}px`;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = () => {
    if (carouselRef.current) {
      if (currentIndex === data.length - 1) {
        localVarRef.current = data.length - 1;
        return 0;
      } else {
        carouselRef.current.style.transition = "transform 0.5s ease";
      }

      setCurrentIndex((prevIndex: number) => {
        const nexIndex = prevIndex + 1;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(-${
            carouselRef.current.clientWidth * nexIndex
          }px)`;
        }

        return nexIndex;
      });
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      localVarRef.current = localVarRef.current - 1; // Update localVarRef.current

      if (currentIndex === 0) {
        localVarRef.current = 0;
        return 0;
      } else {
        carouselRef.current.style.transition = "transform 0.5s ease";
      }

      setCurrentIndex((prevIndex: number) => {
        const nexIndex = prevIndex - 1;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(-${
            carouselRef.current.clientWidth * nexIndex
          }px)`;
        }

        return nexIndex;
      });
    }
  };

  return (
    <>
      <CarouselSection ref={cRef}>
        <Inner ref={carouselRef}>
          <div className="card" ref={cardRef}>
            {data.map((item, index) => {
              return <img src={item} alt={`포스트`} key={index} />;
            })}
          </div>
        </Inner>

        <LeftBtn src={LeftArrow} onClick={prevSlide} />
        <RightBtn src={RightArrow} onClick={nextSlide} />
        <CurrentPage>{`${currentIndex + 1}/${data.length - 2}`}</CurrentPage>
      </CarouselSection>
    </>
  );
};

export default Carousel;

const CarouselSection = styled.section`
  display: flex;
  width: 100%;
  box-shadow: 10px 10px 20px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 26.156rem;
  display: flex;

  .card {
    display: flex;


    img {
      
      width: 100%;
      height: auto;
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
