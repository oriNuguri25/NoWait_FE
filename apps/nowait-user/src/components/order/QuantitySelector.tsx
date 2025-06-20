import React from "react";

interface PropsType {}

const QuantitySelector = () => {
  const decreaseQuantity = () => {};
  const increaseQuantity = () => {};
  return (
    <div className="flex items-center justify-end gap-1.5">
      <button onClick={decreaseQuantity}>-</button>
      <p>1</p>
      <button onClick={increaseQuantity}>+</button>
    </div>
  );
};

export default QuantitySelector;
