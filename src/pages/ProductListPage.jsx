import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {  ref, remove,onValue } from 'firebase/database';
import { db } from './firebase.js'; // Adjust the import based on your folder structure
import '../css/ProductListPage.css';

function ProductListPage() {
  const [products, setProducts] = useState([]);

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

  const handleDeleteProduct = (productId) => {
    const productRef = ref(db, `products/${productId}`);
    remove(productRef)
      .then(() => {
        console.log('Product deleted successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="product-list-page">
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.image} alt={product.name}></img>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <Link to={`/products/edit/${product.id}`}>Edit</Link>
          <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ProductListPage;
