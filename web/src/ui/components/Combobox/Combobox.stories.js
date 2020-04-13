import React from 'react';
import Button from 'ui/components/Button';

import Combobox, {
  ComboboxMenu,
  ComboboxInput,
  ComboboxLabel,
  ComboboxPopover,
} from './index';
import CountryFlag from '../CountryFlag';

export default {
  title: 'Combobox',
  component: Combobox,
  decorators: [
    storyFn => (
      <div className="h-screen flex items-center justify-center p-4">
        {storyFn()}
      </div>
    ),
  ],
};

const FRUITS = ['apple', 'pear', 'orange', 'grape', 'banana'];

export const Uncontrolled = () => {
  const [data, setData] = React.useState(null);
  const handleSubmit = event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = Object.fromEntries(Array.from(form.entries()));
    setData(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Combobox>
        <ComboboxInput name="fruit" placeholder="Uncontrolled" />
        <ComboboxPopover>
          <ComboboxMenu items={FRUITS} />
        </ComboboxPopover>
      </Combobox>
      <div className="my-3">
        <Button type="submit">Submit</Button>
      </div>
      <pre className="p-4 rounded bg-gray-200">
        {JSON.stringify(data, null, 2)}
      </pre>
    </form>
  );
};

export const Controlled = () => {
  const [fruit, setFruit] = React.useState(null);
  return (
    <Combobox
      selectedItem={fruit}
      onChange={value =>
        setFruit(() => {
          console.log(value);
          return value;
        })
      }
    >
      <ComboboxLabel className="block mb-2">Fruit: {fruit}</ComboboxLabel>
      <ComboboxInput placeholder="Controlled" />
      <ComboboxPopover>
        <ComboboxMenu items={FRUITS} />
      </ComboboxPopover>
    </Combobox>
  );
};

export const Advanced = () => {
  const COUNTRIES = [
    { code: 'COL', name: 'Colombia' },
    { code: 'ARG', name: 'Argentina' },
  ];
  const [country, setCountry] = React.useState(null);
  const handleChange = selection => setCountry(selection);
  return (
    <Combobox
      selectedItem={country}
      onChange={handleChange}
      itemToString={item => item?.name || ''}
    >
      <ComboboxInput placeholder="Search a country" />
      <ComboboxPopover>
        <ComboboxMenu
          items={COUNTRIES}
          itemToKey={item => item.code}
          RenderComboboxItem={({ item, ...restProps }) => (
            <li {...restProps}>
              <CountryFlag code={item.code} />
              <span className="ml-2">{item.name}</span>
            </li>
          )}
        />
      </ComboboxPopover>
      <pre className="p-4 rounded bg-gray-200 mt-3">
        {JSON.stringify(country, null, 2)}
      </pre>
    </Combobox>
  );
};
