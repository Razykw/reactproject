import React, { useContext } from 'react';
import { CartContext } from '../utiles/CartContext';
import '../css/CartPage.css'; // Import the CSS file for styling

function CartPage() {
  const { cartItems, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    // Implement your checkout logic here
    // This function will be called when the user clicks the checkout button
    // You can send the cart items to your backend or perform any other necessary actions
     console.log(cartItems);
     clearCart(); // If you want to clear the cart after checkout
  };

  const handleClearCart = () => {
    clearCart(); // Call the clearCart function from CartContext to clear the cart
  };
  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <p>Name: {item.name}</p>
              <p>Price: {item.price}$</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-actions">
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
        <button className="clear-cart-btn" onClick={handleClearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default CartPage;
