import React from 'react';
import { render } from '@testing-library/react';
import AppLogo from './index';

it('should renders', () => {
  const { container } = render(<AppLogo />);
  expect(container).toBeInTheDocument();
});

describe('logo title', () => {
  const titleId = 'AppLogo__title';

  it('should have a title', () => {
    const { queryByTestId } = render(<AppLogo />);
    expect(queryByTestId(titleId)).toBeInTheDocument();
  });

  it('should be `Becas` by default', () => {
    const title = 'Becas';
    const { getByTestId } = render(<AppLogo />);
    expect(getByTestId(titleId)).toHaveTextContent(title);
  });

  it('should change when children is passed', () => {
    const title = 'Test';
    const { getByTestId } = render(<AppLogo>{title}</AppLogo>);
    expect(getByTestId(titleId)).toHaveTextContent(title);
  });
});

describe('logo image', () => {
  it('should render an image', () => {
    const { queryByTestId } = render(<AppLogo />);
    const image = queryByTestId('AppLogo__image');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
  });
});
