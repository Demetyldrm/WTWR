import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "../ModalWithForm/ModalWithForm.css";
import "./AddItemModal.css";

const AddItemModal = ({ closeActiveModal, addItem, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [weather, setSelectedWeatherType] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addItem({ name, imageUrl, weather, resetForm });
  };

  function resetForm() {
    setName("");
    setUrl("");
    setSelectedWeatherType("");
  }
  useEffect(() => {
    setIsButtonActive(
      name.trim() !== "" && imageUrl.trim() !== "" && weather.trim() !== ""
    );
  }, [name, imageUrl, weather]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="garmentName"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          minLength="1"
          maxLength="30"
        />
      </label>
      <label className="modal__label">
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
      <button
        type="submit"
        className={`modal__submit ${
          isButtonActive ? "modal__submit_active" : ""
        }`}
        disabled={!isButtonActive}
      >
        Add garment
      </button>
    </ModalWithForm>
  );
};

export default AddItemModal;
