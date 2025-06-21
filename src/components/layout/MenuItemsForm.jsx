import React, { useState } from 'react'
import EditableImage from "@/components/layout/EditableImage";
const MenuItemsForm = ({onSubmit, menuItem}) => {
    const [image, setImage] = useState(menuItem?.image||"");
      const [name, setName] = useState(menuItem?.name || "");
      const [description, setDescription] = useState(menuItem?.description|| "");
      const [basePrice, setBasePrice] = useState(menuItem?.basePrice||0);
  return (
    <form
            onSubmit={ev=>onSubmit(ev,{image, name, description, basePrice})}
            action=""
            className="mt-8 max-w-md mx-auto"
          >
            <div
              className="grid grid-cols-2 items-start gap-4"
              style={{ gridTemplateColumns: ".3fr .7fr" }}
            >
              <div className="">
                <EditableImage link={image} setLink={setImage} />
              </div>
              <div className="grow">
                <label htmlFor="">Item Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(ev) => setDescription(ev.target.value)}
                />
                <label htmlFor="">Base Price</label>
                <input
                  type="number"
                  value={basePrice}
                  onChange={(ev) => setBasePrice(ev.target.value)}
                />
                
                <button type="submit">Save</button>
              </div>
            </div>
          </form>
  )
}

export default MenuItemsForm