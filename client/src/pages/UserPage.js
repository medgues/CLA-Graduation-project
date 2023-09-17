import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProductsContext } from "../contexts/ProductsContext";

import useProducts from "../hooks/useProducts";

import MainHeader from "../components/MainHeader";
import ProductsGrid from "../components/Grid";

const UserPage = () => {
  const [data, setData] = useState([]);
  const { products } = useContext(ProductsContext);
  const { username } = useParams();
  const { fetchData } = useProducts();
  useEffect(() => {
    setData(products);
  }, [products]);
  useEffect(() => {
    const url = `/api/products/profile/${username}`;
    const method = "getUserProducts";
    fetchData({ url, method, data: {} });
  }, []);

  return (
    <div className=" min-h-screen  bg-slate-300">
      <MainHeader />

      <div className="w-11/12 mx-auto my-1">
        <ProductsGrid data={data} />
      </div>
    </div>
  );
};

export default UserPage;
