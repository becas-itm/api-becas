import React from 'react';
import propTypes from 'prop-types';
import Avatar, { SIZE } from 'ui/components/Avatar';

import maleUrl from './img/male.png';
import femaleUrl from './img/female.png';
import anonymousUrl from './img/anonymous.svg';

export { SIZE };

export const GENDER = Object.freeze({
  male: 'male',
  female: 'female',
  anonymous: 'anonymous',
});

export function getGenders() {
  return Object.values(GENDER);
}

export function getAvatarUrl(gender) {
  switch (gender) {
    case GENDER.male:
      return maleUrl;

    case GENDER.female:
      return femaleUrl;

    case GENDER.anonymous:
    default:
      return anonymousUrl;
  }
}

export default function GenderAvatar({ gender, ...restProps }) {
  return <Avatar {...restProps} src={getAvatarUrl(gender)} />;
}

GenderAvatar.defaultProps = {
  gender: GENDER.anonymous,
  'data-testid': 'GenderAvatar',
};

GenderAvatar.propTypes = {
  gender: propTypes.oneOf(Object.values(GENDER)),
};
