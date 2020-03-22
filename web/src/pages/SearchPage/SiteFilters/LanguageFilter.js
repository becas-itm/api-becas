import React from 'react';
import CountryFlag from 'ui/components/CountryFlag';
import { Listbox, ListboxOption } from 'ui/components/Listbox';

export default function LanguageFilter({ value, onChange }) {
  return (
    <Listbox
      value={value}
      onChange={onChange}
      aria-labelledby="filter-language"
      className="w-full"
    >
      <ListboxOption value="*">Cualquiera</ListboxOption>
      <ListboxOption value="es">
        <CountryFlag code="ESP" className="mr-2" />
        <span>Español</span>
      </ListboxOption>
      <ListboxOption value="en">
        <CountryFlag code="USA" className="mr-2" />
        <span>Inglés</span>
      </ListboxOption>
    </Listbox>
  );
}
