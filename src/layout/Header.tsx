import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config";
import { useDispatch } from "react-redux";
import { LOGOUT_USER } from "../redux/modules/User";
import { LogoutAPI } from "../api/Login";
import MenuModalCard from "../components/header/MenuModalCard";
import SearchModalCard from "../components/header/SearchModalCard";
import { useModal } from "../hooks/useModal";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.User);
  const searchModal = useModal({ isOpen: false });
  const menuModal = useModal({ isOpen: false });

  const [user, setUser] = useState(userInfo);
  const [modalCategory, setModalCategory] = useState("");

  const BGColor = useRef<HTMLDivElement>(null);

  //로그아웃 함수
  const Logout = () => {
    LogoutAPI();
    dispatch(LOGOUT_USER({ name: null }));
    setUser({ name: null });

    alert("로그아웃 되었습니다!");
  };


  useEffect(() => {
    const handleScroll = () => {
      // 현재 스크롤 위치가 맨 위인지 확인
      const isAtTop = window.scrollY === 0;

      // isAtTop 값을 기반으로 원하는 작업 수행
      if (isAtTop) {
        BGColor.current!.style.backgroundColor = "";
        BGColor.current!.style.borderBottom = "";
        // 원하는 동작 수행
      } else {
        BGColor.current!.style.backgroundColor = "rgba(255,255,255,0.9)";
        // 원하는 다른 동작 수행
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //상세카테고리 모달창 open
  const handleOpenModal = (type: string) => {
    setModalCategory(type);
    menuModal.openModal();
  };

  return (
    <HeaderSection ref={BGColor}>
      {searchModal.modalState.isOpen && (
        <SearchModalCard onClose={searchModal.closeModal} />
      )}
      <div className="inner">
        <div className="circle" />
        <Link to="/" className="title">
          E.C
        </Link>

        <div className="Vector-8"></div>
        <div className="Vector-8"></div>

        <div className="options">
          <div className="clothes-home-tech-clothes-home-tech3">
            <div className="search" onClick={searchModal.openModal}>
              <img src="https://cdn.pixabay.com/photo/2015/12/08/17/38/magnifying-glass-1083373_1280.png" />
              <div className="underLine" />
            </div>
            <Link to="/best">MyLike</Link>
            <Link to="/mybag">MyBag</Link>
            <Link to="/best">MyPage</Link>
            {user.name === null ? (
              <Link to="/login">Login</Link>
            ) : (
              <Link to="/" onClick={() => Logout()}>
                Logout
              </Link>
            )}
          </div>

          <div onMouseLeave={menuModal.closeModal}>
            <div className="clothes-home-tech-clothes-home-tech2">
              <Link to="/best" onMouseOver={menuModal.closeModal}>
                BEST
              </Link>
              <span onMouseOver={() => handleOpenModal("women")}>WOMEN</span>
              <span onMouseOver={() => handleOpenModal("man")}>MAN</span>
              <span onMouseOver={() => handleOpenModal("interior")}>
                INTERIOR
              </span>

              <Link to="/mybag" onMouseOver={menuModal.closeModal}>
                Event
              </Link>
              <Link to="/best" onMouseOver={menuModal.closeModal}>
                LookBook
              </Link>
            </div>
            {menuModal.modalState.isOpen && (
              <MenuModalCard
                onClose={menuModal.closeModal}
                type={modalCategory}
              />
            )}
          </div>
        </div>
      </div>
    </HeaderSection>
  );
};

export default Header;

const HeaderSection = styled.section`
  position: sticky;
  top: 0;
  z-index: 2;
  height: 5rem;
  width: 100%;

  .inner {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 1rem;
    .title {
      font-size: 2rem;
      font-weight: 600;
      text-decoration: none;
      color: #993a3a;
    }
  }

  .circle {
    flex-shrink: 0;
    width: 2.214rem;
    height: 2.214rem;
    border-radius: 50%;
    background-color: #993a3a;
  }

  .Vector-8 {
    width: 0.063rem;
    height: 3.75rem;
    flex-shrink: 0;
    margin: 0 1.345rem 0 1.291rem;
    background-color: #993a3a;
  }

  .options {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .search {
    display: flex;

    padding-top: 2px;
    cursor: pointer;
    img {
      width: 1.5rem;
    }
    .underLine {
      width: 7rem;
      border-bottom: 1px solid #551a8b;
    }
  }
  .clothes-home-tech-clothes-home-tech {
    display: flex;
    justify-content: right;
    gap: 20px;

    flex-shrink: 0;
    font-size: 1.15rem;
    font-weight: 500;
    font-style: normal;

    text-align: center;
    color: #551a8b;

    a {
      color: #551a8b;
      text-decoration: none;
    }

    span {
      cursor: pointer;
    }
  }

  .clothes-home-tech-clothes-home-tech2 {
    display: flex;
    justify-content: left;
    gap: 20px;

    flex-shrink: 0;
    font-size: 1rem;
    font-weight: 500;
    line-height: 3rem;
    color: black;

    a {
      color: #551a8b;
    }

    span {
      cursor: pointer;
      color: #551a8b;
      text-decoration: underline;
    }
  }

  .clothes-home-tech-clothes-home-tech3 {
    display: flex;
    justify-content: right;
    gap: 20px;

    flex-shrink: 0;
    font-size: 1rem;
    font-weight: 500;
    font-style: normal;

    text-align: center;
    color: #551a8b;

    a {
      color: #551a8b;
      text-decoration: none;
    }

    span {
      cursor: pointer;
    }
  }
`;
