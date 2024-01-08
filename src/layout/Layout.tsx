import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";
const Layout: React.FC = () => {
  return (
    <LayoutSection>
      <Header />
      <CoverSection>
        <Outlet />
      </CoverSection>

      <Footer />
    </LayoutSection>
  );
};

export default Layout;

const LayoutSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CoverSection = styled.section`
  margin-top: 100px;
`;
