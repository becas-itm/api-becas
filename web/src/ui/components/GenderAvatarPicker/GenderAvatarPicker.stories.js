import React from 'react';
import { GENDER } from 'ui/components/GenderAvatar';

import GenderAvatarPicker from './GenderAvatarPicker';

export default {
  title: 'Gender Avatar Picker',
  component: GenderAvatarPicker,
  decorators: [
    storyFn => (
      <div className="h-screen flex items-center justify-center p-4">
        {storyFn()}
      </div>
    ),
  ],
};

export const normal = () => <GenderAvatarPicker onGender={console.log} />;

export const withDefault = () => (
  <GenderAvatarPicker gender={GENDER.female} onGender={console.log} />
);
