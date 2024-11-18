import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  isOpen,
  buttonClass = "modal__submit modal_submit_filled",
  handleCloseModal,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
