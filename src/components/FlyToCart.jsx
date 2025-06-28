// components/FlyToCart.js
'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cartIconRef } from "@/libs/cartRef"; // adjust path

export default function FlyToCart({ triggerRef, imageSrc, onDone }) {
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);

  useEffect(() => {
    if (triggerRef.current && cartIconRef.current) {
      const start = triggerRef.current.getBoundingClientRect();
      const end = cartIconRef.current.getBoundingClientRect();
      setStartPos(start);
      setEndPos(end);
    }
  }, [triggerRef]);

  if (!startPos || !endPos) return null;

  const deltaX = endPos.left - startPos.left;
  const deltaY = endPos.top - startPos.top;

  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{ x: deltaX, y: deltaY, scale: 0.2, opacity: 0.4 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed z-50 pointer-events-none"
      style={{
        top: startPos.top,
        left: startPos.left,
        width: startPos.width,
        height: startPos.height,
      }}
      onAnimationComplete={onDone}
    >
      <Image
        src={imageSrc}
        alt="Flying Item"
        fill
        style={{ objectFit: "contain" }}
      />
    </motion.div>
  );
}
