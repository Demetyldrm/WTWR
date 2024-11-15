import { useContext, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

const EditProfileModal = ({
  isOpen,
  closeActiveModal,
  onEditProfileSubmit,
}) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value || "");
  };

  const [avatar, setAvatarUrl] = useState("");
  const handleAvatarChange = (e) => {
    setAvatarUrl(e.target.value || "");
  };
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfileSubmit({ name, avatar });
  }

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      buttonText="Save Changes"
      title="Change Profile Data"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onEditProfileSubmit={handleSubmit}
      name={"editprofile"}
    >
      <label htmlFor="Name" className="modal__label">
        Name*{" "}
        <input
          required
          value={currentUser.name}
          autoComplete="off"
          type="text"
          className="modal__input"
          id="name"
          placeholder={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar*{" "}
        <input
          required
          value={currentUser.avatar}
          autoComplete="off"
          type="url"
          className="modal__input"
          id="avatar"
          placeholder={avatar}
          onChange={handleAvatarChange}
        />
      </label>
      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
};
export default EditProfileModal;
