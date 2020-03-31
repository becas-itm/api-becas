import React from 'react';
import { render } from '@testing-library/react';
import Avatar, { SIZE } from '../index';
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
  it('regular size is 48px', () => {
    const { getByTestId } = render(
      <Avatar size={SIZE.regular} src={fixtureImg} />,
    );
    const avatar = getByTestId('Avatar');
    expect(avatar).toHaveStyle(`width: 48px`);
    expect(avatar).toHaveStyle(`height: 48px`);
  });

  it('large size is 96px', () => {
    const { getByTestId } = render(
      <Avatar size={SIZE.large} src={fixtureImg} />,
    );
    const avatar = getByTestId('Avatar');
    expect(avatar).toHaveStyle(`width: 96px`);
    expect(avatar).toHaveStyle(`height: 96px`);
  });

  it('extraLarge size is 128px', () => {
    const { getByTestId } = render(
      <Avatar size={SIZE.extraLarge} src={fixtureImg} />,
    );
    const avatar = getByTestId('Avatar');
    expect(avatar).toHaveStyle(`width: 128px`);
    expect(avatar).toHaveStyle(`height: 128px`);
  });

  it('default size should be regular', () => {
    const { getByTestId } = render(<Avatar src={fixtureImg} />);
    const avatar = getByTestId('Avatar');
    expect(avatar).toHaveStyle(`width: ${SIZE.regular}px`);
    expect(avatar).toHaveStyle(`height: ${SIZE.regular}px`);
  });
});
