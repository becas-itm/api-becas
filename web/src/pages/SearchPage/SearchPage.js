import React from 'react';

import Spinner from 'ui/components/Spinner';
import SiteHeader from 'ui/components/SiteHeader';
import { SiteTemplate } from 'ui/templates/SiteTemplate';

import useSearch from './useSearch';
import SearchResults from './SearchResults';
import SiteFilters from './SiteFilters/SiteFilters';
import FiltersDialog from './SiteFilters/FiltersDialog';

function SearchPage() {
  const { results, term, setTerm, setPage, isLoading, filter } = useSearch();

  const searchFilters = (
    <SiteFilters
      initialValues={filter.values}
      onSubmit={filter.onSubmit}
      onReset={filter.onReset}
    />
  );

  return (
    <SiteTemplate
      header={
        <SiteHeader
          initialTerm={term}
          onSearch={setTerm}
          isInitiallySearching={false}
          onFilterClick={filter.toggleFilters}
        />
      }
    >
      <div className="h-full flex-1 mb-6">
        <div className="container mx-auto flex mt-4 xl:px-8">
          <aside className="hidden lg:block lg:mx-4 xl:mx-0 self-start w-64">
            <h2 className="mb-5 text-base text-gray-700">Filtrar búsqueda</h2>
            {searchFilters}
          </aside>
          <div className="flex-1 max-w-screen-md mx-auto">
            {isLoading ? (
              <div className="text-center mt-4">
                <Spinner />
              </div>
            ) : (
              <SearchResults
                onPage={setPage}
                results={results}
                onResetFilters={filter.onReset}
              />
            )}
          </div>
        </div>
        <FiltersDialog
          isOpen={filter.isFiltering}
          onDismiss={filter.toggleFilters}
        >
          {searchFilters}
        </FiltersDialog>
      </div>
    </SiteTemplate>
  );
}

export default SearchPage;
