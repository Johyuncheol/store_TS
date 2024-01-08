import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import menuData from "../../staticData/json/menuCategory.json";

interface MenuModalProps {
  onClose: () => void;
  type: string;
  position: boolean;
}

const MenuModal: React.FC<MenuModalProps> = ({ onClose, type, position }) => {
  interface Category {
    mainCategory: string;
    subCategory: string[];
  }

  const [categoryInfo, setCategoryInfo] = useState<Category>();

  useEffect(() => {
    if (type === "women") setCategoryInfo(menuData.Women);
    if (type === "man") setCategoryInfo(menuData.Man);
    if (type === "interior") setCategoryInfo(menuData.Interior);
    if (type === "lookbook") setCategoryInfo(menuData.LookBook);
  }, [type, menuData]);

  return (
    <ModalSection onMouseLeave={onClose} position={position}>
      <div className="category">
        <Link to={""} className="mainCategory">
          {categoryInfo?.mainCategory}
        </Link>

        {categoryInfo?.subCategory.map((item, index) => {
          return (
            <Link
              to={`category/${type.toLowerCase() + "/" + item.toLowerCase()}`}
              className="detailCategory"
              key={index}
              onClick={onClose}
            >
              {item}
            </Link>
          );
        })}
      </div>
    </ModalSection>
  );
};

export default MenuModal;

const ModalSection = styled.section<{ position: boolean }>`
  display: flex;
  position: absolute;

  @media (min-width: 769px) {
    top: ${(props) => (props.position === true ? 0 : "")};
  }

  width: 100%;
  height: 300px;
  background-color: #f0f2a0f8;
  padding: 0 2rem;
  border-bottom: 3px solid black;
  gap: 10rem;

  z-index: 10;

  .category {
    display: flex;
    flex-direction: column;

    .mainCategory {
      line-height: 4rem;
      text-decoration: none;
      color: black;
      font-weight: bold;
    }
    .detailCategory {
      transition: all 200ms ease-in-out;
      font-size: 0.9rem;
      line-height: 2rem;
      text-decoration: none;
      color: black;
      &:hover {
        font-weight: bold;
      }
    }
  }
`;
