import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Globalstyles from "./globalStyle/GlobalStyle";
import Main from "./pages/Main";
import "./App.css";
import Login from "./pages/Login";
import PrivateRouter from "./layout/PrivateRouter";
import MyBag from "./pages/MyBag";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category";
import Detail from "./pages/Detail";

import { putInShoppingBag } from "./api/user";

function App() {
  useEffect(() => {
    const runFncAtClosedSession = () => {
      const shoppingBagData = sessionStorage.getItem("shoppingBag");

      if (shoppingBagData) {
        putInShoppingBag(shoppingBagData);
      }
    };

    // 창이 닫힐 때 이벤트 처리
    window.addEventListener("beforeunload", () => {
      // 창이 닫힐 때 세션 확인 및 서버로 전송
      runFncAtClosedSession();
    });
  }, []);

  return (
    <>
      <Globalstyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="category/:param1/:param2" element={<Category />} />
          <Route path="detail/:id" element={<Detail />} />

          {/* private Router */}
          <Route path="/" element={<PrivateRouter />}>
            <Route path="/mybag" element={<MyBag />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
