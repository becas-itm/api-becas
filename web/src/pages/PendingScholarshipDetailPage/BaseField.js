import React from 'react';
import propTypes from 'prop-types';
import { Warning } from 'ui/components/Icon';

const MissingIcon = props => (
  <Warning {...props} style={{ color: '#FAC809' }} />
);

export function BaseField({ icon: Icon, name, children, isMissing }) {
  if (isMissing) {
    Icon = MissingIcon;
  }

  return (
    <div className="flex">
      {Icon && <Icon className="text-gray-500 mr-2" />}
      <div>
        {name && <div className="text-sm text-gray-600">{name}</div>}
        {isMissing ? <span className="italic">Desconocido</span> : children}
      </div>
    </div>
  );
}

BaseField.defaultProps = { isMissing: false };

BaseField.propTypes = {
  icon: propTypes.elementType,
  name: propTypes.string,
  children: propTypes.node,
  isMissing: propTypes.bool,
};
