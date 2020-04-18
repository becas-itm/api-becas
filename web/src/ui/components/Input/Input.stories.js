import React from 'react';
import { Close, Search } from 'ui/components/Icon';
import Input from './index';

export default {
  title: 'Input',
  component: Input,
  decorators: [
    storyFn => (
      <div className="h-screen flex items-center justify-center p-4">
        {storyFn()}
      </div>
    ),
  ],
};

export const base = () => <Input placeholder="Placeholder" />;

export const withEndIcon = () => (
  <Input endIcon={<Close />} defaultValue="I'm looking for..." />
);

export const customEndIcon = () => (
  <Input
    endIcon={
      <div className="text-medium">
        <Search />
      </div>
    }
    placeholder="Search"
  />
);

export const stretch = () => <Input wide={false} placeholder="Placeholder" />;
