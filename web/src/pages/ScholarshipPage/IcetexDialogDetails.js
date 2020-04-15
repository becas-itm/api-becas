import React from 'react';

import { useToggle } from 'utils/hooks';
import Button from 'ui/components/Button';
import { OpenInNew } from 'ui/components/Icon';
import Dialog, { Title, Actions } from 'ui/components/Dialog';

export function IcetexDialogDetails({ id }) {
  const [detailsOpened, toggleDetails] = useToggle();
  const okButtonRef = React.useRef();

  return (
    <>
      <div className="flex justify-center mt-2">
        <Button onClick={toggleDetails} outline>
          Ver pasos
        </Button>
      </div>
      <Dialog
        isOpen={detailsOpened}
        onDismiss={toggleDetails}
        initialFocusRef={okButtonRef}
        aria-labelledby="scholarship-instructions"
        className="w-full max-w-md"
      >
        <Title id="scholarship-instructions">Detalle de convocatoria</Title>
        <p className="pb-2 text-sm">
          Realiza los siguientes pasos para obtener más información acerca de la
          convocatoria:
        </p>
        <ol className="list-decimal list-inside px-2 text-sm text-gray-700">
          <li>
            Ingresa el portal de becas del{' '}
            <a
              className="hover:underline focus:underline text-primary"
              href="https://portal.icetex.gov.co/Portal/Home/HomeEstudiante/becas/becas-para-estudios-en-el-exterior/becas-vigentes"
              target="_blank"
              rel="noopener noreferrer"
            >
              ICETEX
              <OpenInNew auto className="inline-block ml-1 w-3 h-3" />
            </a>
          </li>
          <li>
            Selecciona la opción{' '}
            <span className="italic">Número de Convocatoria</span>
          </li>
          <li>
            Ingresa el siguiente número:{' '}
            <span className="font-semibold">{id}</span>
          </li>
          <li>
            Presiona en <span className="italic">Buscar</span>
          </li>
        </ol>
        <Actions className="mt-0">
          <Button outline ref={okButtonRef} onClick={toggleDetails}>
            Listo
          </Button>
        </Actions>
      </Dialog>
    </>
  );
}
