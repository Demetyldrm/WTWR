import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, handleCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const { name, imageUrl, weather, owner } = card || {};
  const isOwner = currentUser && currentUser.id === card.ownerId;
  const itemDeleteButton = `modal__delete ${
    isOwner ? "modal__delete" : "modal__delete-hidden"
  }`;
  return (
    <div className={`modal ${isOpen === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        +-..52
        <img src={imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{name}</h2>
          <p className="modal__weather">Weather :{weather}</p>
          {isOwner && (
            <button
              onClick={() => onDelete(card)}
              className="modal__delete-button"
            >
              Delete item
            </button>
          )}
          {!isOwner && (
            <p className="modal__no-permission">You cannot delete this item.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
