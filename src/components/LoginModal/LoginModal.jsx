import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "../ModalWithForm/ModalWithForm.css";
import "./LoginModal.css";

const LoginModal = ({ isOpen, closeActiveModal, onLogIn, onToggleModal }) => {
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
      additionalText={
        <a className="modal__sign-up-link" onClick={onToggleModal}>
          or Sign Up
        </a>
      }
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
      {/* <button
        type="button"
        onClick={onSignUp}
        className="modal__submit modal__submit_signup"
      ></button> */}
    </ModalWithForm>
  );
};

export default LoginModal;
