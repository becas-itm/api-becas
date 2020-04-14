import React from 'react';
import propTypes from 'prop-types';
import Dialog, { CloseBtn, Title } from 'ui/components/Dialog';

function FiltersDialog({ isOpen, onDismiss, children }) {
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={onDismiss}
      aria-labelledby="filter-search-title"
      className="w-full max-w-sm p-8"
    >
      <div className="relative w-full max-w-sm mx-auto">
        <CloseBtn onClick={onDismiss} className="right-0 top-0">
          Cerrar filtros
        </CloseBtn>
        <Title id="filter-search-title" className="mb-6">
          Filtrar búsqueda
        </Title>
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
