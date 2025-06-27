"use client";
import React, { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "../UseProfile";
import AddressInput from "./AddressInput";

const UserForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user?.city || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();
  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }
  return (
    <div className="flex gap-4">
      <div className="">
        {" "}
        <div className=" p-2 rounded-lg flex-col justify-center">
          <div className="">
            <EditableImage link={image} setLink={setImage} />
          </div>
        </div>
      </div>
      <form
        className="grow ml-2"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            streetAddress,
            city,
            country,
            postalCode,
            admin,
          })
        }
      >
        <label htmlFor="">First and Last Name</label>
        <input
          type="text"
          name=""
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
          placeholder="First and last name"
          id=""
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          name=""
          value={user.email}
          id=""
          placeholder="email"
          disabled
        />
        <AddressInput
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProps={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div className="">
            <label
              htmlFor="adminCb"
              className="p-2 inline-flex items-center gap-2 mb-2"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={"1"}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span className="pl-1">Admin</span>
            </label>
          </div>
        )}

        <button className="bg-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default UserForm;
