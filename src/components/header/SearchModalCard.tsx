import React, { useState } from "react";
import styled from "styled-components";
import { searchAPI } from "../../api/Search";
interface SearchModalCardRequire {
  onClose: () => void;
}

interface findRequire {
  name: string;
  id: string;
}
const SearchModal: React.FC<SearchModalCardRequire> = ({ onClose }) => {
  const [searchInput, setSearchInput] = useState("");
  const [findData, setfindData] = useState<findRequire[]>([]);

  let timeoutId: ReturnType<typeof setTimeout>;

  const changeInputAndSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(e.target.value);

    // 이전에 설정된 timeout이 있다면 제거
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 새로운 timeout 설정
    timeoutId = setTimeout(async () => {
      if (!e.target.value) {
        setfindData([]);
        return;
      }
      const res = await searchAPI(e.target.value, 1);
      setfindData(res);
    }, 1000); // 일정 시간(여기서는 500ms) 후에 API 호출
  };
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>x</CloseButton>

        <div className="contentsWrap">
          <div className="searchInput">
            <input type="text" onChange={(e) => changeInputAndSearch(e)} />
            <img src="https://cdn.pixabay.com/photo/2015/12/08/17/38/magnifying-glass-1083373_1280.png" />
          </div>
          <div className="guess">
            {findData.length ? (
              findData?.map((item, index) => <span>{item.name}</span>)
            ) : (
              <div>추천 검색어</div>
            )}
          </div>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SearchModal;

export const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;
`;

export const ModalContent = styled.div`
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  position: relative;

  width: 80%;
  height: 80%;

  word-break: break-all;

  .contentsWrap {
    padding: 3rem;
    width: 90%;
    display: flex;
    flex-direction: column;
  }
  .searchInput {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid black;
    input {
      width: 90%;
      border: none;
      outline: none;
      font-size: 2rem;
    }
    img {
      width: 2rem;
    }
  }
  .guess {
    display: flex;
    flex-direction: column;
  }
`;

export const CloseButton = styled.span`
  position: absolute;
  right: 10px;
  top: 0;
  font-size: 20px;
  cursor: pointer;
`;
