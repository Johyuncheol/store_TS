import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";
const Layout: React.FC = () => {
  return (
    <LayoutSection>
      <Header />
      <Outlet />
      <Footer/>
    </LayoutSection>
  );
};

export default Layout;

const LayoutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 64rem;
`;
