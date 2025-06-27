import React from "react";
import FlyingButton from "react-flying-item";

const AddToCartButton = ({ hasSizesOrExtras, onClick, basePrice, image }) => {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent">
        {" "}
        <FlyingButton targetTop={"10%"} targetLeft={"73%"} src={image}>
          <div onClick={onClick}>
            Add to cart &#8377;
            {basePrice}
          </div>
        </FlyingButton>
      </div>
    );
  }
  return (
    <button
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add to cart (From &#8377;{basePrice})</span>
    </button>
  );
};

export default AddToCartButton;
