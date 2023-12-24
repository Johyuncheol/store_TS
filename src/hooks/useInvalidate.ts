import React, { useState } from "react";

/* 
  입력값 유효성검사 커스텀 훅 
  type 2가지 
    1.  id = > 이메일형식인지 유효성검사진행 
    2.  password => 5자리이상인지 진행  
  
  입력값 : inputData
  유효성 검사 메세지 : Message
  */

export const useInavalidate = () => {
  const [inputData, setInputData] = useState(""); // 입력값 
  const [Message, setMessage] = useState<string>(""); // 유효성검사 메세지 

  //입력값 변경함수 
  const changeInput = ({type,e}:{type: string, e:React.ChangeEvent<HTMLInputElement>}) => {
     setInputData(e.target.value);
     checkVaildation({type:type,data:e.target.value});
  };

  //유효성검사 함수 
  const checkVaildation = ({type,data}:{type: string, data: string}) => {
    if (type === "id") {
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      const validateRes = regex.test(data);

      if (validateRes || data.length === 0) setMessage("");
      else setMessage("이메일 형식이 아닙니다");
    }
    
    else if (type === "password") {
      if (data.length < 5 && data.length >0) setMessage("5자리 이상 입력해주세요");
      else setMessage("");
    }
  };

  return {inputData, changeInput, Message};
};
