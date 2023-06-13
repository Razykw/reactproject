import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { db } from './firebase.js';
import '../css/addproductpage.css';

function AddProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  // const handleImageChange = (e) => {
  //   const selectedImage = e.target.files[0];
  //   setImage(selectedImage);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const productRef = ref(db, 'products');
      const newProductRef = push(productRef);

      const newProduct = {
        name: name,
        price: price,
        image: image ,
      };

      set(newProductRef, newProduct);
      console.log('Product added successfully!');
      setName('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  return (
    <div className="add-product-page">
      <h1>Add Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input type="text" className="form-input" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="form-label">
          Price:
          <input type="text" className="form-input" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label className="form-label">
          Image-URL:
          <input type="text" className="form-input" name="image" value={image}  onChange={(e) => setImage(e.target.value)} />
        </label>
        <input type="submit" value="Submit" className="form-submit-btn" />
      </form>
    </div>
  );
}

export default AddProductPage;
