import React from 'react';
import { render } from '@testing-library/react';

import Icon from './index';
import * as icons from './icons';

const Content = () => <div data-testid="icon-content" />;

const TestIcon = props => (
  <Icon data-testid="Icon" {...props}>
    <Content />
  </Icon>
);

describe('Icon component', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<TestIcon />);
    expect(getByTestId('icon-content')).toBeInTheDocument();
  });

  describe('icon title', () => {
    it('null title should have aria-hidden attribute', () => {
      const { getByTestId } = render(<TestIcon />);
      expect(getByTestId('Icon')).toHaveAttribute('aria-hidden', 'true');
    });

    it('role attribute should be `img`', () => {
      const title = 'foo';
      const { getByTestId } = render(<TestIcon title={title} />);
      const icon = getByTestId('Icon');
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
