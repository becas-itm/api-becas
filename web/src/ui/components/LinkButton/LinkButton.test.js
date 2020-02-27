import React from 'react';
import { KIND } from 'ui/components/Button';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LinkButton } from './index';

describe('Link Button', () => {
  it('should render a button', () => {
    const { container } = render(
      <BrowserRouter>
        <LinkButton to="#">foo</LinkButton>
      </BrowserRouter>,
    );
    expect(container.querySelector('.Button')).toBeInTheDocument();
  });

  it('should render an `a` element', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LinkButton to="#">foo</LinkButton>
      </BrowserRouter>,
    );
    expect(getByText('foo').tagName).toBe('A');
  });

  test('type should be `tertiary` by default', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LinkButton kind={KIND.tertiary} to="#">
          foo
        </LinkButton>
      </BrowserRouter>,
    );
    expect(getByText('foo')).toHaveClass(KIND.tertiary);
  });
});
