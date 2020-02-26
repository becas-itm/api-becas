import React from 'react';
import propTypes from 'prop-types';
import { isBrowser } from 'react-device-detect';

import { useToggle } from 'utils/hooks';
import { IconButton } from 'ui/components';
import { Search } from 'ui/components/Icon';
import { SearchBar } from 'ui/components/SearchBar';
import { SearchHeader } from 'ui/components/SearchHeader';
import { AppHeader, Bar, Actions } from 'ui/components/AppHeader';

import './SiteHeader.scss';

export function SiteHeader({
  onSearch,
  initialTerm,
  onFilterClick,
  isInitiallySearching = false,
}) {
  const [isSearching, toggleSearch] = useToggle(isInitiallySearching);

  if (isBrowser) {
    return (
      <AppHeader>
        <Bar>
          <SearchBar
            onSearch={onSearch}
            initialTerm={initialTerm}
            className="SiteHeader__SearchBar"
          />
        </Bar>
      </AppHeader>
    );
  }

  if (isSearching) {
    return (
      <SearchHeader
        onBackClick={toggleSearch}
        onFilterClick={onFilterClick}
        searchBar={
          <SearchBar
            focusOnMount
            onSearch={onSearch}
            initialTerm={initialTerm}
          />
        }
      />
    );
  }

  return (
    <AppHeader>
      <Actions>
        <IconButton onClick={toggleSearch} icon={Search}>
          Buscar
        </IconButton>
      </Actions>
    </AppHeader>
  );
}

SiteHeader.propTypes = {
  onSearch: propTypes.func.isRequired,
  initialTerm: propTypes.string,
  onFilterClick: propTypes.func,
  isInitiallySearching: propTypes.bool,
};
