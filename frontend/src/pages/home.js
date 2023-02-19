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

  const [showCardModal, setShowCardModal] = useState(false);
  const [product, setProduct] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  const { fetchData } = useProducts();
  const { user } = useContext(Auth);
  const { products } = useContext(ProductsContext); //is undefined on the second render
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
  const handelCardModalOpen = ({ data }) => {
    console.log("card model data", data);
    console.log("cardmodel opened opened");
    setProduct({ ...data });
    setShowCardModal(true);
  };
  const handelCardModalClose = () => {
    console.log("cardmodel opened opened");
    setShowCardModal(false);
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
      <ProductsGrid data={data} handelCardModalOpen={handelCardModalOpen} />
      <PopUp component={modalComponent} />
    </div>
  );
};

export default Home;
