import React from "react";
import ProductPage from "../components/productPage/pages/ProductPage";

const CardPopUp = ({ showCardModal, handelCardModalClose, product }) => {
  return (
    <>
      {showCardModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <ProductPage
              product={product}
              handelCardModalClose={handelCardModalClose}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default CardPopUp;
