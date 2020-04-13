import React from 'react';

const PopoverContext = React.createContext();

function PopoverProvider({ children }) {
  const [referenceElement, setReferenceElement] = React.useState(null);

  return (
    <PopoverContext.Provider value={{ referenceElement, setReferenceElement }}>
      {children}
    </PopoverContext.Provider>
  );
}

function usePopover() {
  return React.useContext(PopoverContext);
}

export { usePopover };

export default PopoverProvider;
