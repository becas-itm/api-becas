import React from 'react';
import useFetch from 'use-http';
import { format } from 'date-fns';
import locale from 'date-fns/locale/es';
import { useParams } from 'react-router';

import Spinner from 'ui/components/Spinner';
import CountryFlag from 'ui/components/CountryFlag';
import EntityAvatar from 'ui/components/EntityAvatar';
import { LinkButton } from 'ui/components/LinkButton';
import NotFoundGhost from 'ui/components/NotFoundGhost';
import { SiteTemplate } from 'ui/templates/SiteTemplate';
import { Event, School, Money } from 'ui/components/Icon';

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
        </div>
      </main>
    </SiteTemplate>
  );
}

export default ScholarshipPage;
