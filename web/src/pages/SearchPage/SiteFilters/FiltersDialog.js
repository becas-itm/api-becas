import React from 'react';
import propTypes from 'prop-types';

import { Close } from 'ui/components/Icon';
import { Dialog, SIZE } from 'ui/components/Dialog';
import { IconButton, SHAPE } from 'ui/components/IconButton';

function FiltersDialog({ isOpen, onDismiss, children }) {
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={onDismiss}
      size={SIZE.full}
      aria-labelledby="filter-search-title"
      renderClose={false}
    >
      <div className="relative w-full max-w-sm mx-auto">
        <IconButton
          icon={Close}
          onClick={onDismiss}
          shape={SHAPE.square}
          className="absolute top-0 right-0"
        >
          Cerrar filtros
        </IconButton>
        <h3 id="filter-search-title" className="mb-6 text-xl font-semibold">
          Filtrar búsqueda
        </h3>
        {children}
      </div>
    </Dialog>
  );
}

FiltersDialog.propTypes = {
  isOpen: propTypes.bool.isRequired,
  onDismiss: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
};

export default FiltersDialog;
