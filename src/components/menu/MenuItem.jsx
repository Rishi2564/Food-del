import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";
import FlyingButton from "react-flying-item";

const MenuItem = (menuItem) => {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);
  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  async function handleAddToCartButtonClick() {
    console.log("add to cart");
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("hiding popup");
    setShowPopup(false);
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-md max-h-[90vh] overflow-y-auto z-50"
            onClick={(ev) => ev.stopPropagation()}
          >
            <Image
              src={image}
              alt="name"
              width={300}
              height={300}
              className="mx-auto"
            />
            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
            <p className="text-center text-gray-500 text-sm">{description}</p>
            {sizes?.length > 0 && (
              <div className="py-2">
                <h3 className="text-center text-gray-500">Pick your size</h3>
                {sizes.map((size) => (
                  <label
                    htmlFor={`size-${size.name}`}
                    className="flex items-center gap-2 p-4 border rounded-md mb-1"
                  >
                    <input
                      type="radio"
                      onClick={() => setSelectedSize(size)}
                      checked={selectedSize?.name === size.name}
                      name="size"
                      id={`size-${size.name}`}
                    />{" "}
                    {size.name}&nbsp; &#8377;{basePrice + size.price}
                  </label>
                ))}
              </div>
            )}
            {extraIngredientPrices?.length > 0 && (
              <div className="py-2">
                <h3 className="text-center text-gray-500">
                  Pick your Extra Ingredients
                </h3>
                {extraIngredientPrices.map((extraThing) => (
                  <label
                    htmlFor={`extraThing-${extraThing.name}`}
                    className="flex items-center gap-2 p-4 border rounded-md mb-1"
                  >
                    <input
                      type="checkbox"
                      name="extraThing.name"
                      onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                      id={`extraThing-${extraThing.name}`}
                    />{" "}
                    {extraThing.name}
                    &nbsp;&nbsp;&#8377;{extraThing.price}
                  </label>
                ))}
              </div>
            )}

            <div
              className="bg-primary sticky bottom-1 rounded-2xl"
              onClick={handleAddToCartButtonClick}
            >
              {" "}
              <FlyingButton targetTop="10%" targetLeft="73%" src={image}>
                Add to cart &#8377;{selectedPrice}
              </FlyingButton>{" "}
            </div>

            <button
              type="button"
              className="mt-2"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};

export default MenuItem;
