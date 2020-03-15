import React from 'react';
import useFetch from 'use-http';
import { format } from 'date-fns';
import locale from 'date-fns/locale/es';
import { useParams } from 'react-router';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { useToggle } from 'utils/hooks';
import Spinner from 'ui/components/Spinner';
import CountryFlag from 'ui/components/CountryFlag';
import { Button, KIND } from 'ui/components/Button';
import EntityAvatar from 'ui/components/EntityAvatar';
import { LinkButton } from 'ui/components/LinkButton';
import NotFoundGhost from 'ui/components/NotFoundGhost';
import { SiteTemplate } from 'ui/templates/SiteTemplate';
import { Event, School, Money, OpenInNew } from 'ui/components/Icon';

function formatDeadline(date) {
  const FORMAT = `d 'de' MMMM 'de' yyyy`;
  return format(new Date(date), FORMAT, { locale });
}

function getFundingType(type) {
  switch (type) {
    case 'COMPLETE':
      return 'Completo';

    case 'PARTIAL':
      return 'Parcial';

    default:
      return 'No disponible';
  }
}

function getAcademicLevel(level) {
  switch (level) {
    case 'UNDERGRADUATE':
      return 'Pregrado';

    case 'POSTGRADUATE':
      return 'Posgrado';

    default:
      return 'Otros';
  }
}

function IcetexDialogDetails({ id }) {
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

function ScholarshipDetails({ spider, id, url }) {
  if (spider === 'icetex') {
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

function ScholarshipPage() {
  const { id } = useParams();
  const {
    data,
    loading,
    response,
  } = useFetch(`/api/search/scholarships/${id}/`, [id]);

  if (loading) {
    return (
      <SiteTemplate>
        <div className="text-center mt-8">
          <Spinner />
        </div>
      </SiteTemplate>
    );
  }

  if (!response.ok) {
    return (
      <SiteTemplate className="pt-6">
        <NotFoundGhost
          title="¡Oops!"
          description="No pudimos encontrar la beca"
        >
          <LinkButton to="/buscar">Ir a página de búsqueda</LinkButton>
        </NotFoundGhost>
      </SiteTemplate>
    );
  }

  return (
    <SiteTemplate>
      <main
        className="max-w-screen-md mx-auto p-4 bg-white rounded sm:py-10 md:py-16 my-8"
        style={{
          boxShadow:
            '0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24)',
        }}
      >
        <div className="max-w-xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-semibold mb-2">
            {data.name}
          </h1>
          <div className="text-sm text-gray-600">Descripción</div>
          <p className="text-base">{data.description}</p>

          <div className="pl-8 mt-6">
            {data.deadline && (
              <div className="flex">
                <Event className="text-gray-500 mr-2" />
                <div>
                  <div className="text-sm text-gray-600">Abierta hasta</div>
                  <div>{formatDeadline(data.deadline)}</div>
                </div>
              </div>
            )}

            <div className="flex mt-4">
              <School className="text-gray-500 mr-2" />
              <div>
                <div className="text-sm text-gray-600">Tipo de Beca</div>
                <div>{getAcademicLevel(data.academicLevel)}</div>
              </div>
            </div>

            <div className="flex mt-4">
              <Money className="text-gray-500 mr-2" />
              <div>
                <div className="text-sm text-gray-600">Financiamiento</div>
                <div>{getFundingType(data.fundingType)}</div>
              </div>
            </div>

            <div className="flex mt-4">
              <CountryFlag
                code={data.country.code}
                style={{ width: 24, height: 24 }}
                className="shadow-xs rounded-full mr-2 object-cover"
              />
              <div>
                <div className="text-sm text-gray-600">País</div>
                <div>{data.country.name}</div>
              </div>
            </div>

            <div className="flex mt-4 -ml-8">
              <div className="text-gray-500 mr-4">
                <EntityAvatar
                  spiderName={data.spider.name}
                  size={48}
                  className="shadow-xs"
                />
              </div>
              <div>
                <div className="text-sm text-gray-600">Publicada por</div>
                <div>{data.entity.fullName}</div>
              </div>
            </div>
          </div>

          <ScholarshipDetails
            {...data.sourceDetails}
            spider={data.spider.name}
          />
        </div>
      </main>
    </SiteTemplate>
  );
}

export default ScholarshipPage;
