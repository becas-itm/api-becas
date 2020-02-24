import React from 'react';
import { render } from '@testing-library/react';

import { IconButton, SHAPE, SIZE } from './index';

const TestIcon = props => <div data-testid="icon" {...props} />;

describe('IconButton component', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(
      <IconButton data-testid="icon-button" icon={TestIcon}>
        Foo
      </IconButton>,
    );
    const iconButton = getByTestId('icon-button');

    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toHaveClass('IconButton');

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
    expect(getByText('Foo')).toHaveStyle(`
        width: 1px;
        height: 1px;
        clip: rect(0 0 0 0);
        position: absolute;
      `);
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

  describe('button size', () => {
    it('should be regular by default', () => {
      const { getByTestId } = render(
        <IconButton data-testid="icon-button" icon={TestIcon}>
          Foo
        </IconButton>,
      );
      expect(getByTestId('icon-button')).toHaveClass(SIZE.regular);
    });

    test('compact size', () => {
      const { getByTestId } = render(
        <IconButton
          size={SIZE.compact}
          data-testid="icon-button"
          icon={TestIcon}
        >
          Foo
        </IconButton>,
      );
      expect(getByTestId('icon-button')).toHaveClass(SIZE.compact);
    });
  });
});
