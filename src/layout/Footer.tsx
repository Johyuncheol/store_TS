import React from "react";
import styled from "styled-components";
const Footer: React.FC = () => {
  return (
    <FooterSection>
      <div className="linkBoxs">
        <div className="Box">Contect</div>
        <div className="Box">FAQ</div>
        <div className="Box">1:1 문의</div>
      </div>
      <p>
        개인 프로젝트로 진행되었으며 <br/>
        커머스 서비스의 제작시 요구되는점과 <br/>
        성능 개선을 할수있는 부분등을 학습하기 위해 제작됨 <br/><br/>
        개발자 : 조현철
    </p>
    </FooterSection>
  );
};

export default Footer;

const FooterSection = styled.section`
  margin-top: 6rem;
  padding: 2rem;
  height: 20rem;
  width: 100%;
  background-color: #eae7e7;

  .linkBoxs {
    display: flex;
    justify-content: center;
    gap: 5rem;
    margin-bottom:5rem;

    .Box {
      width: 10rem;
      border: 1px solid black;
      text-align: center;
      &:hover {
        background-color: black;
        color: white;
      }
    }
  }
`;
