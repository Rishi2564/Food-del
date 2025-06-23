import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import ChevronUp from "@/components/icons/ChevronUp";
import ChevronDown from "@/components/icons/ChevronDown";
import { useState } from "react";

const MenuItemPriceProps = ({ name, props, setProps, addLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  function addProps() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProps(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        className="flex p-1 border-0 !justify-start"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}

        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div className="flex gap-2 items-end">
              <div className="">
                {" "}
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editProps(ev, index, "name")}
                />
              </div>
              <div className="">
                <label htmlFor="">Extra Price</label>
                <input
                  type="number"
                  name=""
                  placeholder="Extra Price"
                  id=""
                  value={size.price}
                  onChange={(ev) => editProps(ev, index, "price")}
                />
              </div>
              <div className="">
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white mb-2 px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProps}
          className="bg-white items-center"
        >
          <Plus className="w-4 h-4" /> <span>{addLabel} </span>
        </button>
      </div>
    </div>
  );
};

export default MenuItemPriceProps;
