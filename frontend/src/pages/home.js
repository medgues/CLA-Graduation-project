import React, { useContext, useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";
import lodash from "lodash";
import { Auth } from "../contexts/Auth";
import { ProductsContext } from "../contexts/ProductsContext";
import useProducts from "../hooks/useProducts";
import SubHeader from "../components/SubHeader";
import "../grid.css";
import "../Home.scss";

import ProductsGrid from "../components/Grid";
import { PopupContext } from "../contexts/PopupContext";
import PopUp from "../components/PopUp";

const Home = () => {
  const { modalComponent } = useContext(PopupContext);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  const { fetchData } = useProducts();
  const { user } = useContext(Auth);
  const { products } = useContext(ProductsContext);
  useEffect(() => {
    setData(products);
  }, [products]);

  useEffect(() => {
    const url = "/api/products";
    const method = "get";
    fetchData({ url, method, user });
  }, []);

  useEffect(() => {
    setData(
      products.filter((d) => d.title.toLowerCase().indexOf(filter) !== -1)
    );
  }, [filter]);

  const search = (e) => setFilter(e.target.value);
  const shuffle = () => setData(() => lodash.shuffle(data));
  const newest = () => {
    setData(() => [...products].reverse());
  };
  const filterByCategory = (category) => {
    if (category === "all") {
      setData(products);
    } else {
      setData(
        products.filter((product) => product.categories.includes(category))
      );
    }
  };

  return (
    <div>
      <MainHeader />
      <SubHeader
        search={search}
        shuffle={shuffle}
        newest={newest}
        filterByCategory={filterByCategory}
      />
      <ProductsGrid data={data} />
      <PopUp component={modalComponent} />
    </div>
  );
};

export default Home;
