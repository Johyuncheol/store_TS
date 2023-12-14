import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import menuData from "../staticData/json/menuCategory.json";
import { Link } from "react-router-dom";
import { getCategoryData } from "../api/Category";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../hooks/usePageNation";
const Category: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const info = location.pathname.split("/");
  const categoryName = info[2];
  const detail = info[3];
  const [selectedMenu, setSelectedMenu] = useState(detail);

  interface Category {
    mainCategory: string;
    subCategory: string[];
  }

  const [categoryInfo, setCategoryInfo] = useState<Category>();

  const {
    showData,
    pageNums,
    currentPage,
    setCurrentPage,
    movePageBtnHandler,
  } = usePagination(() =>
    getCategoryData(`${categoryName}/${selectedMenu.toLowerCase()}`,currentPage),20
  );

  const fetchData = async () => {
    console.log("==", showData);
  };

  const goDetailPage = (id: number) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    if (categoryName === "women") setCategoryInfo(menuData.Women);
    if (categoryName === "man") setCategoryInfo(menuData.Man);
    if (categoryName === "interior") setCategoryInfo(menuData.Interior);
    fetchData();
  }, [categoryName, menuData, detail]);

  return (
    <PageSection>
      <div className="sideBar">
        <div className="inner">
          <div className="categoryName">{categoryInfo?.mainCategory}</div>
          <div className="others">
            {categoryInfo?.subCategory.map((item, index) => {
              return (
                <OtherLink
                  to={`/category/${categoryName + "/" + item.toLowerCase()}`}
                  className="detailCategory"
                  key={index}
                  onClick={() => setSelectedMenu(item)}
                  selected={selectedMenu === item.toLowerCase()}
                >
                  {item}
                </OtherLink>
              );
            })}
          </div>
        </div>
      </div>
      <article className="pageNation">
        <ContentArticle>
          {showData?.map((item, index) => {
            if (
              "imgSrc" in item &&
              "brand" in item &&
              "price" in item &&
              "name" in item &&
              "id" in item
            )
              return (
                <div
                  className="itemBox"
                  key={index}
                  onClick={() => goDetailPage(item.id)}
                >
                  <img src={item.imgSrc} />
                  <div className="itemInfo">
                    <span className="bold">{item.brand}</span>
                    <span>{item.name}</span>
                    <span className="bold">{item.price}</span>
                  </div>
                </div>
              );
          })}
        </ContentArticle>
        <PageNums >
          <span onClick={() => movePageBtnHandler("left")}>{"<"}</span>
          {pageNums.map((item, index) => {
            return currentPage === item ? (
              <span
                className="bold"
                key={index}
                onClick={() => setCurrentPage(item)}
              >
                {item}
              </span>
            ) : (
              <span
                className="grey"
                key={index}
                onClick={() => setCurrentPage(item)}
              >
                {item}
              </span>
            );
          })}
          <span onClick={() => movePageBtnHandler("right")}>{">"}</span>
        </PageNums>
      </article>
    </PageSection>
  );
};

export default Category;

const PageSection = styled.section`
  display: flex;
  gap: 3rem;
  padding: 2rem 3rem;

  .sideBar {
    width: 10rem;

    min-height: 500px;
    .inner {
      width: 10rem;
      .categoryName {
        font-size: 1.5rem;
        font-weight: 500;
        min-height: 5rem;
        display: flex;
        align-items: center;
        border-bottom: 5px solid black;
      }
      .others {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .contents {
    display: grid;
  }

  .pageNation {
    display: flex;
    flex-direction: column;
    gap:5rem;
    align-items:center;
  }
`;

const PageNums = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  span {
    cursor: pointer;
  }
  .bold {
    font-weight: 600;
  }
  .grey {
    color: grey;
  }
`;

const OtherLink = styled(Link)<{ selected: boolean }>`
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  color: ${(props) => (props.selected ? "black" : "grey")};
  text-decoration: none;

  font-size: 1rem;
  line-height: 3rem;
  &:hover {
    color: black;
    font-weight: bold;
  }
`;

const ContentArticle = styled.article`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1380px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1620px) {
    grid-template-columns: repeat(5, 1fr);
  }

  column-gap: 20px;
  row-gap: 100px;
  .itemBox {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 250px;
    height: 350px;
    cursor: pointer;
    img {
      min-width: 100%;
      height: 300px;
    }

    .itemInfo {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 1rem;
      .bold {
        font-weight: bold;
        font-size: 0.9rem;
      }
    }
  }
`;
