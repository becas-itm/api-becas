import React from 'react';
import propTypes from 'prop-types';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import Spinner from 'ui/components/Spinner';
import CountryFlag from 'ui/components/CountryFlag';
import { KeyboardArrowDown } from 'ui/components/Icon';

import useCountryMatch from './useCountryMatch';

function CountryCombobox({
  onSelect,
  htmlFor,
  defaultCountry,
  isLoading,
  countries,
  ...restProps
}) {
  const [country, setCountry] = React.useState(defaultCountry);
  React.useEffect(() => {
    setCountry(defaultCountry);
  }, [defaultCountry, setCountry]);

  const results = useCountryMatch(country, countries);

  const handleChange = event => setCountry(event.target.value);

  const handleSelect = item => {
    setCountry(item);
    onSelect && onSelect(item);
  };

  return (
    <Combobox openOnFocus onSelect={handleSelect}>
      <div className="relative">
        <ComboboxInput
          {...restProps}
          value={country}
          onChange={handleChange}
          disabled={isLoading}
          aria-labelledby={htmlFor}
          placeholder={isLoading ? 'Cargando...' : 'Todos'}
          className="w-full h-10 pl-3 pr-12 outline-none rounded border border-transparent bg-gray-300 focus:bg-white focus:border-gray-300 duration-100 ease-in-out appearance-none cursor-pointer placeholder-gray-800"
        />
        <div className="absolute right-0 mr-3 inset-y-0 flex items-center pointer-events-none">
          {isLoading ? (
            <Spinner size={20} />
          ) : (
            <KeyboardArrowDown className="text-gray-600" />
          )}
        </div>
      </div>
      {results && (
        <ComboboxPopover
          className="rounded py-2 border-none w-full"
          style={{
            boxShadow:
              '0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24)',
          }}
        >
          {results.length > 0 ? (
            <ComboboxList aria-labelledby={htmlFor} className="px-2">
              {results.slice(0, 7).map(country => (
                <ComboboxOption
                  key={country.code}
                  value={country.name}
                  className="rounded py-2 text-base duration-100 ease-in-out"
                >
                  <CountryFlag code={country.code} className="mr-1" />{' '}
                  {country.name}
                </ComboboxOption>
              ))}
            </ComboboxList>
          ) : (
            <span className="block m-2 italic text-center">No encontrado</span>
          )}
        </ComboboxPopover>
      )}
    </Combobox>
  );
}

CountryCombobox.propTypes = {
  onSelect: propTypes.func,
  defaultCountry: propTypes.string,
  htmlFor: propTypes.string,
  isLoading: propTypes.bool,
  countries: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      code: propTypes.string.isRequired,
    }),
  ),
};

CountryCombobox.defaultProps = {
  isLoading: false,
  defaultCountry: '',
  countries: [],
};

export default CountryCombobox;
