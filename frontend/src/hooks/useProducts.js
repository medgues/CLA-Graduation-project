import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { useFetch } from "./useFetch";

const useProducts = () => {
  const { dispatch } = useContext(ProductsContext);
  const { fetch } = useFetch();

  async function fetchData({ url, method, user }) {
    const products = await fetch({ url, method, user });
    console.log("products", products);
    dispatch({ type: "ALL_PRODUCTS", payload: products.data });
  }
  return { fetchData };
};

export default useProducts;
