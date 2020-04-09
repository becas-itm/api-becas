import React from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';
import LoginCard from './LoginCard';

export default {
  title: 'LoginCard',
  component: LoginCard,
  decorators: [
    storyFn => (
      <BrowserRouter>
        <div className="h-screen flex items-center justify-center p-4">
          {storyFn()}
        </div>
      </BrowserRouter>
    ),
  ],
};

export const initial = () => <LoginCard onSubmit={action('onSubmit')} />;

export const loading = () => (
  <LoginCard isLoading onSubmit={action('onSubmit')} />
);
