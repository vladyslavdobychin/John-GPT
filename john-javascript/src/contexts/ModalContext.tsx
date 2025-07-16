import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConfirmDeleteModalData {
  title: string;
  onConfirm: () => void;
}

interface ModalState {
  confirmDelete: {
    isOpen: boolean;
    data: ConfirmDeleteModalData | null;
  };
}

interface ModalContextType {
  modalState: ModalState;
  openConfirmDeleteModal: (data: ConfirmDeleteModalData) => void;
  closeConfirmDeleteModal: () => void;
}

const initialModalState: ModalState = {
  confirmDelete: {
    isOpen: false,
    data: null,
  },
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const openConfirmDeleteModal = (data: ConfirmDeleteModalData) => {
    setModalState(prev => ({
      ...prev,
      confirmDelete: {
        isOpen: true,
        data,
      },
    }));
  };

  const closeConfirmDeleteModal = () => {
    setModalState(prev => ({
      ...prev,
      confirmDelete: {
        isOpen: false,
        data: null,
      },
    }));
  };

  const value: ModalContextType = {
    modalState,
    openConfirmDeleteModal,
    closeConfirmDeleteModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}; 