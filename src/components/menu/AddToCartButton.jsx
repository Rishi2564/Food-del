'use client';
import React from "react";
import { motion } from "framer-motion";

const AddToCartButton = ({ hasSizesOrExtras, onClick, basePrice, image }) => {
  if (!hasSizesOrExtras) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={onClick}
        className="mt-4 bg-primary text-white rounded-full px-8 py-2 w-full"
      >
        Add to cart &#8377;{basePrice}
      </motion.button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2 w-full"
    >
      <span>Add to cart (From &#8377;{basePrice})</span>
    </button>
  );
};

export default AddToCartButton;
