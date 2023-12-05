import React, { useState } from "react";
import styled from "styled-components";

const CategoryNav = () => {
  //const [category, setCategory] = useState([1, 2, 3, 4, 5,6,7]);
  const category = [
    {
      name: "BEST",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
    },
    {
      name: "WOMAN",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
    },
    {
      name: "MAN",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
    },
    {
      name: "INTERIOR",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
    },
    {
        name: "CURTURE",
        imgSrc:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
      },
    {
        name: "LOOKBOOK",
        imgSrc:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_Varq6a2k-TR670RYQkEfHPGgRYXArbGuw&usqp=CAU",
      },
  ];
  return (
    <CategorySection>
      {category.map((item, index) => {
        return (
          <Box key={index}>
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
