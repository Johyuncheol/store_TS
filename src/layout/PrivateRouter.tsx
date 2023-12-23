import React, { useLayoutEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CheckIsLoginAPI } from "../api/Auth";

const PrivateRouter: React.FC = () => {
  const [auth, setAuth] = useState<number>();

  const navigate = useNavigate();

  // 로그인 확인 함수
  const authenticated = async () => {
    const res = await CheckIsLoginAPI();

    setAuth(res?.status);
    if (res?.status !== 201) {
      navigate("/login");
    } 
  };

  // 페인트 전에 동작해버리자
  useLayoutEffect(() => {
    authenticated();
  }, []);

  return auth === 201 ? <Outlet /> : <div style={{height:"100vw"}}></div>;
};

export default PrivateRouter;
