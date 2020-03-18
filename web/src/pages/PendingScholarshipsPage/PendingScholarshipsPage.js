import React from 'react';
import Spinner from 'ui/components/Spinner';
import AdminTemplate from 'ui/templates/AdminTemplate';
import { PendingResults } from './PendingResults';

function PendingScholarshipsPage() {
  return (
    <AdminTemplate>
      <div className="max-w-2xl mx-auto">
        <React.Suspense
          fallback={
            <div className="text-center mt-4">
              <Spinner />
            </div>
          }
        >
          <PendingResults />
        </React.Suspense>
      </div>
    </AdminTemplate>
  );
}

export default PendingScholarshipsPage;
