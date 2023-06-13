import React, { useState } from 'react';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { auth } from './firebase.js';
import '../css/loginpage.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setPersistence(auth, browserSessionPersistence)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // User is signed in, redirect to homepage or user dashboard
      if (user) {
        window.location.replace("/");
      }
    } catch (error) {
      alert("Wrong details")
      console.error("Error signing in", error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button type="submit" className="submit-button">Log in</button>
    </form>
  );
};

export default LoginPage;
