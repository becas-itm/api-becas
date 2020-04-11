import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRightAlt } from 'ui/components/Icon';

export function SearchBar() {
  const navigate = useNavigate();
  const [term, setTerm] = React.useState('');
  const handleChange = event => setTerm(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    navigate(`/buscar?term=${term}`, { state: { isSearching: true } });
  };

  return (
    <form onSubmit={handleSubmit} className="pHomeSearchBar">
      <button className="pHomeSearchBar__icon" type="submit" tabIndex={-1}>
        <Search auto />
      </button>
      <input value={term} onChange={handleChange} placeholder="Busca tu beca" />
      <button className="pHomeSearchBar__icon" type="submit" tabIndex={-1}>
        <ArrowRightAlt auto />
      </button>
    </form>
  );
}
