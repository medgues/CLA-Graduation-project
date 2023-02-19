import React, { Fragment } from "react";

import blue from "../assets/img/white.png";
import green from "../assets/img/grey.png";
import red from "../assets/img/black.png";

const ProductImages = ({ product }) => {
  return (
    <Fragment>
      <div>
        <img src={blue} alt="blue shoe" className="shoe show " color="blue" />
        <img
          src={product.image_url}
          alt="blue shoe"
          className=" design show scale-40"
          color="blue"
        />
      </div>
      <div>
        <img src={red} alt="red shoe" className="shoe" color="red" />
        <img
          src={product.image_url}
          alt="blue shoe"
          className=" design show scale-40"
          color="blue"
        />
      </div>
      <div>
        <img src={green} alt="green shoe" className="shoe" color="green" />
        <img
          src={product.image_url}
          alt="blue shoe"
          className="design show scale-40"
          color="blue"
        />
      </div>
    </Fragment>
  );
};

export default ProductImages;
