import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onRegister, handleLoginRoute, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }
  function handleRegister(e) {
    e.preventDefault();
    console.log("modal submitted");
    onRegister({ email, password, name, avatar });
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Register"
      name="register"
      buttonText="Sign Up"
      redirectText="or Log in"
      onClose={onClose}
      onSubmit={handleRegister}
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{""}
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar{""}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar"
          value={avatar || ""}
          onChange={handleAvatarChange}
          required
        />
      </label>
      <button
        type="button"
        onClick={handleLoginRoute}
        className="modal__login-btn"
      >
        Or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
