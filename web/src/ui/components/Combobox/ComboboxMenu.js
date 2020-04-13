import React from 'react';
import { useCombobox } from './Combobox';

export function ComboboxMenu({ items, itemToKey, RenderComboboxItem }) {
  const {
    isOpen,
    getItemProps,
    itemToString,
    inputValue,
    getMenuProps,
  } = useCombobox();

  function renderItems() {
    const filtered = items.filter(
      item => !inputValue || itemToString(item).includes(inputValue),
    );

    if (filtered.length === 0) {
      return (
        <div className="text-center italic text-gray-700">Sin resultados</div>
      );
    }

    return filtered.map((item, index) => (
      <RenderComboboxItem
        item={item}
        data-ui-combobox-item
        {...getItemProps({ index, item })}
        key={itemToKey ? itemToKey(item, index) : index}
      />
    ));
  }

  return (
    <ul {...getMenuProps()} data-ui-combobox-menu>
      {isOpen ? <div className="py-2">{renderItems()}</div> : null}
    </ul>
  );
}

function ComboboxItem({ item, ...restProps }) {
  return <li {...restProps}>{item}</li>;
}

ComboboxMenu.defaultProps = {
  RenderComboboxItem: ComboboxItem,
};
