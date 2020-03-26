import React from 'react';
import { format } from 'date-fns';
import propTypes from 'prop-types';
import locale from 'date-fns/locale/es';

import { LinkButton } from 'ui/components/LinkButton';
import EntityAvatar from 'ui/components/EntityAvatar';
import { Event, ArrowForward } from 'ui/components/Icon';

import './ScholarshipPreview.css';

function formatDeadline(date) {
  const FORMAT = `d 'de' MMMM 'de' yyyy`;
  return format(new Date(date), FORMAT, { locale });
}

export default function ScholarshipPreview({
  id,
  name,
  description,
  deadline,
  entity,
}) {
  return (
    <article className="bg-white border-t border-b sm:rounded sm:border mb-5">
      <div className="relative max-w-md mx-auto my-4 sm:my-10 px-4 sm:px-0">
        <EntityAvatar
          name={entity.name}
          size={60}
          className="shadow-xs hidden sm:block absolute top-0 right-full mr-4 md:mr-8"
        />
        <header>
          {deadline && (
            <>
              <Event className="mr-2 text-gray-500" />
              <span>{formatDeadline(deadline)}</span>
            </>
          )}
          <h1 className="text-xl font-semibold mt-1">{name}</h1>
        </header>
        <p className="mt-1">{description}</p>

        <LinkButton
          to={`/convocatoria/${id}`}
          className="ScholarshipPreview__linkBtn mt-4"
        >
          Ver convocatoria{' '}
          <ArrowForward className="ScholarshipPreview__linkBtnIcon ml-2" />
        </LinkButton>
      </div>
      <footer className="px-4 sm:rounded-b bg-gray-200">
        <div className="max-w-md mx-auto py-3 bg-gray-200">
          {entity.fullName}
        </div>
      </footer>
    </article>
  );
}

ScholarshipPreview.propTypes = {
  id: propTypes.string.isRequired,
  deadline: propTypes.string,
  name: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  entity: propTypes.shape({
    name: propTypes.string.isRequired,
    fullName: propTypes.string.isRequired,
  }),
};
