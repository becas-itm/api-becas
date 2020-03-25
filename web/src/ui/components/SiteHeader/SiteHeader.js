import React from 'react';
import AppLogo from 'ui/components/AppLogo';
import { isBrowser } from 'react-device-detect';
import { Search, Tune } from 'ui/components/Icon';
import IconButton from 'ui/components/IconButton';
import SearchBar from './SearchBar';

function SiteHeader({
  onSearch,
  initialTerm,
  onFilterClick,
  isInitiallySearching = false,
}) {
  const [isSearching, setSearch] = React.useState(isInitiallySearching);
  const toggleSearch = () => setSearch(!isSearching);

  const searchBar = <SearchBar onSearch={onSearch} initialTerm={initialTerm} />;

  if (isBrowser) {
    return (
      <header className="bg-white border-b">
        <div
          style={{ height: '4.5rem' }}
          className="container flex items-center mx-auto px-4"
        >
          <AppLogo />
          <div className="ml-4 sm:ml-16 flex-grow max-w-screen-sm">
            {searchBar}
          </div>
          {onFilterClick && (
            <IconButton
              onClick={onFilterClick}
              icon={Tune}
              className="lg:hidden ml-2"
            >
              Filtrar
            </IconButton>
          )}
        </div>
      </header>
    );
  }

  if (!isSearching) {
    return (
      <header className="bg-white border-b">
        <div className="container h-16 flex items-center justify-between mx-auto px-4">
          <AppLogo />
          <div>
            <IconButton onClick={toggleSearch} icon={Search}>
              Search
            </IconButton>
            {onFilterClick && (
              <IconButton onClick={onFilterClick} icon={Tune} className="ml-4">
                Filtrar
              </IconButton>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b">
      <div className="container h-16 flex items-center justify-between mx-auto px-4">
        {React.cloneElement(searchBar, { focusOnMount: true })}
        <button
          onClick={toggleSearch}
          type="button"
          className="ml-2 p-2 text-primary hover:text-blue-700 select-none"
        >
          Cancelar
        </button>
      </div>
    </header>
  );
}

export default SiteHeader;
