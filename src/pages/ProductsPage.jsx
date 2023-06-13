import React, { useState, useEffect, useContext } from 'react';
import {  ref, onValue } from 'firebase/database';
import { db } from './firebase.js';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { CartContext } from '../utiles/CartContext.js';
import '../css/productcard.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const {  addToCart } = useContext(CartContext); // use addToCart instead of setCartItems

  const handleAddToCart = (product) => {
    addToCart(product); // use addToCart from CartContext
  };

  // // Log cartItems after it has been updated
  // useEffect(() => {
  //   console.log('Updated cartItems:', cartItems);
  // }, [cartItems]);

  // Fetch products from the database
  useEffect(() => {
    const productsRef = ref(db, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productList = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setProducts(productList);
    });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      
      <Link to="/cart" className="cart-link">Go to Cart</Link>
    </div>
  );
}

export default ProductsPage;
