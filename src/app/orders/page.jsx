"use client";
import SectionHeader from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import React, { useState, useEffect } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { loading, data: profile } = useProfile();
  useEffect(() => {
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders);
      });
    });
  }, []);
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8 ">
        {orders?.length > 0 &&
          orders.map((order) => (
            <div className="bg-gray-100 mb-2 p-4 rounded-lg flex justify-between">
              <div className="w-1/3 truncate">{order.userEmail}</div>
              <div className="w-1/3 text-center">
                {order.paid ? "Paid" : "Not Paid"}
              </div>
              <div className="w-1/3 text-right">
                {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default OrdersPage;
