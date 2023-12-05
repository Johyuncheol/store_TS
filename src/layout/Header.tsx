import React, { useState } from "react";
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

  return (
    <HeaderSection>
      <div className="inner">
        <div className="circle" />
        <Link to="/" className="title">
          Everyday <br />
          Chic
        </Link>

        <div className="Vector-8"></div>
        <div className="Vector-8"></div>

        <div className="options">
          <div className="clothes-home-tech-clothes-home-tech">
            <Link to="/best">MyLike</Link>
            <Link to="/mybag">MyBag</Link>
            <Link to="/best">MyPage</Link>
            <Link to="/login">Login</Link>
          </div>

          {/*         <div className="Vector-8"></div>
        <div className="Vector-8"></div>
        <div className="Vector-8"></div> */}

          <div className="clothes-home-tech-clothes-home-tech2">
            <Link to="/best">BEST</Link>
            <Link to="/best">WOMAN</Link>
            <Link to="/best">MAN</Link>
            <Link to="/best">INTERIOR</Link>
          </div>
        </div>
      </div>
    </HeaderSection>
  );
};

export default Header;

const HeaderSection = styled.section`
  display: flex;
  justify-content: center;
  min-width: 64rem;
  margin-top: 1.25rem;
  position: absolute;
  z-index: 2;
  height: 10rem;

  .inner {
    display: flex;
    align-items: center;

    height: 5.75rem;
    flex-grow: 0;

    .title {
      font-size: 2rem;
      font-weight: 600;
      text-decoration: none;
      color: #993a3a;
      margin-left: 1.511rem;
    }
  }

  .circle {
    flex-grow: 0;
    width: 2.214rem;
    height: 2.214rem;
    border-radius: 50%;
    background-color: #993a3a;
  }

  .Vector-8 {
    width: 0.063rem;
    height: 5.75rem;
    flex-grow: 0;
    margin: 0 1.345rem 0 1.291rem;
    background-color: #993a3a;
  }

  .options {
    display: flex;
    flex-direction: column;
    width: 40rem;
  }
  .clothes-home-tech-clothes-home-tech {
    display: flex;
    justify-content: right;
    gap: 20px;

    flex-grow: 0;
    font-size: 1.15rem;
    font-weight: 500;
    font-style: normal;
    line-height: 3rem;
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

    flex-grow: 0;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 3rem;
    text-align: center;
    color: black;
  }
`;
