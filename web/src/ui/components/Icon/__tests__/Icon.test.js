import React from 'react';
import { render } from '@testing-library/react';

import * as icons from '../icons';
import { Icon, SIZE } from '../index';

const Content = () => <div data-testid="icon-content" />;

const TestIcon = props => (
  <Icon data-testid="icon" {...props}>
    <Content />
  </Icon>
);

describe('Icon component', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<TestIcon />);
    expect(getByTestId('icon-content')).toBeInTheDocument();
  });

  describe('icon size', () => {
    it('should be square', () => {
      const { getByTestId } = render(<TestIcon />);
      expect(getByTestId('icon')).toHaveClass('-sizeRegular');
    });

    it('size auto should fill the available space', () => {
      const sizeAuto = SIZE.auto;
      const { getByTestId } = render(<TestIcon size={sizeAuto} />);
      expect(getByTestId('icon')).toHaveClass('-sizeAuto');
    });

    it('size can be small', () => {
      const sizeSmall = SIZE.small;
      const { getByTestId } = render(<TestIcon size={sizeSmall} />);
      expect(getByTestId('icon')).toHaveClass('-sizeSmall');
    });
  });

  describe('icon title', () => {
    it('null title should have aria-hidden attribute', () => {
      const { getByTestId } = render(<TestIcon />);
      expect(getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
    });

    it('role attribute should be `img`', () => {
      const title = 'foo';
      const { getByTestId } = render(<TestIcon title={title} />);
      const icon = getByTestId('icon');

      expect(icon).toHaveAttribute('role', 'img');
      expect(icon).not.toHaveAttribute('aria-hidden');
    });

    it('should render a title element', () => {
      const title = 'foo';
      const { getByTitle } = render(<TestIcon title={title} />);
      expect(getByTitle(title)).toHaveTextContent(title);
    });
  });

  describe('all icons', () => {
    test.each(Object.entries(icons))(
      '%s icon renders correctly',
      (icon, IconComp) => {
        const { getByTestId } = render(<IconComp data-testid={icon} />);
        expect(getByTestId(icon)).toMatchSnapshot();
      },
    );
  });
});
