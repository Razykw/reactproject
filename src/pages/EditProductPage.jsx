import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, ref, update } from 'firebase/database';
import { db } from './firebase.js'; // Adjust the import based on your folder structure
import '../css/editproductpage.css';

function EditProductPage() {
  let { productId } = useParams();
  let navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', image: '' });

  useEffect(() => {
    const productRef = ref(db, `products/${productId}`);
    get(productRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productRef = ref(db, `products/${productId}`);
    try {
      await update(productRef, product);
      navigate('/products'); // redirect to products page after successful update
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="edit-product-page">
      <h1>Edit Product: {productId}</h1>
      <form className="edit-product-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input type="text" className="form-input" name="name" value={product.name} onChange={handleInputChange} />
        </label>
        <label className="form-label">
          Price:
          <input type="text" className="form-input" name="price" value={product.price} onChange={handleInputChange} />
        </label>
        <label className="form-label">
          Image:
          <input type="text" className="form-input" name="image" value={product.image} onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" className="form-submit-btn" />
      </form>
    </div>
  );
}

export default EditProductPage;
