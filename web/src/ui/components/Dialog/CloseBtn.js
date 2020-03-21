import React from 'react';
import { Close } from 'ui/components/Icon';
import { IconButton, SHAPE } from 'ui/components/IconButton';

export function CloseBtn(props) {
  return (
    <IconButton
      icon={Close}
      shape={SHAPE.square}
      data-reach-dialog-close=""
      {...props}
    />
  );
}

CloseBtn.defaultProps = { children: 'Cerrar ventana de diálogo' };
