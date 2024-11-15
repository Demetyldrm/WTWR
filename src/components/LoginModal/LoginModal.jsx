import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "../ModalWithForm/ModalWithForm.css";
import "./LoginModal.css";

const LoginModal = ({
  isOpen,
  closeActiveModal,
  onLogIn,
  openRegisterModal,
}) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogIn(data);
    setData({ email: "", password: "" });
  };

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email{" "}
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
          className="modal__input modal__input-password"
          id="user-password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__buttons-wrapper">
        <button type="submit" className="modal__submit">
          Log In
        </button>
        <button
          type="button"
          className="modal__or-signup-btn"
          onClick={openRegisterModal}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
