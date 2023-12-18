import React from "react";
import styled from "styled-components";

interface SearchModalCardRequire {
  onClose: () => void;
}
const SearchModal: React.FC<SearchModalCardRequire> = ({onClose}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>x</CloseButton>

        <div className="contentsWrap">
          <div className="searchInput">
            <input type="text" />
            <img src="https://cdn.pixabay.com/photo/2015/12/08/17/38/magnifying-glass-1083373_1280.png" />
          </div>
          <div className="guess">
            <span>12</span>
            <span>12</span>
            <span>12</span>
            <span>12</span>
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
    padding : 3rem;
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
      font-size:2rem;
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
