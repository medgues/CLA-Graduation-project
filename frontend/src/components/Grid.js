import React, { useContext } from "react";
import Product from "./product";

import { Auth } from "../contexts/Auth";
import { useLocation } from "react-router-dom";
import PopUpModals from "./PopUpModals";

import { AnimatePresence, motion } from "framer-motion";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { PopupContext } from "../contexts/PopupContext";

const ProductsGrid = ({
  data,
  handelPopUpOpen,
  disactivateToggleIsTrue,
  handelEditFormPopUpOpen,
  handelCardModalOpen,
}) => {
  const { user } = useContext(Auth);
  const { pathname } = useLocation();
  const { addProductForm } = PopUpModals();
  const { setModalComponent, setShowModal } = useContext(PopupContext);

  const handelPopOpen = () => {
    setModalComponent(addProductForm);
    setShowModal(true);
  };

  return (
    <div className="grid max-w-7xl gap-4 mt-2">
      {user && pathname === `/${user.username}` ? (
        <div
          onClick={handelPopOpen}
          className=" flex justify-center items-center relative bg-slate-200 w-40 h-[24.5rem] rounded-t-md  w-full hover:cursor-pointer border"
        >
          <motion.div
            className="box"
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <AppstoreAddOutlined style={{ fontSize: "300%" }} />
          </motion.div>
        </div>
      ) : null}
      <AnimatePresence initial={false}>
        {data.map((product) => (
          <motion.div
            layout
            transition={{
              duration: 0.5,
              type: "ease",
              ease: "easeInOut",
              // stiffness: 350,
              // damping: 25,
            }}
            key={product._id}
          >
            <div key={product._id}>
              <Product
                disactivateToggleIsTrue={disactivateToggleIsTrue}
                handelPopUpOpen={handelPopUpOpen}
                handelEditFormPopUpOpen={handelEditFormPopUpOpen}
                handelCardModalOpen={handelCardModalOpen}
                data={product}
                // price={product.amount}
                // rating={product.rating}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductsGrid;
