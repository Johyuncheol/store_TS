import React, { useState } from "react";
import styled from "styled-components";

import MenuModalCard from "../components/header/MenuModalCard2";
import SearchModalCard from "../components/header/SearchModalCard";

import { useModal } from "../hooks/useModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config";

const Header2: React.FC = () => {
  const menuModal = useModal({ isOpen: false });
  const [modalCategory, setModalCategory] = useState("");

  const searchModal = useModal({ isOpen: false });

  const user = useSelector((state: RootState) => state.User);
  console.log(user)
  //상세카테고리 모달창 open
  const handleOpenModal = (type: string) => {
    setModalCategory(type);
    menuModal.openModal();
  };

  return (
    <>
      {searchModal.modalState.isOpen && (
        <SearchModalCard onClose={searchModal.closeModal} />
      )}
      <Header>
        <h1>
          <Link to="/">EveryDay</Link>
        </h1>

        <nav className="nav">
          <div className="option">
            <a onClick={searchModal.openModal}>
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/14/magnifying-glass-1294834_1280.png" />
            </a>
            <Link to="/user/mybag">
              <img src="https://cdn.pixabay.com/photo/2013/07/12/14/53/cart-148964_1280.png" />
            </Link>

            <Link to="/">♥</Link>
            {user.name ? (
              <Link to="/mypage">
                <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png" />
              </Link>
            ) : (
              <Link to="/login">
                L
              </Link>
            )}
          </div>
          <div className="nav" onMouseLeave={menuModal.closeModal}>
            <Link
              to="/category/women/all"
              onMouseOver={() => handleOpenModal("women")}
            >
              Women
            </Link>
            <Link
              to="/category/man/all"
              onMouseOver={() => handleOpenModal("man")}
            >
              Man
            </Link>
            <Link
              to="/category/interior/all"
              onMouseOver={() => handleOpenModal("interior")}
            >
              Interior
            </Link>
            <Link to="" onMouseOver={() => handleOpenModal("lookbook")}>
              LookBook
            </Link>

            <div onMouseLeave={menuModal.closeModal}>
              {menuModal.modalState.isOpen && (
                <MenuModalCard
                  onClose={menuModal.closeModal}
                  type={modalCategory}
                  position={true}
                />
              )}
            </div>
          </div>
        </nav>
      </Header>
    </>
  );
};

export default Header2;

const Header = styled.header`
  background-color: white;
  font-size: 1.8rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 30px 10px 30px;

  z-index: 10;

  h1 {
    font-size: 3.5rem;
    text-align: center;
  }
  position: fixed;

  a {
    text-decoration: none;
    color: black;
  }

  @media (min-width: 769px) {
    top: 0;
    height: 100%;
    flex-direction: column-reverse;

    width: 300px;

    .nav {
      display: flex;
      flex-direction: column;
      align-items: end;
      a {
        transition: all 200ms ease-in-out;
        padding: 6px;

        color: gray;
        &:hover {
          color: black;
          text-decoration: underline;
        }
      }

      img {
        width: 20px;
      }
    }
  }
  @media (max-width: 768px) {
    align-items: center;
    .nav {
      a {
        padding: 6px;

        color: gray;
        &:hover {
          color: black;
          text-decoration: underline;
        }
      }

      .option {
        display: flex;
        justify-content: right;
        img {
          width: 20px;
        }
      }
    }
    h1 {
      font-size: 2rem;
      text-align: center;
    }
  }
`;
