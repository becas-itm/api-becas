import React from 'react';
import { usePopper } from 'react-popper';
import { usePopover } from './PopoverProvider';

const popperOptions = {
  placement: 'bottom-start',
  modifiers: [
    {
      name: 'offset',
      options: { offset: [0, 4] },
    },
  ],
};

export function ComboboxPopover({ children }) {
  const [popperElement, setPopperElement] = React.useState(null);
  const { referenceElement } = usePopover();

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    popperOptions,
  );

  return (
    <div
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
      data-ui-combobox-popper
    >
      {children}
    </div>
  );
}
