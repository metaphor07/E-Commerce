import React from "react";
import axios from "axios";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);

  // this is for category wise product fetching
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : `http://localhost:5000/api/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat]);

  // and this is for more filters from the getting products
  useEffect(() => {
    if (cat) {
      const filterProducts = products?.filter(
        (item) =>
          filters &&
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
      );
      setFilterProduct(filterProducts);
    }
  }, [cat, filters, products]);

  // for sort method
  useEffect(() => {
    if (sort === "newest") {
      setFilterProduct((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilterProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilterProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {cat && filters
        ? filterProduct.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
