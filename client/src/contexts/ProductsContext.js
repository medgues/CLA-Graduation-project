import React, { useReducer, createContext } from "react";
import gradients from "../gradients";

export const ProductsContext = createContext();
function randomNumberInRange(min, max) {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//reducer
const ProductsReducer = (state, action) => {
  console.log("state", state);
  switch (action.type) {
    case "ALL_PRODUCTS":
      localStorage.setItem("posts", JSON.stringify(action.payload));
      console.log("state", state);
      return {
        ...state,
        products: action.payload.map((product) => {
          const css = gradients[randomNumberInRange(0, 13)].css;
          return { ...product, css };
        }),
      };
    case "USER_PRODUCTS": {
      return {
        ...state,
        userProducts: action.payload.map((product) => [
          ...product,
          gradients[randomNumberInRange(0, 14)],
        ]),
      };
    }
    case "SET_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    default:
      return { products: [] };
  }
};

export const ProductContextProvider = ({ children }) => {
  const initialState = { products: [], userProducts: [], product: [] };

  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
