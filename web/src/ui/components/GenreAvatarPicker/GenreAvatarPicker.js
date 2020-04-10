// Inspired from: https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/radio-1.html

import React, { useRef } from 'react';
import { useMount } from 'react-use';

import GenreAvatar, { getGenres, SIZE } from 'ui/components/GenreAvatar';

import RadioGroup from './RadioGroup';
import './GenreAvatarPicker.scss';

function AvatarRadio({ genre, alt }) {
  return (
    <div
      value={genre}
      tabIndex={-1}
      role="radio"
      aria-checked={false}
      className="GenreAvatarPicker__radio rounded-full border-4 border-gray-300 bg-white focus:outline-none cursor-pointer"
    >
      <GenreAvatar genre={genre} size={SIZE.regular} />
    </div>
  );
}

export default function GenreAvatarPicker({ genre, onGenre }) {
  const ref = useRef(null);

  useMount(() => {
    new RadioGroup(ref.current, onGenre).init(genre);
  });

  return (
    <div ref={ref} role="radiogroup" aria-label="Selecciona un avatar">
      <div className="flex flex-wrap">
        {getGenres().map(genre => (
          <AvatarRadio key={genre} genre={genre} />
        ))}
      </div>
    </div>
  );
}
