import "./DeleteModal.css";

function DeleteModal({ isOpen, onClose, handleCardDelete }) {
  return (
    <div
      className={`modal ${isOpen === "delete-confirmation" && "modal_opened"}`}
    >
      <div className="modal__content modal__content_delete">
        <button className="modal__close" type="button" onClick={onClose} />
        <div className="modal__questions">
          <p className="modal__delete__header">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__question_warning">
            This action is irreversible.
          </p>
          <div className="modal__delete-buttons">
            <button
              className="modal__delete__btn modal__question_confirm"
              onClick={handleCardDelete}
            >
              Yes, delete item
            </button>
            <button onClick={onClose} className="modal__question_cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
