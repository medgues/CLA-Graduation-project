import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext";
import useProducts from "../hooks/useProducts";
import MainHeader from "../components/MainHeader";
import ProductsGrid from "../components/Grid";
import PopUp from "../components/PopUp";
import { PopupContext } from "../contexts/PopupContext";

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
  console.log("datatata", data);
  const [toggle, setToggel] = useState("profile");
  const { setShowModal } = useContext(PopupContext);

  const [showEditFormModal, setshowEditFormModal] = useState(false);
  const [product, setProduct] = useState({});
  const { username } = useParams();

  const { products } = useContext(ProductsContext);

  const { fetchData } = useProducts();
  // const { user } = useContext(Auth);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setData(products);
  }, [products]);
  const disactivateToggleIsTrue = user.username === username;
  useEffect(() => {
    const url = `/api/products/${username}`;
    const method = "getProfile";
    console.log(url, method, user);
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
  const handelPopUpOpen = ({ data }) => {
    console.log("delet form", data);

    setProduct({ ...data });
    setShowModal(true);
  };
  const handelEditFormPopUpOpen = ({ data }) => {
    console.log("edit form", data);
    console.log("edit form popup opened");
    setProduct({ ...data });
    setshowEditFormModal(true);
  };

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
                {toggle === "profile" && (
                  <ProductsGrid
                    data={data}
                    handelPopUpOpen={handelPopUpOpen}
                    disactivateToggleIsTrue={disactivateToggleIsTrue}
                    handelEditFormPopUpOpen={handelEditFormPopUpOpen}
                  />
                )}
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
