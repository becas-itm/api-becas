import React from 'react';
import Spinner from 'ui/components/Spinner';
import { useSearchPage } from 'utils/hooks/search';
import AdminTemplate from 'ui/templates/AdminTemplate';
import { PendingResults } from './PendingResults';

const DEFAULT_FILTERS = { page: 1 };

function PendingScholarshipsPage() {
  const url = '/api/publishing/scholarships/';
  const { search, filter } = useSearchPage(url, DEFAULT_FILTERS);
  const { results, ...pagination } = search.results;

  return (
    <AdminTemplate>
      <div className="max-w-2xl mx-auto">
        {search.isLoading ? (
          <div className="text-center mt-4">
            <Spinner />
          </div>
        ) : (
          <PendingResults
            scholarships={results}
            pagination={pagination}
            onPage={filter.setPage}
          />
        )}
      </div>
    </AdminTemplate>
  );
}

export default PendingScholarshipsPage;
