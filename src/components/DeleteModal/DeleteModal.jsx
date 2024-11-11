import "./DeleteModal.css";

function DeleteModal({
  activeModal,
  closeActiveModal,
  handleCardDelete,
  selectedCard,
}) {
  const onCardDelete = () => {
    handleCardDelete(selectedCard);
  };

  return (
    <div
      className={`modal ${
        activeModal === "delete-confirmation" && "modal_opened"
      }`}
    >
      <div className="modal__content modal__content_type_delete">
        <button
          className="modal__close"
          type="button"
          onClick={closeActiveModal}
        />
        <p className="modal__delete__header">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__delete__buttons">
          <button
            className="modal__delete__btn modal__delete__btn_type_delete"
            onClick={onCardDelete}
          >
            Yes, delete item
          </button>
          <button
            className="modal__delete__btn modal__delete__btn_type_cancel"
            onClick={closeActiveModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
