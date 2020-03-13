import React from 'react';

import CountryFlag from 'ui/components/CountryFlag';

import {
  ListboxOption,
  ListboxButton,
  ListboxList,
  ListboxInput,
  ListboxPopover,
} from 'ui/components/Listbox';

export default function LanguageFilter({ value: initialValue }) {
  const [value, setValue] = React.useState(initialValue || '*');

  React.useEffect(() => void setValue(initialValue), [initialValue]);

  return (
    <>
      <label
        id="filter-language"
        className="text-sm font-semibold color-gray-500 uppercase pb-1"
      >
        Idioma
      </label>
      <div className="flex flex-wrap mb-4">
        <ListboxInput
          value={value}
          onChange={setValue}
          name="language"
          aria-labelledby="filter-language"
          className="relative w-full"
        >
          <ListboxButton className="w-full" />
          <ListboxPopover className="w-full">
            <ListboxList>
              <ListboxOption value="*">Cualquiera</ListboxOption>
              <ListboxOption value="es">
                <CountryFlag code="ESP" className="mr-2" />
                <span>Español</span>
              </ListboxOption>
              <ListboxOption value="en">
                <CountryFlag code="USA" className="mr-2" />
                <span>Inglés</span>
              </ListboxOption>
            </ListboxList>
          </ListboxPopover>
        </ListboxInput>
      </div>
    </>
  );
}
