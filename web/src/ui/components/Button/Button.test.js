import React from 'react';
import { render } from '@testing-library/react';

import Button, { COLOR } from './index';

describe('Button component', () => {
  test('renders correctly', () => {
    const { queryByTestId } = render(<Button>foo</Button>);
    const button = queryByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('Button');
    expect(button).toHaveTextContent('foo');
  });

  test('button type should be `button` by default', () => {
    const { getByTestId } = render(<Button />);
    expect(getByTestId('button')).toHaveProperty('type', 'button');
  });

  describe('Button colors', () => {
    test('color `primary`', () => {
      const { getByTestId } = render(<Button color={COLOR.primary} />);
      expect(getByTestId('button')).toHaveClass(COLOR.primary);
    });

    test('it should have `primary` color by default', () => {
      const { getByTestId } = render(<Button />);
      expect(getByTestId('button')).toHaveClass(COLOR.primary);
    });

    test('color `secondary`', () => {
      const { getByTestId } = render(<Button color={COLOR.secondary} />);
      expect(getByTestId('button')).toHaveClass(COLOR.secondary);
    });

    test('color `danger`', () => {
      const { getByTestId } = render(<Button color={COLOR.danger} />);
      expect(getByTestId('button')).toHaveClass(COLOR.danger);
    });
  });

  test('wide button', () => {
    const { getByTestId } = render(<Button wide />);
    expect(getByTestId('button')).toHaveClass('-wide');
  });

  describe('Disable button', () => {
    it('should have a `disabled` HTML attribute', () => {
      const { getByTestId } = render(<Button disabled />);
      expect(getByTestId('button')).toHaveProperty('disabled', true);
    });

    it('should have a disabled CSS class', () => {
      const { getByTestId } = render(<Button disabled />);
      expect(getByTestId('button')).toHaveClass('-disabled');
    });
  });

  describe('Loading state', () => {
    it('should be a disabled button', () => {
      const { getByTestId } = render(<Button isLoading />);
      expect(getByTestId('button')).toHaveProperty('disabled', true);
    });

    it('should have a loading indicator', () => {
      const { getByTestId } = render(<Button isLoading />);
      expect(getByTestId('button-indicator')).toBeInTheDocument();
    });
  });

  describe('Outline button', () => {
    test('Danger color', () => {
      const { getByTestId } = render(<Button outline color={COLOR.danger} />);
      expect(getByTestId('button')).toHaveClass(COLOR.danger, '-outline');
    });

    test('Primary color', () => {
      const { getByTestId } = render(<Button outline color={COLOR.primary} />);
      expect(getByTestId('button')).toHaveClass(COLOR.primary, '-outline');
    });
  });

  test('renderAs overrides `button` element', () => {
    const TAG = 'a';
    const { getByTestId } = render(<Button renderAs={TAG} />);
    expect(getByTestId('button').tagName.toLowerCase()).toBe(TAG);
  });
});
