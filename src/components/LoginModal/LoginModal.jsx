import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin, handleRegisterRoute }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleLogin(e) {
    e.preventDefault();
    console.log("logged in");
    onLogin({ email, password })
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      redirectText="or Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleLogin}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="user-email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="user-password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
      <button
        type="button"
        onClick={handleRegisterRoute}
        className="modal__login-btn"
      >
        Or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
