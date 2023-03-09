import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchBar.scss';

export default function SearchBar({ value, onChange, placeholder, onEnter }) {
  return (
    <div className="searchbar">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="svg-khutx" />
      <input
        type="text"
        placeholder={placeholder}
        onKeyPress={(e) => {
          if (e.key === 'Enter') onEnter();
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
