import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import AppLogo from './index';

export default {
  title: 'AppLogo',
  component: AppLogo,
  decorators: [
    withKnobs,
    storyFn => (
      <div className="h-screen flex items-center justify-center p-4">
        {storyFn()}
      </div>
    ),
  ],
};

export const normal = () => <AppLogo />;

export const simple = () => <AppLogo children={null} />;

export const customTitle = () => <AppLogo>{text('Title', 'Title')}</AppLogo>;
