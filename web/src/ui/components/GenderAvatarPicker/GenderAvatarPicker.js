// Inspired from: https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/radio-1.html

import React, { useRef } from 'react';
import { useMount } from 'react-use';

import GenderAvatar, { getGenders, SIZE } from 'ui/components/GenderAvatar';

import RadioGroup from './RadioGroup';
import './GenderAvatarPicker.scss';

function AvatarRadio({ gender }) {
  return (
    <div
      value={gender}
      tabIndex={-1}
      role="radio"
      aria-checked={false}
      className="GenderAvatarPicker__radio rounded-full border-4 border-gray-300 bg-white focus:outline-none cursor-pointer"
    >
      <GenderAvatar gender={gender} size={SIZE.regular} />
    </div>
  );
}

export default function GenderAvatarPicker({ gender, onGender }) {
  const ref = useRef(null);

  useMount(() => {
    new RadioGroup(ref.current, onGender).init(gender);
  });

  return (
    <div ref={ref} role="radiogroup" aria-label="Selecciona un avatar">
      <div className="flex flex-wrap">
        {getGenders().map(gender => (
          <AvatarRadio key={gender} gender={gender} />
        ))}
      </div>
    </div>
  );
}
