import React, { useContext, useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";

import CheckOutPageCard from "../components/CheckOutPageCard";
import { CardContext } from "../contexts/CardContext";

const CheckoutPage = () => {
  const [products, setProducts] = useState([]);

  const { state, dispatch } = useContext(CardContext);
  const handelDeleteProductFromCard = (id) => {
    dispatch({
      type: "REMOVE_FROM_CARD",
      id,
    });
  };
  useEffect(() => {
    setProducts([...state]);
  }, [state]);

  return (
    <div>
      <MainHeader />
      <div className="p-2 w-4/5 m-auto">
        {products.map((product) => {
          return (
            <CheckOutPageCard
              product={product}
              handelDeleteProductFromCard={handelDeleteProductFromCard}
            />
          );
        })}
        <button className="btn btn-active btn-primary m-1 w-full">
          place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
