import React from "react";
import AddToCartButton from "./AddToCartButton";

const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;
    const hasSizesOrExtras= sizes?.length > 0 || extraIngredientPrices?.length > 0
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/75 transition-all flex flex-col">
      <div className="grow">
        <div className="text-center ">
          <img
            className="max-h-auto max-h-27 block mx-auto"
            src={image}
            alt="pizza"
          />
        </div>

        <h4 className="font-semibold text-xl my-3">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      </div>
     <AddToCartButton hasSizesOrExtras={hasSizesOrExtras} onClick={onAddToCart} basePrice={basePrice} image={image}/>
    </div>
  );
};

export default MenuItemTile;
