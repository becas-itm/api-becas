import React from 'react';
import Spinner from 'ui/components/Spinner';
import AdminTemplate from 'ui/templates/AdminTemplate';

import { PendingResults } from './PendingResults';
import { usePendingScholarships } from './usePendingScholarships';

function PendingScholarshipsPage() {
  const [page, setPage] = React.useState(1);
  const { scholarships, pagination, isFetching } = usePendingScholarships(page);

  return (
    <AdminTemplate>
      <div className="max-w-2xl mx-auto">
        {isFetching ? (
          <div className="text-center mt-4">
            <Spinner />
          </div>
        ) : (
          <PendingResults
            scholarships={scholarships}
            pagination={pagination}
            onPage={setPage}
          />
        )}
      </div>
    </AdminTemplate>
  );
}

export default PendingScholarshipsPage;
