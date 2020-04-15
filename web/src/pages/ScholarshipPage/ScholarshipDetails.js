import React from 'react';
import Button from 'ui/components/Button';
import { OpenInNew } from 'ui/components/Icon';
import { IcetexDialogDetails } from './IcetexDialogDetails';

export function ScholarshipDetails({ entityName, id, url }) {
  if (entityName === 'icetex') {
    return <IcetexDialogDetails id={id} url={url} />;
  }

  return (
    <div className="flex justify-center mt-2">
      <Button
        renderAs={'a'}
        outline
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver detalles
        <OpenInNew auto className="inline-block ml-2 w-5 h-5" />
      </Button>
    </div>
  );
}
