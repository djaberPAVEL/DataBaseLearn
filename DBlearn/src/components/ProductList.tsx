import React, { useEffect, useState } from "react";

const ProductList = ({category}: { category: string }) => {
  const [products, setProducts] = useState<String[]>();
  useEffect(() => {
    console.log("fetching product",category);
    setProducts(["clothing", "household"]);
  }, [category]);
  return <div>ProductList</div>;
};

export default ProductList;
