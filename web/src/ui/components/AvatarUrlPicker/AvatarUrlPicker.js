// Inspired from: https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/radio-1.html

import React, { useRef } from 'react';
import { useMount } from 'react-use';

import RadioGroup from './RadioGroup';
import './AvatarUrlPicker.css';

function AvatarRadio({ url, alt }) {
  return (
    <div
      value={url}
      tabIndex={-1}
      role="radio"
      aria-checked={false}
      className="AvatarUrlPicker__radio rounded-full border-4 border-gray-300 bg-white focus:outline-none cursor-pointer"
    >
      <img
        src={url}
        alt={alt}
        className="w-12 h-12 object-cover rounded-full"
      />
    </div>
  );
}

export default function AvatarUrlPicker({ url, onUrl }) {
  const ref = useRef(null);

  useMount(() => {
    new RadioGroup(ref.current, onUrl).init(url);
  });

  return (
    <div ref={ref} role="radiogroup" aria-label="Selecciona un avatar">
      <div className="flex flex-wrap">
        <AvatarRadio
          url="http://localhost:3000/img/avatars/female.png"
          alt="Mujer"
        />
        <AvatarRadio
          url="http://localhost:3000/img/avatars/male.png"
          alt="Hombre"
        />
      </div>
    </div>
  );
}
