import React from "react";
import QuantitySelector from "./QuantitySelector";

const MenuItem = () => {
  return (
    <li className="p-5">
      <div className="flex justify-between">
        <div>
          <h1>메뉴명</h1>
          <h2>12,000원</h2>
        </div>
        <p>X</p>
      </div>
      <QuantitySelector />
    </li>
  );
};

export default MenuItem;