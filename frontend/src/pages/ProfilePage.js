import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext";
import useProducts from "../hooks/useProducts";
import MainHeader from "../components/MainHeader";
import ProductsGrid from "../components/Grid";
import PopUp from "../components/PopUp";

import UserChangePassword from "../components/Panel/UserChangePassword/UserChangePassword";
import UserInformation from "../components/Panel/UserInformation/UserInformation";
import styles from "../components/Panel/Panel.module.css";
import UserCard from "../components/Panel/UserCard/UserCard";
import {
  SkinOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const ProfilePage = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggel] = useState("profile");

  const { username } = useParams();

  const { products } = useContext(ProductsContext);

  const { fetchData } = useProducts();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setData(products);
  }, [products]);
  useEffect(() => {
    const url = `/api/products/${username}`;
    const method = "getProfile";
    console.log("first fetch", url, method, user);
    fetchData({ url, method, user, data: {} });
  }, []);
  const sidebarLinks = [
    {
      id: 3,
      border: true,
      text: "Profile",
      icon: <SkinOutlined />,
      active: true,
    },
    {
      id: 1,
      border: true,
      text: "Information",
      icon: <UserOutlined />,
      active: false,
    },
    {
      id: 2,
      border: true,
      text: "Password",
      icon: <SafetyCertificateOutlined />,
      active: false,
    },
  ];

  return (
    <div className=" min-h-screen  bg-slate-300">
      <MainHeader />
      <div>
        <div
          className={`${styles["panel-wrapper"]} flex items-center justify-center`}
        >
          <div
            className={`${styles.container} flex justify-center items-start p-0 `}
          >
            <div
              className={`${styles["panel"]}  flex-wrap md:flex-nowrap flex gap-7 flex-md-row justify-center items-center px-3`}
            >
              <div className="flex flex-col justify-center p-0 self-baseline mt-[20vh]">
                <UserCard
                  user={user}
                  sidebarLinks={sidebarLinks}
                  setToggel={setToggel}
                />
              </div>

              <div
                className={`${styles["panel-column"]} flex flex-wrap justify-center items-center  bg-white border mt-5 mt-md-0 ms-md-5 p-5`}
              >
                {toggle === "information" && <UserInformation user={user} />}
                {toggle === "password" && <UserChangePassword />}
                {toggle === "profile" && <ProductsGrid data={data} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopUp />
    </div>
  );
};

export default ProfilePage;
