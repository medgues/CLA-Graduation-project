import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../contexts/Auth";
import { useFetch } from "../hooks/useFetch";
import bg from "../../src/assets/shirt.svg";

import { motion } from "framer-motion";
import PopUpModals from "./PopUpModals";
import { PopupContext } from "../contexts/PopupContext";
import useProducts from "../hooks/useProducts";
import { Tag } from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import axios from "axios";
import { ProductsContext } from "../contexts/ProductsContext";

const Product = ({
  disactivateToggleIsTrue,
  toggle,
  handelPopUpOpen,
  handelEditFormPopUpOpen,
  handelCardModalOpen,
  data,
  key,
  rating,
}) => {
  const navigate = useNavigate();
  const { setModalComponent, setShowModal } = useContext(PopupContext);
  const { pathname } = useLocation();
  const { fetch } = useFetch();
  const { user } = useContext(Auth);
  const { fetchData } = useProducts();
  const { dispatch } = useContext(ProductsContext);

  const liked =
    data.likedBy.filter((e) => e.username === user.username).length > 0;

  const handelAddtofav = async () => {
    console.log("productId", data._id);
    try {
      const res = await axios.post(
        "/api/products/addtofav",
        { productId: data._id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch({ type: "ALL_PRODUCTS", payload: res.data });
    } catch (err) {
      const res = err;
      console.log("fav backend err", res);
      return res;
    }
  };

  const handelUserClick = (username) => {
    navigate(`/profile/${username}`);
  };
  const { editForm, deletePop, addtoBusketComponent } = PopUpModals();

  const handeleditFormPopOpen = ({ data }) => {
    console.log("product inside handelpop up ", data);
    setModalComponent(editForm({ data }));
    setShowModal(true);
  };
  const handelBusketPopOpen = ({ data }) => {
    console.log("product inside handelpop up ", data);
    setModalComponent(addtoBusketComponent({ data }));
    setShowModal(true);
  };
  const handeleDeletePopOpen = () => {
    const handelDeletDesign = async (product) => {
      await fetch({
        url: `api/products/${product._id}`,
        method: "delete",
        user,
      });
      //fetch and update global state with new list without the deleted product
      const url = `/api/products/${user.username}`;
      const method = "getProfile";
      fetchData({ url, method, user, data: {} });
      setShowModal(false);
    };
    console.log("product inside handelpop up ", data);
    setModalComponent(deletePop({ product: { data }, handelDeletDesign }));
    setShowModal(true);
  };

  const todayDate = Math.floor(new Date().getTime()) / 1000;
  const date = new Date(data.createdAt).getTime() / 1000;
  const newest = todayDate - date <= 604800;

  // PRODUCT CARD - displays product details on home/products page
  return (
    <motion.div
      layout
      variants={{
        visible: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
      }}
      initial="exit"
      animate="visible"
      exit="exit"
      className="relative hover:cursor-pointer border"
      style={{ background: data.css }}
    >
      {newest ? (
        <div className="badge badge-secondary absolute top-0 left-0 mt-1 ml-1">
          New
        </div>
      ) : (
        <div></div>
      )}
      <img
        src={data.image_url}
        alt=""
        className="absolute scale-40 top-[13%]"
      />
      <img
        src={bg}
        alt=""
        className=" w-full h-70 object-cover overflow-hidden rounded-t-md"
      />
      {user ? (
        pathname !== "/" &&
        user.username === data.postedBy && (
          <div
            className="tooltip absolute right-1 top-1 tooltip-left "
            data-tip="delete"
          >
            <motion.div
              className="box"
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a className=" text-white ">
                <DeleteOutlined
                  className=" bg-slate-800  p-1 rounded"
                  onClick={() => handeleDeletePopOpen({ data })}
                />
              </a>
            </motion.div>
          </div>
        )
      ) : (
        <div></div>
      )}

      <div className="flex w-full  justify-start">
        <div className=" p-2 h-fit self-start">
          <p>{data.title}</p>
          <p onClick={() => handelUserClick(data.postedBy)}>
            by : @{data.postedBy}
          </p>
          <p className="mt-1">
            <span>200 DA</span>
          </p>
          <Tag color="geekblue">{data.categories}</Tag>
        </div>
      </div>
      <div className="flex items-center w-full place-content-between px-1 pb-1">
        <button onClick={handelAddtofav} className="flex items-center gap-1">
          {liked ? (
            <HeartFilled style={{ color: "#eb2f96" }} />
          ) : (
            <HeartOutlined />
          )}
          {data.likedBy.length}
        </button>

        {user ? (
          pathname !== "/" &&
          user.username === data.postedBy && (
            <div
              className="tooltip flex gap-1 items-center tooltip-top "
              data-tip="Edit"
            >
              <motion.div
                className="box"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <a className=" text-black ">
                  <EditOutlined
                    className="p-1"
                    onClick={() => handeleditFormPopOpen({ data })}
                  />
                </a>
              </motion.div>
            </div>
          )
        ) : (
          <></>
        )}

        {user ? (
          pathname === "/" && (
            <ShoppingCartOutlined
              onClick={() => handelBusketPopOpen({ data })}
              className=""
            />
          )
        ) : (
          <></>
        )}
      </div>
    </motion.div>
  );
};

export default Product;
