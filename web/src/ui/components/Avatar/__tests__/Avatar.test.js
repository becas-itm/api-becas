import React from 'react';
import { render } from '@testing-library/react';
import Avatar from '../index';
import fixtureImg from './fixture.png';

const STUB_FILENAME = 'http://localhost/fixture.png';

test('should render component', () => {
  const { getByTestId } = render(<Avatar src={fixtureImg} />);
  expect(getByTestId('Avatar')).toBeInTheDocument();
});

describe('src prop', () => {
  it('should render a given image', () => {
    const { getByAltText } = render(
      <Avatar src={fixtureImg} alt="avatar-img" />,
    );
    const image = getByAltText('avatar-img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(STUB_FILENAME);
  });
});

describe('size prop', () => {
  it('should have the given size', () => {
    const size = 48;
    const { getByTestId } = render(<Avatar size={size} src={fixtureImg} />);
    const avatar = getByTestId('Avatar');
    expect(avatar).toHaveStyle(`width: ${size}px`);
    expect(avatar).toHaveStyle(`height: ${size}px`);
  });
});
