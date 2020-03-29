import React from 'react';
import { render as baseRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LinkButton from './index';

const render = children => baseRender(<BrowserRouter children={children} />);

describe('Link Button', () => {
  it('should render a button', () => {
    const { queryByTestId } = render(<LinkButton to="#">foo</LinkButton>);
    const button = queryByTestId('link-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('foo');
  });

  it('should render an `a` element', () => {
    const { getByTestId } = render(<LinkButton to="#" />);
    expect(getByTestId('link-button').tagName.toLowerCase()).toBe('a');
  });
});
