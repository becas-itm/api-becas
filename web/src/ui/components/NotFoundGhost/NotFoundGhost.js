import React from 'react';
import propTypes from 'prop-types';
import ghostShocked from './ghostShocked.svg';

function NotFoundGhost({ title, description, children: action }) {
  return (
    <div className="flex flex-col items-center">
      <img src={ghostShocked} alt="" className="max-w-sm" />
      <h1 className="mt-2 text-xl font-semibold text-black">{title}</h1>
      {description && <p className="mt-2 text-gray-700">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

NotFoundGhost.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string,
  children: propTypes.node,
};

export default NotFoundGhost;
