import React from 'react';
import { render } from '@testing-library/react';
import { IconButton, SHAPE } from './index';

const TestIcon = ({ regular, ...restProps }) => (
  <div data-testid="icon" {...restProps} />
);

describe('IconButton component', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(
      <IconButton data-testid="icon-button" icon={TestIcon}>
        Foo
      </IconButton>,
    );
    const iconButton = getByTestId('icon-button');
    expect(iconButton).toBeInTheDocument();
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('should have a `button` type by default', () => {
    const { getByTestId } = render(
      <IconButton data-testid="icon-button" icon={TestIcon}>
        Foo
      </IconButton>,
    );
    expect(getByTestId('icon-button')).toHaveProperty('type', 'button');
  });

  it('text children should be visually hidden', () => {
    const { getByText } = render(<IconButton icon={TestIcon}>Foo</IconButton>);
    expect(getByText('Foo')).toHaveClass('sr-only');
  });

  describe('button shape', () => {
    it('should be rounded by default', () => {
      const { getByTestId } = render(
        <IconButton data-testid="icon-button" icon={TestIcon}>
          Foo
        </IconButton>,
      );
      expect(getByTestId('icon-button')).toHaveClass(SHAPE.rounded);
    });

    test('square shape', () => {
      const { getByTestId } = render(
        <IconButton
          shape={SHAPE.square}
          data-testid="icon-button"
          icon={TestIcon}
        >
          Foo
        </IconButton>,
      );
      expect(getByTestId('icon-button')).toHaveClass(SHAPE.square);
    });

    test('simple shape', () => {
      const { getByTestId } = render(
        <IconButton
          shape={SHAPE.simple}
          data-testid="icon-button"
          icon={TestIcon}
        >
          Foo
        </IconButton>,
      );
      expect(getByTestId('icon-button')).toHaveClass(SHAPE.simple);
    });
  });
});
