import React from 'react';
import propTypes from 'prop-types';
import Dialog, { CloseBtn, Title, KIND } from 'ui/components/Dialog';

function FiltersDialog({ isOpen, onDismiss, children }) {
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={onDismiss}
      aria-labelledby="filter-search-title"
      kind={KIND.full}
    >
      <div className="relative w-full max-w-sm mx-auto">
        <CloseBtn onClick={onDismiss}>Cerrar filtros</CloseBtn>
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
