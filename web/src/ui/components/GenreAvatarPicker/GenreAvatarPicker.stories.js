import React from 'react';

import GenreAvatarPicker from './GenreAvatarPicker';
import { GENRE } from '../GenreAvatar/GenreAvatar';

export default {
  title: 'Genre Avatar Picker',
  component: GenreAvatarPicker,
  decorators: [
    storyFn => (
      <div className="h-screen flex items-center justify-center p-4">
        {storyFn()}
      </div>
    ),
  ],
};

export const normal = () => <GenreAvatarPicker onGenre={console.log} />;

export const withDefault = () => (
  <GenreAvatarPicker genre={GENRE.female} onGenre={console.log} />
);
