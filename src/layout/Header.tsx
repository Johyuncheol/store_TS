import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/modules/User";
import { LogoutAPI } from "../api/Login";
const Header: React.FC = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.User);

  const [user, setUser] = useState(userInfo);

  const BGColor = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const Logout = () => {
    LogoutAPI();
    dispatch(setUserInfo({ name: null }));
    setUser({ name: null });
    navigate("/");
    alert("로그아웃 되었습니다!");
  };

  const goLogin = () => {
    if (
      window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")
    ) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // 현재 스크롤 위치가 맨 위인지 확인
      const isAtTop = window.scrollY === 0;

      // isAtTop 값을 기반으로 원하는 작업 수행
      if (isAtTop) {

        BGColor.current!.style.backgroundColor = "";
        BGColor.current!.style.borderBottom=""
        // 원하는 동작 수행
      } else {
        BGColor.current!.style.backgroundColor = "#e0e0e2";
        BGColor.current!.style.borderBottom="1px solid black"
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
  

  return (
    <HeaderSection ref={BGColor}>
      <div className="inner">
        <div className="circle" />
        <Link to="/" className="title">
          E.C
        </Link>

        <div className="Vector-8"></div>
        <div className="Vector-8"></div>

        <div className="options">
          {/*         <div className="Vector-8"></div>
        <div className="Vector-8"></div>
        <div className="Vector-8"></div> */}
          <div className="clothes-home-tech-clothes-home-tech3">
            <Link to="/best">MyLike</Link>
            <Link to="/mybag">MyBag</Link>
            <Link to="/best">MyPage</Link>
            <Link to="/login">Login</Link>
          </div>
          <div className="clothes-home-tech-clothes-home-tech2">
            <Link to="/best">BEST</Link>
            <Link to="/best">WOMAN</Link>
            <Link to="/best">MAN</Link>
            <Link to="/best">INTERIOR</Link>
            <Link to="/best">Brand</Link>
            <Link to="/mybag">Event</Link>
            <Link to="/best">LookBook</Link>
          </div>
        </div>
      </div>
    </HeaderSection>
  );
};

export default Header;

const HeaderSection = styled.section`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 2;
  height: 5rem;
  width: 100%;
  padding: 0 1rem;
  
  .inner {
    display: flex;
    align-items: center;
    width: 100%;
    height: 5.75rem;

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
