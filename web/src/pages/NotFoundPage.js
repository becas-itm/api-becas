import React from 'react';
import { SiteTemplate } from 'ui/templates/SiteTemplate';
import NotFoundGhost from 'ui/components/NotFoundGhost';
import { LinkButton } from 'ui/components/LinkButton';

export default function NotFoundPage() {
  return (
    <SiteTemplate>
      <NotFoundGhost title="404" description="No pudimos encontrar la página">
        <LinkButton to="/">Regresa al inicio</LinkButton>
      </NotFoundGhost>
    </SiteTemplate>
  );
}
