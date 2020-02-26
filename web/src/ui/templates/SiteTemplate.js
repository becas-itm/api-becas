import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SiteHeader } from 'ui/components/SiteHeader';
import { ThreeRowTemplate } from 'ui/templates/ThreeRowTemplate';

export function SiteTemplate(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = term => {
    if (location.pathname !== '/buscar') {
      navigate(`/buscar?q=${term}`, { state: { isSearching: true } });
    }
  };

  return (
    <ThreeRowTemplate
      {...props}
      header={
        <SiteHeader
          onSearch={handleSearch}
          isInitiallySearching={location.state?.isSearching}
        />
      }
    />
  );
}
