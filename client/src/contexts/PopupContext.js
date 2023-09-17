import React, { useState } from "react";
const { createContext } = require("react");

export const PopupContext = createContext();

export const PopupContextProvider = ({ children }) => {
  const [modalComponent, setModalComponent] = useState();
  const [showModal, setShowModal] = useState(false);

  return (
    <PopupContext.Provider
      value={{
        modalComponent,
        setModalComponent,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};
