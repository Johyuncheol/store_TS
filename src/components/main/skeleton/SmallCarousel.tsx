import React, { useState } from "react";
import styled from "styled-components";
import LeftArrow from "../../../assets/main/LeftArrow.svg";
import RightArrow from "../../../assets/main/RightArrow.svg";
import { Link } from "react-router-dom";

const SmallCarousel: React.FC = () => {
  const data = [1, 2, 3, 4, 5];

  return (
    <div>
      <CarouselName>
        <span className="category"></span>
        <Link to={"/"}>{"더보기 > "}</Link>
      </CarouselName>

      <CarouselSection>
        <Inner>
          {data.map((item, index) => {
            return (
              <div className="cards" key={index}>
                <div className="card"></div>
              </div>
            );
          })}
        </Inner>

        <LeftBtn src={LeftArrow} />
        <RightBtn src={RightArrow} />
      </CarouselSection>
      {/*     <div>{currentIndex}</div> */}
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
  border-radius: 10px;

`;

const Inner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  height: 12.156rem;
  .cards {
    display: flex;
    width: 12rem;
    height: 12.156rem;
    overflow: hidden;
    background: linear-gradient(
      to right,
      #eeeeee 10%,
      #dddddd 28%,
      #eeeeee 53%
    );
    border-radius: 10px;
  }

  .card {
    width: 12rem;
    height: 12.156rem;
    background: linear-gradient(
      to right,
      #eeeeee 10%,
      #dddddd 28%,
      #eeeeee 53%
    );

    animation: load 1s infinite;
  }

  @keyframes load {
    100% {
      transform: translateX(100%);
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
