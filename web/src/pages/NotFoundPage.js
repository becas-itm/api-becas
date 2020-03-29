import React from 'react';
import LinkButton from 'ui/components/LinkButton';
import { SiteTemplate } from 'ui/templates/SiteTemplate';
import NotFoundGhost from 'ui/components/NotFoundGhost';

export default function NotFoundPage() {
  return (
    <SiteTemplate>
      <NotFoundGhost title="404" description="No pudimos encontrar la página">
        <LinkButton to="/">Regresa al inicio</LinkButton>
      </NotFoundGhost>
    </SiteTemplate>
  );
}
