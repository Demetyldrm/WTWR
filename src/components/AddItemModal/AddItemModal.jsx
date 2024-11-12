import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "../ModalWithForm/ModalWithForm.css";
import "./AddItemModal.css";

const AddItemModal = ({ closeActiveModal, addItem, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [weather, setSelectedWeatherType] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setSelectedWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({ name, imageUrl, weather }, resetForm);
  };

  function resetForm() {
    setName("");
    setUrl("");
    setSelectedWeatherType("");
  }

  return (
    <ModalWithForm
      title="New garment"
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          minLength="1"
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          htmlFor="hot"
          className={`modal__label modal__label_type_radio ${
            weather === "hot" ? "modal__label_type_radio--selected" : ""
          }`}
        >
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label
          htmlFor="warm"
          className={`modal__label modal__label_type_radio ${
            weather === "warm" ? "modal__label_type_radio--selected" : ""
          }`}
        >
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label
          htmlFor="cold"
          className={`modal__label modal__label_type_radio ${
            weather === "cold" ? "modal__label_type_radio--selected" : ""
          }`}
        >
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
