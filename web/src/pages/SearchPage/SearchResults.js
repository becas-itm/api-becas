import React from 'react';
import Button from 'ui/components/Button';
import Pagination from 'ui/components/Pagination';
import NotFoundGhost from 'ui/components/NotFoundGhost';
import { SettingsBackupRestore } from 'ui/components/Icon';

import ScholarshipPreview from './ScholarshipPreview';

export default function SearchResults({ results, onPage, onResetFilters }) {
  const { results: scholarships, ...pagination } = results;

  if (scholarships.length === 0) {
    return (
      <NotFoundGhost
        title="Sin resultados de búsqueda"
        description="Prueba usando un término más general, o bien"
      >
        <Button onClick={onResetFilters} outline type="reset" form="filters">
          Restablece los filtros <SettingsBackupRestore className="ml-2" />
        </Button>
      </NotFoundGhost>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-base text-gray-700 mb-4 px-4">
        <span>Resultados de búsqueda</span>
        <span> — Página {pagination.currentPage}</span>
      </h2>
      {scholarships.map(scholarship => (
        <ScholarshipPreview {...scholarship} key={scholarship.id} />
      ))}
      <div className="max-w-lg mx-auto mt-4 px-4 md:px-0">
        <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPage={onPage}
        />
      </div>
    </div>
  );
}
