import React, { useState } from "react";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import LeftArrow from "../../../assets/main/LeftArrow.svg";
import RightArrow from "../../../assets/main/RightArrow.svg";

const HalfCarousel: React.FC = () => {
  return (
    <>
      <CarouselSection>
        <Inner>
          <div className="card"></div>
        </Inner>
        <LeftBtn src={LeftArrow} />
        <RightBtn src={RightArrow} />
      </CarouselSection>
    </>
  );
};

export default HalfCarousel;

const CarouselSection = styled.section`
  width: 64rem;
  height: 22.156rem;
  position: relative;
  box-shadow: 10px 10px 20px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

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

const Inner = styled.div`
  overflow: hidden;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 28%, #eeeeee 53%);
  border-radius: 10px;

  width: 64rem;
  height: 22.156rem;

  .card {
    width: 64rem;
    opacity: 0.5;
    height: 22.156rem;
    background: linear-gradient(
      to right,
      #eeeeee 10%,
      #dddddd 28%,
      #eeeeee 53%
    );
    background-size: 100%;

    border-radius: 10px;

    animation: load 1s infinite;
  }

  @keyframes load {
    100% {
      transform: translateX(100%);
    }
  }
`;
