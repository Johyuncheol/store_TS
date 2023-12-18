import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import menuData from "../../staticData/json/menuCategory.json";

interface MenuModalProps {
  onClose: () => void;
  type: string;
}

const MenuModal: React.FC<MenuModalProps> = ({ onClose, type }) => {
  interface Category {
    mainCategory: string;
    subCategory: string[];
  }

  const [categoryInfo, setCategoryInfo] = useState<Category>();

  useEffect(() => {
    if (type === "women") setCategoryInfo(menuData.Women);
    if (type === "man") setCategoryInfo(menuData.Man);
    if (type === "interior") setCategoryInfo(menuData.Interior);
  }, [type, menuData]);

  return (
    <ModalSection onMouseLeave={onClose}>
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

const ModalSection = styled.section`
  display: flex;
  position: fixed;
  left: 0;
  width: 100vw;
  height: 300px;
  background-color: #eeeeeef9;
  padding: 0 2rem;

  gap: 10rem;
  border-bottom: 1px solid black;

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
