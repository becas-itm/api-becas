import React from 'react';
import Spinner from 'ui/components/Spinner';
import SiteHeader from 'ui/components/SiteHeader';
import { SiteTemplate } from 'ui/templates/SiteTemplate';

import useSearch from './useSearch';
import SearchResults from './SearchResults';

function SearchPage() {
  const { results, term, setTerm, setPage, isLoading } = useSearch();

  return (
    <SiteTemplate
      header={
        <SiteHeader
          initialTerm={term}
          onSearch={setTerm}
          isInitiallySearching={false}
        />
      }
    >
      <div className="h-full flex-1 mb-6">
        {isLoading ? (
          <div className="text-center mt-8">
            <Spinner />
          </div>
        ) : (
          <SearchResults onPage={setPage} results={results} />
        )}
      </div>
    </SiteTemplate>
  );
}

export default SearchPage;
