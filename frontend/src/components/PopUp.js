import React, { useContext } from "react";
import { PopupContext } from "../contexts/PopupContext";

const PopUp = () => {
  const { modalComponent, showModal } = useContext(PopupContext);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-2 max-w-xl">
              {modalComponent}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default PopUp;
