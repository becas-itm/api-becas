import React from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { useToggle } from 'utils/hooks';
import { OpenInNew } from 'ui/components/Icon';
import { Button, KIND } from 'ui/components/Button';

export function IcetexDialogDetails({ id }) {
  const [detailsOpened, toggleDetails] = useToggle();
  const okButtonRef = React.useRef();

  return (
    <>
      <div className="flex justify-center mt-2">
        <Button onClick={toggleDetails} kind={KIND.tertiary}>
          Ver detalles
        </Button>
      </div>
      <DialogOverlay
        isOpen={detailsOpened}
        onClick={toggleDetails}
        onDismiss={toggleDetails}
        className="fixed inset-0 overflow-auto p-4"
        style={{ background: 'hsla(0, 0%, 0%, .5)' }}
        initialFocusRef={okButtonRef}
      >
        <DialogContent
          aria-labelledby="scholarship-instructions"
          className="pt-6 pb-3 mx-auto max-w-md rounded bg-white"
          style={{
            marginTop: '15vh',
            boxShadow:
              '0 12px 17px 2px rgba(0, 0, 0, .14), 0 5px 22px 4px rgba(0, 0, 0, .12), 0 7px 8px -4px rgba(0, 0, 0, .2)',
          }}
        >
          <h3
            id="scholarship-instructions"
            className="text-xl px-6 pb-3 text-base font-semibold"
          >
            Detalle de convocatoria
          </h3>
          <p className="px-6 pb-3 text-sm">
            Realiza los siguientes pasos para obtener más información acerca de
            la convocatoria:
          </p>
          <ol className="list-decimal list-inside px-8 mb-1 text-sm text-gray-700">
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
          <div className="flex justify-end px-6">
            <Button
              onClick={toggleDetails}
              ref={okButtonRef}
              kind={KIND.tertiary}
            >
              Listo
            </Button>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  );
}
