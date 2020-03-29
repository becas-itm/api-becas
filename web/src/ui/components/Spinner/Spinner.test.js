import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './index';

describe('Spinner component', () => {
  test('renders correctly', () => {
    const { queryByTestId } = render(<Spinner />);
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('Spinner');
  });

  test('`className` prop is merged', () => {
    const CLASS_NAME = 'test';
    const { getByTestId } = render(<Spinner className={CLASS_NAME} />);
    const spinner = getByTestId('spinner');
    expect(spinner).toHaveClass(CLASS_NAME);
  });

  describe('Spinner size', () => {
    it('should be `28px` by default', () => {
      const { getByTestId } = render(<Spinner />);
      const spinner = getByTestId('spinner');
      expect(spinner).toHaveStyle({ width: '28px', height: '28px' });
    });

    it('should accept a prop `size`', () => {
      const SIZE = 40;
      const { getByTestId } = render(<Spinner size={SIZE} />);
      const spinner = getByTestId('spinner');
      expect(spinner).toHaveStyle({ width: `${SIZE}px`, height: `${SIZE}px` });
    });

    test('styles should be merged', () => {
      const STYLES = { border: '1px solid' };
      const { getByTestId } = render(<Spinner style={STYLES} />);
      const spinner = getByTestId('spinner');
      expect(spinner).toHaveStyle(STYLES);
    });
  });

  describe('Spinner color', () => {
    it('should have a `primary` color by default', () => {
      const { getByTestId } = render(<Spinner />);
      const spinner = getByTestId('spinner');
      expect(spinner).toHaveClass('-colorPrimary');
    });

    it('should inherits the color', () => {
      const { getByTestId } = render(<Spinner colorAuto />);
      const spinner = getByTestId('spinner');
      expect(spinner).toHaveClass('-colorAuto');
    });
  });

  test('rest props should be passed', () => {
    const PROPS = {
      title: 'Loading',
      'data-testid': 'spinner-test',
    };
    const { getByTestId } = render(<Spinner {...PROPS} />);
    const spinner = getByTestId(PROPS['data-testid']);
    expect(spinner).toHaveProperty('title', PROPS.title);
  });
});
