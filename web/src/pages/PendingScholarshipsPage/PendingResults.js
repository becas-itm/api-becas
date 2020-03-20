import React from 'react';
import Pagination from 'ui/components/Pagination';
import { ScholarshipPreview } from './ScholarshipPreview';

export function PendingResults({ scholarships, pagination, onPage }) {
  if (scholarships.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="h-10 flex items-center px-4 border-b bg-white sm:mt-4 lg:mt-8 sm:bg-transparent sm:border-none">
        <h1 className="text-base sm:text-2xl">Convocatorias pendientes</h1>
      </div>

      <h2 className="text-base text-gray-700 my-4 px-4">
        <span>Resultados de búsqueda</span>
        <span> — Página {pagination.currentPage}</span>
      </h2>

      {scholarships.map(scholarship => (
        <ScholarshipPreview {...scholarship} key={scholarship.id} />
      ))}

      <div className="max-w-lg mx-auto my-4 px-4 md:px-0">
        <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPage={onPage}
        />
      </div>
    </div>
  );
}
