const MenuItem = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/75 transition-all">
      <div className="text-center ">
        <img className="max-h-auto max-h-27 block mx-auto" src="/pizza.png" alt="pizza" />
      </div>

      <h4 className="font-semibold text-xl my-3">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat nam
        voluptas autem repudiandae fugit in ipsam ab modi ducimus iste,
        voluptatibus voluptatum, distinctio architecto voluptatem porro qui et
        quos. Porro.
      </p>
      <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
        Add to cart 12$
      </button>
    </div>
  );
};

export default MenuItem;
