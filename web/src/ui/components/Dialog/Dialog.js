import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { DialogOverlay, DialogContent } from '@reach/dialog';

const noop = () => {};

export const KIND = {
  normal: 'normal',
  full: 'full',
};

function overlayStyles(kind) {
  switch (kind) {
    case KIND.normal:
      return 'p-4';
    default:
      return '';
  }
}

function contentStyles(kind, { className }) {
  return classNames(
    kind === KIND.full && 'w-full h-full m-0 rounded-none',
    className,
  );
}

const Dialog = React.forwardRef(function Dialog(
  { isOpen, onDismiss, initialFocusRef, kind = KIND.normal, ...restProps },
  forwardedRef,
) {
  return (
    <DialogOverlay
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onDismiss={onDismiss}
      className={overlayStyles(kind)}
    >
      <DialogContent
        ref={forwardedRef}
        {...restProps}
        className={contentStyles(kind, restProps)}
      />
    </DialogOverlay>
  );
});

Dialog.defaultProps = {
  isOpen: false,
  onDismiss: noop,
  kind: KIND.normal,
};

Dialog.propTypes = {
  isOpen: propTypes.bool,
  onDismiss: propTypes.func,
  kind: propTypes.oneOf(Object.values(KIND)),
};

export default Dialog;
