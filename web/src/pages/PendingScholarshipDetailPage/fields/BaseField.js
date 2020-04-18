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
      {Icon && <Icon className="text-disabled mr-2" />}
      <div className="w-full">
        {name && <div className="text-sm text-medium">{name}</div>}
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
