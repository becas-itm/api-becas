import React from 'react';
import propTypes from 'prop-types';

import Pill, { COLOR } from 'ui/components/Pill';
import LinkButton from 'ui/components/LinkButton';
import { formatDeadline } from 'utils/scholarship';
import EntityAvatar from 'ui/components/EntityAvatar';

function PillStatus({ status }) {
  if (status === 'COMPLETE') {
    return <Pill color={COLOR.green}>Completa</Pill>;
  }

  if (status === 'INCOMPLETE') {
    return <Pill color={COLOR.yellow}>Incompleta</Pill>;
  }

  return <Pill color={COLOR.gray}>Desconocido</Pill>;
}

export function ScholarshipPreview({ id, name, deadline, entity, fillStatus }) {
  return (
    <article className="bg-white border-t border-b md:rounded md:border mb-5">
      <div className="relative max-w-md mx-auto mt-4 mb-2 sm:mt-8 sm:mb-4 px-4 sm:px-0">
        <EntityAvatar
          name={entity.name}
          size={54}
          className="shadow-xs hidden md:block md:mr-8 absolute top-0 right-full mr-4"
        />
        <header>
          <div className="max-w-md mx-auto text-gray-700 mb-1">
            {entity.fullName}
          </div>
          {deadline && <div>{formatDeadline(deadline)}</div>}
          <h1 className="text-xl font-semibold mt-1">{name}</h1>
        </header>
        <footer className="flex items-center justify-between mt-1">
          <PillStatus status={fillStatus} />
          <LinkButton to={`/admin/pendientes/${id}`}>VER</LinkButton>
        </footer>
      </div>
    </article>
  );
}

ScholarshipPreview.propTypes = {
  id: propTypes.string.isRequired,
  deadline: propTypes.string,
  name: propTypes.string.isRequired,
  fillStatus: propTypes.string.isRequired,
  entity: propTypes.shape({
    name: propTypes.string.isRequired,
    fullName: propTypes.string.isRequired,
  }),
};
