import React, { useState } from "react";

// 모달 상태를 관리하는 타입
interface ModalState {
  isOpen: boolean;
}

// 커스텀 훅 정의
export const useModal = (initialState: ModalState) => {

  const [modalState, setModalState] = useState<ModalState>(initialState);

  // 모달 열기
  const openModal = () => {
    setModalState({ isOpen: true});
  };

  // 모달 닫기
  const closeModal = () => {
    setModalState({ isOpen: false });
  };

  return { modalState, openModal, closeModal };
};
