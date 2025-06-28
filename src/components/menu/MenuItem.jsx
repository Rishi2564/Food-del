"use client";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../AppContext";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";
import { motion } from "framer-motion";
import FlyToCart from "@/components/FlyToCart";

const MenuItem = (menuItem) => {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;

  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [flying, setFlying] = useState(false);

  const imageRef = useRef(null);
  const { addToCart } = useContext(CartContext);

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) =>
        prev.filter((e) => e.name !== extraThing.name)
      );
    }
  }

  async function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    setFlying(true);
    addToCart(menuItem, selectedSize, selectedExtras);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setShowPopup(false);
  }

  let selectedPrice = basePrice;
  if (selectedSize) selectedPrice += selectedSize.price;
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div
              ref={imageRef}
              className="mx-auto relative w-[300px] h-[300px]"
            >
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain rounded-md"
              />
            </div>

            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
            <p className="text-center text-gray-500 text-sm">{description}</p>

            {sizes?.length > 0 && (
              <div className="py-2">
                <h3 className="text-center text-gray-500">Pick your size</h3>
                {sizes.map((size) => (
                  <label
                    key={size.name}
                    htmlFor={`size-${size.name}`}
                    className="flex items-center gap-2 p-4 border rounded-md mb-1"
                  >
                    <input
                      type="radio"
                      onClick={() => setSelectedSize(size)}
                      checked={selectedSize?.name === size.name}
                      name="size"
                      id={`size-${size.name}`}
                    />
                    {size.name}&nbsp; ₹{basePrice + size.price}
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
                    key={extraThing.name}
                    htmlFor={`extraThing-${extraThing.name}`}
                    className="flex items-center gap-2 p-4 border rounded-md mb-1"
                  >
                    <input
                      type="checkbox"
                      onChange={(ev) =>
                        handleExtraThingClick(ev, extraThing)
                      }
                      id={`extraThing-${extraThing.name}`}
                    />
                    {extraThing.name}&nbsp; ₹{extraThing.price}
                  </label>
                ))}
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleAddToCartButtonClick}
              className="bg-primary text-white py-2 px-4 w-full rounded-2xl"
            >
              Add to cart ₹{selectedPrice}
            </motion.button>

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

      {flying && (
        <FlyToCart
          triggerRef={imageRef}
          imageSrc={image}
          onDone={() => setFlying(false)}
        />
      )}

      {/* Menu preview tile */}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};

export default MenuItem;
