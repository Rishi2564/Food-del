"use client";

import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useState, useContext, useEffect } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import AddressInput from "@/components/layout/AddressInput";
import { set } from "mongoose";
import CartProduct from "@/components/menu/CartProduct";

const OrderPage = () => {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const [loadingOrder, setLoadingOrder] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }

    if (id) {
      setLoadingOrder(true);
      fetch(`/api/orders?_id=${id}`).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }
  }, []);
let subtotal = 0;
if(order?.cartProducts){
  for(const product of order.cartProducts){
    subtotal+=cartProductPrice(product);
  }
}
  return (
    <section className="max-w-2xl mx-auto text-center mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your Order" />
        <div className="my-8">
          <p>Thanks for your Order..</p>
          <p>We will call you when your order is on the way!!!</p>
        </div>
      </div>
      {loadingOrder && <div>Loading order details...</div>}
      {order && (
        <div className="grid grid-cols-2 gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct product={product} />
            ))}
            <div className="text-right py-2  text-gray-500">
              Subtotal: <span className="text-black font-bold inline-block w-8">&#8377;{subtotal}</span>{" "}<br/>
               Delivery: <span className="text-black font-bold inline-block w-8">&#8377;85</span>{" "}<br/>
                Total: <span className="text-black font-bold inline-block w-8">&#8377;{subtotal + 85}</span>{" "}
            </div>
          </div>
          <div>
            <div className="bg-gray-100 rounded-lg">
              <AddressInput disabled={true} addressProps={{ ...order }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
