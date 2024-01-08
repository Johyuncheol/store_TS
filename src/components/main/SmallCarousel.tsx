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

const SmallCarousel: React.FC<{
  adata: Item[];
  category: string;
  width: string;
  height: string;
}> = ({ adata, category,width,height }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const localVarRef = useRef<number>(0);
  const backgroundRef = useRef<string>("");
  const [Ani, setAni] = useState<string>("false");

  const [data, setData] = useState(adata);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (carouselRef.current) {
      localVarRef.current = localVarRef.current + 1; // Update localVarRef.current

      if (localVarRef.current > data.length - 3) {
        localVarRef.current = data.length - 3;
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
      localVarRef.current = localVarRef.current - 1; 

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

  return (
    <div>
      <CarouselName>
        <div>
          <span className="category">{category}</span>
          <Link to={"/"}>{"더보기 > "}</Link>
        </div>

        <div className="moveBtn">
          <LeftBtn onClick={prevSlide}>{"<"}</LeftBtn>
          <RightBtn onClick={nextSlide}>{">"}</RightBtn>
        </div>
      </CarouselName>

      <CarouselSection height={height}>
        <Inner
          ref={carouselRef}
          width={width}
          height={height}
        >
          {data.map((item, index) => {
            return (
              <div className="card" key={index}>
                <img src={item.imgSrc} alt={`id: ${item.id}인 포스트`} />
              </div>
            );
          })}
        </Inner>

        {/*         <LeftBtn src={LeftArrow} onClick={prevSlide} />
        <RightBtn src={RightArrow} onClick={nextSlide} /> */}
      </CarouselSection>
    </div>
  );
};

export default SmallCarousel;

const CarouselSection = styled.section<{height: string}>`
  display: flex;
  width: 100%;
  height: ${(props)=>props.height};

  overflow: hidden;
  position: relative;
  box-shadow: 10px 10px 20px 5px rgba(0, 0, 0, 0.1);
/*   border-radius: 10px; */
`;

const Inner = styled.div<{ width: string; height: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  height: ${(props)=>props.height};

  .card {
    display: flex;
    justify-content: center;
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    flex-shrink: 0; 

    img {
      width: 100%;
   /*    border-radius: 10px; */
    }
  }
`;

const RightBtn = styled.button`
  font-size: 1rem;
  cursor: pointer;
`;

const LeftBtn = styled.button`
  font-size: 1rem;
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

  .moveBtn {
    padding-right: 1rem;
  }
`;
