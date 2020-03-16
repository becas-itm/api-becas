import React from 'react';
import { render } from '@testing-library/react';

import { Button, KIND } from './index';

describe('Button component', () => {
  test('renders correctly', () => {
    const { container } = render(<Button>foo</Button>);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Button');
  });

  test('button type should be `button` by default', () => {
    const { getByText } = render(<Button>foo</Button>);
    expect(getByText('foo')).toHaveProperty('type', 'button');
  });

  describe('Button kind', () => {
    test('type `primary`', () => {
      const { getByText } = render(<Button kind={KIND.primary}>foo</Button>);
      expect(getByText('foo')).toHaveClass(KIND.primary);
    });

    test('type `secondary`', () => {
      const { getByText } = render(<Button kind={KIND.secondary}>foo</Button>);
      expect(getByText('foo')).toHaveClass(KIND.secondary);
    });

    test('type `tertiary`', () => {
      const { getByText } = render(<Button kind={KIND.tertiary}>foo</Button>);
      expect(getByText('foo')).toHaveClass(KIND.tertiary);
    });

    test('type `danger`', () => {
      const { getByText } = render(<Button kind={KIND.danger}>foo</Button>);
      expect(getByText('foo')).toHaveClass(KIND.danger);
    });

    test('type `danger tertiary`', () => {
      const { getByText } = render(
        <Button kind={KIND.dangerTertiary}>foo</Button>,
      );
      expect(getByText('foo')).toHaveClass(KIND.dangerTertiary);
    });

    it('should be `primary` by default', () => {
      const { getByText } = render(<Button>foo</Button>);
      expect(getByText('foo')).toHaveClass(KIND.primary);
    });
  });

  test('wide button', () => {
    const { getByText } = render(<Button wide>foo</Button>);
    expect(getByText('foo')).toHaveClass('-wide');
  });

  test('Disabled button', () => {
    const { getByText } = render(<Button disabled>foo</Button>);
    expect(getByText('foo')).toHaveProperty('disabled', true);
  });

  test('renderAs overrides button element', () => {
    const { container } = render(<Button renderAs="a">foo</Button>);
    expect(container.querySelector('a')).toBeInTheDocument();
  });
});
