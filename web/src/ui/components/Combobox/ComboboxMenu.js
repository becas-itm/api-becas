import React from 'react';
import { useCombobox } from './Combobox';

export function ComboboxMenu({ items, itemToKey, filter, RenderComboboxItem }) {
  const {
    isOpen,
    getItemProps,
    itemToString,
    inputValue,
    getMenuProps,
  } = useCombobox();

  function renderItems() {
    const filtered = filter
      ? items.filter(
          item => !inputValue || itemToString(item).includes(inputValue),
        )
      : items;

    if (filtered.length === 0) {
      return (
        <div className="text-center italic text-medium">Sin resultados</div>
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
  filter: true,
  RenderComboboxItem: ComboboxItem,
};
