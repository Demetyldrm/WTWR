import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "../ModalWithForm/ModalWithForm.css";
import "./LoginModal.css";

const LoginModal = ({
  isOpen,
  closeActiveModal,
  buttonClass = "modal__submit",
  onLogIn,
  openRegisterModal,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(data.email.trim() !== "" && data.password.trim() !== "");
  }, [data.email, data.password]);

  useEffect(() => {
    setData({ email: "", password: "" });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogIn(data);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      buttonClass={`modal__submit ${
        isButtonActive ? "modal__submit_filled" : ""
      }`}
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
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, email: e.target.value }))
          }
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
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, password: e.target.value }))
          }
          required
        />
      </label>
      <div className="modal__buttons-wrapper">
        <button
          type="submit"
          className={`${buttonClass} ${
            isButtonActive ? "modal__submit_filled" : ""
          }`}
        >
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
