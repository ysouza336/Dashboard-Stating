import "./ConfirmModal.css";

function ConfirmModal({
    open,
    title = "Confirmação",
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel
}) {

    if (!open) return null;

    return (
        <div className="confirm-overlay">

            <div className="confirm-modal">

                {/* Cabeçalho */}

                <div className="confirm-header">

                    <div className="confirm-icon">
                        ⚠️
                    </div>

                    <div>
                        <h4>{title}</h4>
                        <p>Esta ação não poderá ser desfeita.</p>
                    </div>

                </div>

                {/* Conteúdo */}

                <div className="confirm-body">

                    <p>{message}</p>

                </div>

                {/* Rodapé */}

                <div className="confirm-footer">

                    <button
                        type="button"
                        className="btn btn-light border"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmModal;