import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CategoryNav = () => {
  const navigate=useNavigate();
  const category = [
    {
      name: "BEST",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
    },
    {
      name: "WOMEN",
      path:'/category/women/all',
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
    },
    {
      name: "MAN",
      path:'/category/man/all',
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
    },
    {
      name: "INTERIOR",
      path:'/category/interior/all',
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
    },
    {
        name: "EVENT",
        path:'/event',
        imgSrc:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
      },
    {
        name: "LOOKBOOK",
        path:"/lookbook",
        imgSrc:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
      },
  ];
  return (
    <CategorySection>
      {category.map((item, index) => {
        return (
          <Box key={index} onClick={()=>navigate(`${item.path}`)}>
            <img src={item.imgSrc} />
            <div>{item.name}</div>
          </Box>
        );
      })}
    </CategorySection>
  );
};

export default CategoryNav;

const CategorySection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;

  gap: 3rem;

`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 5rem;
  height: 6rem;
  box-sizing: border-box;
  align-items: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 5px;
  }
`;
