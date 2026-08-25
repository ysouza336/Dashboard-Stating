
import { useState } from "react";

import {
    Copy,
    CheckCircle,
    Lock
} from "lucide-react";

import "./ServiceTagInput.css";

function ServiceTagInput({
    value
}) {

    const [copiado, setCopiado] = useState(false);

    async function copiarTag() {

        if (!value) return;

        await navigator.clipboard.writeText(value);

        setCopiado(true);

        setTimeout(() => {
            setCopiado(false);
        }, 2000);

    }

    return (

        <div className="mb-3">

            <label className="form-label">

                Service Tag

            </label>

            <div className="service-tag-container">

                <div className="service-tag-input">

                    <Lock size={16} />

                    <input
                        type="text"
                        value={value || ""}
                        readOnly
                    />

                </div>

                <button
                    type="button"
                    className="copy-button"
                    onClick={copiarTag}
                    disabled={!value}
                >

                    {copiado
                        ? (
                            <>
                                <CheckCircle size={16} />
                                Copiado
                            </>
                        )
                        : (
                            <>
                                <Copy size={16} />
                                Copiar
                            </>
                        )}

                </button>

            </div>

            <small className="service-tag-info">

                Gerado automaticamente a partir do Hostname.

            </small>

        </div>

    );

}

export default ServiceTagInput;

