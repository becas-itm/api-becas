import React from 'react';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import Avatar, { SIZE } from './index';

const RANDOM_IMAGE_URL = 'https://source.unsplash.com/128x128';

export default {
  title: 'Avatar',
  component: Avatar,
  decorators: [
    withKnobs,
    storyFn => (
      <div className="h-screen flex items-center justify-center p-4">
        {storyFn()}
      </div>
    ),
  ],
};

export const sizes = () =>
  Object.values(SIZE).map(size => (
    <Avatar size={size} src={RANDOM_IMAGE_URL} key={size} />
  ));

export const customSize = () => (
  <Avatar size={number('Size', 200)} src={RANDOM_IMAGE_URL} />
);

export const customImage = () => (
  <Avatar src={text('Source', RANDOM_IMAGE_URL)} size={SIZE.extraLarge} />
);
