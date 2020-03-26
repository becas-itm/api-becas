import React from 'react';
import { OpenInNew } from 'ui/components/Icon';
import { Button, KIND } from 'ui/components/Button';
import { IcetexDialogDetails } from './IcetexDialogDetails';

export function ScholarshipDetails({ entityName, id, url }) {
  if (entityName === 'icetex') {
    return <IcetexDialogDetails id={id} url={url} />;
  }

  return (
    <div className="flex justify-center mt-2">
      <Button
        renderAs={'a'}
        kind={KIND.tertiary}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        Ver detalles
        <OpenInNew auto className="inline-block ml-1 w-3 h-3" />
      </Button>
    </div>
  );
}
