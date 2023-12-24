import React, { useState } from "react";
import { useInavalidate } from "../../hooks/useInvalidate";
import styled from "styled-components";
import Img_eye from "../../assets/login/eye.png";

// input 태그 공용 ui
// 입력받은 type값을 통해 input 태그의 타입 지정 및 유효성검사진행 
// 비밀번호 보안 보기 기능 

interface InputRequire {
  type: string;
}

const Input: React.FC<InputRequire> = ({ type }) => {
  const { inputData, changeInput, Message } = useInavalidate();

  const [isShowPW, setIShowPW] = useState(type);

  // 비밀번호 보기/숨기기
  const ShowPW = () => {
    if (isShowPW === "password") setIShowPW("text");
    else if (isShowPW === "text") setIShowPW("password");
  };

  return (
    <InputContainer>
      <div className="inputArea">
        <input
          type={isShowPW}
          placeholder={type}
          className="input"
          value={inputData}
          name={type}
          onChange={(e) => changeInput({type:type, e:e})}
        />
        {type === "password" && (
          <img src={Img_eye} alt="비밀번호 보기" onClick={ShowPW} />
        )}
      </div>
      <div className="message">{Message}</div>
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div`
  width: 100%;

  .inputArea {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
  }

  .input {
    width: 100%;
    height: 48px;
    padding: 0 50px 0 12px;
  }

  img {
    position: absolute;
    right: 10px;
    height: 18px;
    width: 30px;
    cursor: pointer;
    border-radius: 5px;
  }

  .message {
    height: 20px;
    color: #f05252;
  }
`;
