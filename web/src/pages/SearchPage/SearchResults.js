import React from 'react';
import NotFoundGhost from 'ui/components/NotFoundGhost';

import ScholarshipPreview from './ScholarshipPreview';
import PaginationControls from './PaginationControls';

export default function SearchResults({ results, onPage }) {
  const { results: scholarships, ...pagination } = results;

  if (scholarships.length === 0) {
    return (
      <NotFoundGhost
        title="Sin resultados de búsqueda"
        description="Prueba usando un término más general"
      />
    );
  }

  return (
    <div className="max-w-screen-md mx-auto mt-4">
      <h2 className="text-base text-gray-700 mb-4 px-4">
        <span>Resultados de búsqueda</span>
        <span> — Página {pagination.currentPage}</span>
      </h2>
      {scholarships.map(scholarship => (
        <ScholarshipPreview {...scholarship} key={scholarship.id} />
      ))}
      <PaginationControls {...pagination} onPrev={onPage} onNext={onPage} />
    </div>
  );
}
