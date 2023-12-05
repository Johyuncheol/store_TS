import React, { useState } from "react";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import LeftArrow from "../../assets/main/LeftArrow.svg";
import RightArrow from "../../assets/main/RightArrow.svg";
import { Link } from "react-router-dom";

interface Item {
  id: number;
  imgSrc: string;
}

const SmallCarousel: React.FC<{ adata: Item[]; category: string }> = ({
  adata,
  category,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const localVarRef = useRef<number>(0);
  const backgroundRef = useRef<string>("");
  const [Ani, setAni] = useState<string>("false");

  const [data, setData] = useState(adata);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (carouselRef.current) {
      localVarRef.current = localVarRef.current + 1; // Update localVarRef.current

      if (localVarRef.current > data.length - 4) {
        localVarRef.current = data.length - 4;
        return 0;
      } else {
        carouselRef.current.style.transition = "transform 0.5s ease";
      }

      setCurrentIndex((prevIndex: number) => {
        const nexIndex = localVarRef.current;
        if (carouselRef.current) {
          carouselRef.current.style.transform = `translateX(-${
            (carouselRef.current.clientWidth / data.length) * nexIndex
          }px)`;
        }

        return nexIndex;
      });

      console.log(carouselRef.current.clientWidth);
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
            (carouselRef.current.clientWidth / data.length) * nexIndex
          }px)`;
        }

        return nexIndex;
      });
    }
  };

  return (
    <div>
      <CarouselName>
        <span className="category">{category}</span>
        <Link to={"/"}>{"더보기 > "}</Link>
      </CarouselName>

      <CarouselSection>
        <Inner ref={carouselRef} state={Ani} currentIndex={currentIndex}>
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
      </CarouselSection>
    </div>
  );
};

export default SmallCarousel;

const CarouselSection = styled.section`
  display: flex;
  width: 64rem;
  height: 12.156rem;
  background-color: none;
  overflow: hidden;
  position: relative;
  box-shadow: 10px 10px 20px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

`;

const Inner = styled.div<{ state: string; currentIndex: number }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  height: 12.156rem;

  .card {
    display: flex;
    justify-content: center;
    width: 12rem;
    height: 12.156rem;
    flex-shrink: 0; // Prevent cards from shrinking

    img {
      width: 100%;
      border-radius: 10px;

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

const LeftBtn = styled.img`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const CarouselName = styled.div`
  display: flex;
  justify-content: space-between;
  height: 3rem;

  .category {
    font-weight: 600;
    font-size: 1.3rem;
  }
`;
