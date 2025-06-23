import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";

const MenuItemPriceProps = ({ name, props, setProps, addLabel }) => {
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
      <div className="flex gap-1">
        <div className="">
          <button className="inline-flex p-1" type="button">
            Toggle
          </button>
        </div>
        <h3 className="text-gray-700">{name}</h3>
      </div>
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
  );
};

export default MenuItemPriceProps;
