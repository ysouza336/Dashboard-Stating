import "./ConfirmModal.css";

function ConfirmModal({
    open,
    title,
    message,
    onConfirm,
    onCancel
}) {

    if (!open) return null;

    return (
        <div className="confirm-overlay">

            <div className="confirm-modal">

                <div className="confirm-header">

                    <h4>{title}</h4>

                </div>

                <div className="confirm-body">

                    <p>{message}</p>

                </div>

                <div className="confirm-footer">

                    <button
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={onConfirm}
                    >
                        Excluir
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmModal;