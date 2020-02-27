import React from 'react';
import { render } from '@testing-library/react';
import { Avatar } from '../index';
import fixtureImg from './fixture.png';

const FULL_LSTUB_FILENAME = 'http://localhost/fixture.png';

test('should render component', () => {
  const { container } = render(<Avatar src={fixtureImg} />);
  const avatar = container.querySelector('.Avatar');
  expect(avatar).toBeInTheDocument();
});

describe('src prop', () => {
  it('should render a given image', () => {
    const { getByAltText } = render(
      <Avatar src={fixtureImg} alt="avatar-img" />,
    );
    const image = getByAltText('avatar-img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(FULL_LSTUB_FILENAME);
  });
});

describe('size prop', () => {
  it('should have the given size', () => {
    const size = 48;
    const { container } = render(<Avatar src={fixtureImg} />);
    const avatar = container.querySelector('.Avatar');
    expect(avatar).toHaveStyle(`width: ${size}`);
    expect(avatar).toHaveStyle(`height: ${size}`);
  });
});
