import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import '../css/registerpage.css';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = getAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== rePassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert("user succesfully registed:",user);
      // User is registered, redirect to homepage or user dashboard
    } catch (error) {
      console.error("Error registering user", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" className="input-field" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Last Name:
        <input type="text" className="input-field" value={lastname} onChange={e => setLastname(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Phone:
        <input type="tel" className="input-field" value={phone} onChange={e => setPhone(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <label>
        Re-enter Password:
        <input type="password" className="input-field" value={rePassword} onChange={e => setRePassword(e.target.value)} required />
      </label>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="submit-button" disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</button>
    </form>
  );
};

export default RegisterPage;
