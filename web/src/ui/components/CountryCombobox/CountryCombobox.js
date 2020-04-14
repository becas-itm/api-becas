import React from 'react';
import Combobox from 'ui/components/Combobox';

function CountryCombobox(props) {
  return <Combobox {...props} />;
}

CountryCombobox.defaultProps = {
  itemToString: country => country?.name || '',
};

export default CountryCombobox;
