import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText = "Add garment",
  title,
  isOpen,
  handleCloseModal,
  onSubmit,
  additionalText = null,
}) {
  return (
    <div className={`modal  ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons">
            <button
              type="submit"
              className="modal__submit modal__submit-signup"
            >
              {buttonText}
            </button>
            {additionalText && (
              <span className="modal__additional-text">{additionalText}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
