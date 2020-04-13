import React from 'react';
import Downshift from 'downshift';
import PopoverProvider from './PopoverProvider';

const ComboboxContext = React.createContext();

function Combobox({ children, ...restProps }) {
  return (
    <Downshift {...restProps}>
      {downshift => (
        <div className="relative">
          <ComboboxContext.Provider value={downshift}>
            <PopoverProvider>{children}</PopoverProvider>
          </ComboboxContext.Provider>
        </div>
      )}
    </Downshift>
  );
}

function useCombobox() {
  return React.useContext(ComboboxContext);
}

export { useCombobox };

export default Combobox;
