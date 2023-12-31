import React, { useEffect, useRef, useState } from "react";
import ProductList from "./components/ProductList";

function App() {
  const [category, setCategory] = useState("");

  useEffect(() => {});
  return (
    <>
      <select
        className="from-select"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} />
    </>
  );
}

export default App;
