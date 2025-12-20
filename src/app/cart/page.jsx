"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInput from "@/components/layout/AddressInput";
import SectionHeader from "@/components/layout/SectionHeaders";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";
const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
      }
    }
  }, []);
  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);
  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }
  async function proceedToCheckout(ev) {
    ev.preventDefault();
    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();

          window.location = await response.json();
        } else {
          reject();
        }
      });
    });
    await toast.promise(promise, {
      loading: "Redirecting to checkout...",
      success: "Redirecting to checkout",
      error: "Error in checkout, please try again.",
    });
  }
  if(cartProducts?.length===0){
    return(
      <section className="mt-8 text-center">
        <SectionHeader mainHeader={"Cart"} />
        <div className="my-4">
          <p>Your shopping cart is empty.🥺</p>
        </div>
      </section>
    )
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
            <CartProduct product={product} onRemove={removeCartProduct} />
            ))}
          <div className="py-4 flex justify-between">
            <span className="text-left pl-6 text-lg font-medium">
              Subtotal:
            </span>{" "}
            <span className="text-lg font-semibold pr-20 text-right">
              {" "}
              &#8377;{subtotal}
            </span>{" "}
          </div>
          <div className="py-4 flex justify-between">
            <span className="text-left pl-6 text-lg font-medium">
              Delivery:
            </span>{" "}
            <span className="text-lg font-semibold pr-20 text-right">
              {" "}
              &#8377;85
            </span>{" "}
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-2xl">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <label htmlFor="">Address</label>
            <AddressInput
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay &#8377;{subtotal + 85}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
