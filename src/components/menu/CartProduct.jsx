import { cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";

const CartProduct = ({ product, onRemove }) => {
  return (
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
      {!!onRemove && (
        <div className="px-0">
          <button className="p-1" onClick={() => onRemove(index)} type="button">
            <Trash className="w-4 h-4 " />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
