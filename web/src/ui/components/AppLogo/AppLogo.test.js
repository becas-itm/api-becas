import React from 'react';
import { render } from '@testing-library/react';
import AppLogo from './index';

test('renders correctly', () => {
  const { getByTestId } = render(<AppLogo />);
  expect(getByTestId('AppLogo')).toBeInTheDocument();
});

test('logo title should be rendered', () => {
  const title = 'foo';
  const { getByTestId } = render(<AppLogo>{title}</AppLogo>);
  expect(getByTestId('AppLogo')).toHaveTextContent(title);
});

test('default logo title', () => {
  const DEFAULT_TITLE = 'Becas';
  const { getByTestId } = render(<AppLogo />);
  expect(getByTestId('AppLogo')).toHaveTextContent(DEFAULT_TITLE);
});
