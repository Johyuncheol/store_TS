import React, { useState } from "react";

// 모달 상태를 관리하는 타입
interface ModalState {
  isOpen: boolean;
  modalType?: ModalType; // modalType 추가
}
  // 각 모달을 구분하기 위한 열거형
 export enum ModalType {
  AlertModal = "AlertModal",
  Modal2 = "MODAL_2",
}

// 커스텀 훅 정의
export const useModal = (initialState: ModalState) => {

  const [modalState, setModalState] = useState<ModalState>(initialState);

  // 모달 열기
  const openModal = (modalType: ModalType) => {
    setModalState({ isOpen: true, modalType });
  };

  // 모달 닫기
  const closeModal = () => {
    setModalState({ isOpen: false });
  };

  return { modalState, openModal, closeModal };
};
