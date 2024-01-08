import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../api/Auth";
import { LOGIN_USER } from "../redux/modules/User";
import { useDispatch } from "react-redux";
import Input from "../components/login/Input";
import { getShoppingBagAPI } from "../api/ShoppingBag";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const movePage = (path: string) => {
    if(path === 'prev') navigate(-1);
    else{
      navigate(`/${path}`)
    }

  };

  // 로그인 API 요청 함수
  const tryLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const id = String(formData.get("id"));
    const password = String(formData.get("password"));

    //로그인 요청 API
    const res = await LoginAPI({
      id,
      password,
    });

    // 로그인시 장바구니정보 세션에 저장
    const bagRes = await getShoppingBagAPI();
    sessionStorage.setItem("shoppingBag", JSON.stringify(bagRes));

    // 요청결과로 받은 유저의 정보를 저장
    dispatch(LOGIN_USER(res.name));
    console.log(res.name)
    navigate(-1);
  };

  return (
    <LoginSection>
      <div className="LoginWrap">
        <div className="LoginHeader">
          <button onClick={()=>movePage('prev')}>{"<"}</button>
          <span>로그인</span>
        </div>

        <div className="Loginbody">
          <form onSubmit={(e) => tryLogin(e)}>
            <Input type="id" />
            <Input type="password" />

            <button className="submit">로그인</button>
          </form>

          <OtherOption>
            <div className="find">
              <span>아이디 찾기</span>
              <div className="line"></div>
              <span>비밀번호 찾기</span>
            </div>
            <button className="submit">카카오 로그인</button>
            <button className="regeister" onClick={()=>movePage('register')}>회원가입</button>
          </OtherOption>
        </div>
      </div>
    </LoginSection>
  );
};

export default Login;

const LoginSection = styled.section`
  display: flex;
  justify-content: center;

  .LoginWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 400px;
    min-height: 655px;
    background-color: whitesmoke;
  }

  .LoginHeader {
    height: 50px;
    width: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    button {
      position: absolute;
      left: 0;
    }
  }

  .validationInfo {
    display: flex;
    flex-direction: column;
    height: 20px;
    color: #f05252;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 375px;
    padding: 5%;

    .input {
      width: 100%;
      height: 48px;
      padding: 0 50px 0 12px;
    }

    .passwordWrap {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;

      img {
        position: absolute;
        right: 10px;
        height: 18px;
        width: 30px;
        cursor: pointer;
        border-radius: 5px;
      }
    }
    .submit {
      width: 100%;
      height: 48px;
      background-color: black;
      color: white;
      cursor: pointer;
    }
  }
`;

const OtherOption = styled.div`
  display: flex;
  width: 375px;
  padding: 5%;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  span {
    cursor: pointer;
  }
  .find {
    display: flex;
    gap: 20px;
    height: 20px;
    font-size: 14px;
  }

  .line {
    height: 20px;
    width: 1px;
    background-color: #000; /* Set the color of the line */
    margin: 0 10px; /* Adjust margin as needed */
  }

  .submit {
    width: 100%;
    height: 48px;
    background-color: #fee500;
    color: black;
    border: none;
    cursor: pointer;
  }

  .regeister {
    width: 100%;
    height: 48px;
    background-color: #ecece9;
    color: black;
    border: none;
    cursor: pointer;
  }
`;
