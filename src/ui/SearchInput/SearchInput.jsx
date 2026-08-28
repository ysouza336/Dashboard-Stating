import { Search, X } from "lucide-react";
import "./SearchInput.css";

function SearchInput({
  value,
  onChange,
  placeholder = "Pesquisar...",
  onClear,
  autoFocus = false,
}) {
  return (
    <div className="search-input-container">
      <Search size={18} className="search-input-icon" />

      <input
        type="text"
        className="search-input-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />

      {value && (
        <button
          type="button"
          className="search-input-clear"
          onClick={() => (onClear ? onClear() : onChange(""))}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchInput;