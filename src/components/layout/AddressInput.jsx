import React from 'react'

const AddressInput = ({addressProps,setAddressProps, disabled=false }) => {
    const {phone, streetAddress, postalCode, city, country}= addressProps;
  return (
    <> <label htmlFor="">Phone</label>
        <input
        disabled={disabled}
          type="text"
          placeholder="Ph no"
          name=""
          id=""
          value={phone}
          onChange={(ev) => setAddressProps('phone',ev.target.value)}
        />
        <label htmlFor="">Street Address</label>
        <input
        disabled={disabled}
          type="text"
          placeholder="Street Address"
          name=""
          id=""
          value={streetAddress}
          onChange={(ev) => setAddressProps('streetAddress',ev.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <div className="">
            {" "}
            <label htmlFor="">Postal Code</label>
            <input
            disabled={disabled}
              type="text"
              placeholder="Postal Code"
              name=""
              id=""
              value={postalCode}
              onChange={(ev) => setAddressProps('postalCode',ev.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="">City</label>
            <input
            disabled={disabled}
              type="text"
              placeholder="City"
              name=""
              id=""
              value={city}
              onChange={(ev) => setAddressProps('city',ev.target.value)}
            />
          </div>
        </div>
        <label htmlFor="">Country</label>
        <input
        disabled={disabled}
          type="text"
          placeholder="Country"
          name=""
          id=""
          value={country}
          onChange={(ev) => setAddressProps('country',ev.target.value)}
        /></>
  )
}

export default AddressInput