import React from 'react';
import propTypes from 'prop-types';
import ghostShocked from './ghostShocked.svg';
import './NotFoundGhost.scss';

export function NotFoundGhost({ title, description, action = null }) {
  return (
    <div className="NotFoundGhost">
      <img src={ghostShocked} alt="" />
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      {action && <div className="NotFoundGhost__action">{action}</div>}
    </div>
  );
}

NotFoundGhost.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string,
  action: propTypes.node,
};
