import React, { useContext } from "react";
import { CardContext } from "../../../../contexts/CardContext";
import { PopupContext } from "../../../../contexts/PopupContext";

const Info = ({ product }) => {
  const { setShowModal } = useContext(PopupContext);

  const { dispatch } = useContext(CardContext);

  const shoeName = (
    <div className="shoeName">
      <div>
        <h1 className="big">{product.title}</h1>
        <span className="new">new</span>
      </div>
      <h3 className="small">Designed By :{product.postedBy}</h3>
    </div>
  );

  const description = (
    <div className="description">
      <h3 className="title">Product Info</h3>
      <p className="text">{product.description}</p>
    </div>
  );
  const KindTaps = (
    <div className="tabs pt-1">
      <a className="tab tab-sm tab-lifted tab-active">t-shirt</a>
      <a className="tab tab-sm tab-lifted ">long sleevs</a>
      <a className="tab tab-sm tab-lifted">hoddie</a>
    </div>
  );
  const ColorContainer = (
    <div className="color-container">
      <h3 className="title">Color</h3>
      <div className="colors">
        <span
          className="color active"
          primary="#2175f5"
          id="white"
          color="blue"
        ></span>
        <span className="color" primary="#f84848" id="black" color="red"></span>
        <span
          className="color"
          primary="#29b864"
          id="gray"
          color="green"
        ></span>
      </div>
    </div>
  );

  const SizeContainer = (
    <div className="size-container">
      <h3 className="title">size</h3>
      <div className="sizes">
        <span className="size">s</span>
        <span className="size">m</span>
        <span className="size active">l</span>
        <span className="size">xl</span>
        <span className="size">xxl</span>
      </div>
    </div>
  );
  const addToBasket = () => {
    const selectedSize =
      document.getElementsByClassName("size active")[0].innerHTML;
    const selectedColor = document
      .getElementsByClassName("color active")[0]
      .getAttribute("id");
    // console.log("size", size);
    // console.log("color", selectedColor);
    setShowModal(false);
    dispatch({
      type: "ADD_TO_CARD",
      item: {
        ...product,
        size: selectedSize,
        color: selectedColor,
      },
    });
  };
  const BuySection = (
    <div className="buy-price">
      <button className="buy pointer" onClick={addToBasket}>
        <i className="fas fa-shopping-cart"></i>Add to card
      </button>
      <div className="price">
        <i className="fas fa-dollar-sign"></i>
        <h1>200DA</h1>
      </div>
    </div>
  );

  return (
    <div className="info">
      {shoeName}
      {description}
      {KindTaps}
      {ColorContainer}
      {SizeContainer}
      {BuySection}
    </div>
  );
};

export default Info;
