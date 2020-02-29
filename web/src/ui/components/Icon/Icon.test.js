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

  // describe('icon size', () => {
  //   const REGULAR_SIZE = 'w-6 h-6';

  //   it('should be square', () => {
  //     const { getByTestId } = render(<TestIcon />);
  //     expect(getByTestId('Icon')).toHaveClass(REGULAR_SIZE);
  //   });

  //   it('size auto should fill the available space', () => {
  //     const { getByTestId } = render(<TestIcon auto />);
  //     expect(getByTestId('Icon')).not.toHaveClass(REGULAR_SIZE);
  //   });

  //   it('size can be small', () => {
  //     const { getByTestId } = render(<TestIcon small />);
  //     expect(getByTestId('Icon')).toHaveClass('w-5 h-5');
  //   });
  // });

  // describe('icon title', () => {
  //   it('null title should have aria-hidden attribute', () => {
  //     const { getByTestId } = render(<TestIcon />);
  //     expect(getByTestId('Icon')).toHaveAttribute('aria-hidden', 'true');
  //   });

  //   it('role attribute should be `img`', () => {
  //     const title = 'foo';
  //     const { getByTestId } = render(<TestIcon title={title} />);
  //     const icon = getByTestId('Icon');
  //     expect(icon).toHaveAttribute('role', 'img');
  //     expect(icon).not.toHaveAttribute('aria-hidden');
  //   });

  //   it('should render a title element', () => {
  //     const title = 'foo';
  //     const { getByTitle } = render(<TestIcon title={title} />);
  //     expect(getByTitle(title)).toHaveTextContent(title);
  //   });
  // });

  // describe('all icons', () => {
  //   test.each(Object.entries(icons))(
  //     '%s icon renders correctly',
  //     (icon, IconComp) => {
  //       const { getByTestId } = render(<IconComp data-testid={icon} />);
  //       expect(getByTestId(icon)).toMatchSnapshot();
  //     },
  //   );
  // });
});
