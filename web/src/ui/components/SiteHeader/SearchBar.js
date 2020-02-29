import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { Search, Close } from 'ui/components/Icon';
import IconButton, { SHAPE } from 'ui/components/IconButton';

function SearchBar({ initialTerm, onSearch, focusOnMount }) {
  const inputRef = React.useRef();

  const [term, setTerm] = React.useState(initialTerm);
  const clearTerm = () => setTerm('');
  const triggerSearch = () => onSearch(term);

  const handleFormSubmit = event => {
    event.preventDefault();
    triggerSearch();
  };

  const handleInputChange = event => setTerm(event.target.value);

  const handleInputKeyDown = event => {
    if (event.key === 'Escape') {
      clearTerm();
    }
  };

  const handleClearClick = () => {
    clearTerm();
    inputRef.current.focus();
  };

  React.useEffect(() => {
    if (focusOnMount) {
      inputRef.current.focus();
    }
  }, [focusOnMount]);

  const inputStyles = classNames(
    'w-full h-12 outline-none rounded-md',
    ' border border-transparent bg-gray-100 focus:bg-white focus:border-gray-300',
    'duration-100 ease-in-out appearance-none',
    term ? 'px-12' : 'pl-12',
  );

  return (
    <form onSubmit={handleFormSubmit} className="relative flex-grow">
      <div className="absolute left-0 ml-4 inset-y-0 flex items-center pointer-events-none">
        <Search className="text-gray-600" />
      </div>
      <input
        value={term}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        ref={inputRef}
        type="text"
        placeholder="Buscar"
        className={inputStyles}
      />
      {term && (
        <div className="absolute right-0 mr-2 inset-y-0 flex items-center">
          <IconButton
            onClick={handleClearClick}
            icon={Close}
            shape={SHAPE.simple}
          >
            Limpiar búsqueda
          </IconButton>
        </div>
      )}
    </form>
  );
}

SearchBar.defaultProps = {
  initialTerm: '',
  onSearch: () => {},
};

SearchBar.propTypes = {
  focusOnMount: propTypes.bool,
  initialTerm: propTypes.string,
  onSearch: propTypes.func,
};

export default SearchBar;
