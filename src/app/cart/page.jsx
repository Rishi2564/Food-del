"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInput from "@/components/layout/AddressInput";
import SectionHeader from "@/components/layout/SectionHeaders";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {useProfile} from "@/components/UseProfile"
const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] =useState({});
  const {data:profileData}= useProfile();
  useEffect(()=>{
    if(profileData?.city){
        const {phone, streetAddress, city, postalCode, country}= profileData;
        const addressFromProfile={
            phone,
            streetAddress,
            city,
            postalCode,
            country,
        };
        setAddress(addressFromProfile);
    }
  },[profileData]);
  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }
  function handleAddressChange(propName, value){
    setAddress(prevAddress=>({...prevAddress,[propName]:value}))
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeader mainHeader={"Cart"} />
      </div>
      <div className=" mt-8 grid gap-8 md:grid-cols-2 ">
        <div className="">
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div className="flex items-center gap-4  border-b py-4">
                <div className="w-24 rounded-lg">
                  <Image
                    className="rounded-lg"
                    src={product.image}
                    width={240}
                    height={240}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm  text-gray-700">
                      {product.extras.map((extra) => (
                        <div>
                          {extra.name} &#8377;{extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex text-lg font-semibold">
                  &#8377;{cartProductPrice(product)}
                </div>
                <div className="px-0">
                  <button
                    className="p-1"
                    onClick={() => removeCartProduct(index)}
                    type="button"
                  >
                    <Trash className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-4 flex justify-between">
            <span className="text-left pl-6 text-lg font-medium">Subtotal:</span>{" "}
            <span className="text-lg font-semibold pr-20 text-right"> &#8377;{total}</span>{" "}
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-2xl">
            <h2>Checkout</h2>
            <form action="">
                <label htmlFor="">Address</label>
                <AddressInput addressProps={address}
                setAddressProps={handleAddressChange}  />
                <button type="submit">Pay  &#8377;{total}</button>
            </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
