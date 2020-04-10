import React from 'react';
import propTypes from 'prop-types';
import Avatar, { SIZE } from 'ui/components/Avatar';

import maleUrl from './img/male.png';
import femaleUrl from './img/female.png';
import anonymousUrl from './img/anonymous.svg';

export { SIZE };

export const GENRE = Object.freeze({
  male: 'male',
  female: 'female',
  anonymous: 'anonymous',
});

export function getGenres() {
  return Object.values(GENRE);
}

export function getAvatarUrl(genre) {
  switch (genre) {
    case GENRE.male:
      return maleUrl;

    case GENRE.female:
      return femaleUrl;

    case GENRE.anonymous:
    default:
      return anonymousUrl;
  }
}

export default function GenreAvatar({ genre, ...restProps }) {
  return <Avatar {...restProps} src={getAvatarUrl(genre)} />;
}

GenreAvatar.defaultProps = {
  genre: GENRE.anonymous,
  'data-testid': 'GenreAvatar',
};

GenreAvatar.propTypes = {
  genre: propTypes.oneOf(Object.values(GENRE)),
};
