import React from 'react';
import { ArrowBack, Tune } from 'ui/components/Icon';
import { IconButton } from 'ui/components/IconButton';
import './SearchHeader.scss';

export function SearchHeader({ searchBar, onBackClick, onFilterClick }) {
  return (
    <div className="SearchHeader">
      <IconButton onClick={onBackClick} icon={ArrowBack}>
        Ir atrás
      </IconButton>
      <div className="SearchHeader__searchBar">{searchBar}</div>
      <IconButton onClick={onFilterClick} icon={Tune}>
        Ver filtros de búsqueda
      </IconButton>
    </div>
  );
}
