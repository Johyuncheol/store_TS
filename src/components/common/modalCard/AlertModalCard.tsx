import React, { useEffect } from "react";
import styled from "styled-components";

interface AlertModalCardRequire {
  onClose: () => void;
  detail: string;
}


const AlertModalCard: React.FC<AlertModalCardRequire> = ({
  onClose,
  detail,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>x</CloseButton>
        <p>{detail}</p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AlertModalCard;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
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
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  position: relative;

  width: 300px;

  word-break: break-all;
`;

export const CloseButton = styled.span`
  position: absolute;
  right: 10px;
  top: 0;
  font-size: 20px;
  cursor: pointer;
`;
