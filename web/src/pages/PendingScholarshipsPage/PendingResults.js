import React from 'react';
import useSWR from 'swr';

import Pagination from 'ui/components/Pagination';
import { query_params } from 'pages/SearchPage/useQueryParamsFilters';

import { ScholarshipPreview } from './ScholarshipPreview';

const fetcher = url => fetch(url).then(res => res.json());

export function PendingResults() {
  const [page, setPage] = React.useState(1);
  const { data } = useSWR(
    `/api/publishing/scholarships/${query_params({ page })}`,
    fetcher,
    {
      suspense: true,
      initialData: { results: [] },
    },
  );
  const { results: scholarships, ...pagination } = data;

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
          onPage={setPage}
        />
      </div>
    </div>
  );
}
