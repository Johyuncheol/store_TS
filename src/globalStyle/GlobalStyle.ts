import { createGlobalStyle } from "styled-components";

const Globalstyles = createGlobalStyle`
  body {
    margin: 0;
  }

  :root {
    font-size: 15px;

    @media (max-width: 1024px) {
      font-size: 13px;
    }

    //800아래로 모바일 버전으로 만들자 
    @media (max-width: 800px) {
      font-size: 13px;
    }

    @media (max-width: 550px) {
      font-size: 10px;
    }

    @media (max-width: 320px) {
      font-size: 8px;
    }


  }
  * {
  box-sizing: border-box;
}


`;

export default Globalstyles;
