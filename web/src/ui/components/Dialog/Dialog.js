import React from 'react';
import propTypes from 'prop-types';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { Close } from 'ui/components/Icon';
import { IconButton, SHAPE } from 'ui/components/IconButton';

import './Dialog.scss';

export const SIZE = {
  regular: '-sizeRegular',
  full: '-sizeFull',
};

export function Dialog({
  isOpen,
  onDismiss,
  renderClose,
  size,
  children,
  className,
  ...restProps
}) {
  return (
    <DialogOverlay
      isOpen={isOpen}
      onClick={onDismiss}
      onDismiss={onDismiss}
      className={`Dialog__overlay ${size}`}
      data-testid="dialog-overlay"
    >
      <DialogContent
        data-testid="dialog-content"
        {...restProps}
        className={`Dialog__content ${className || ''}`}
      >
        {renderClose && (
          <IconButton
            onClick={onDismiss}
            icon={Close}
            shape={SHAPE.square}
            className="Dialog__close"
            data-testid="dialog-close"
          >
            Cerrar ventana de díalogo
          </IconButton>
        )}
        {children}
      </DialogContent>
    </DialogOverlay>
  );
}

Dialog.defaultProps = {
  isOpen: false,
  renderClose: true,
  size: SIZE.regular,
};

Dialog.propTypes = {
  isOpen: propTypes.bool,
  onDismiss: propTypes.func,
  size: propTypes.oneOf(Object.values(SIZE)),
  children: propTypes.node,
  renderClose: propTypes.bool,
  className: propTypes.string,
};
