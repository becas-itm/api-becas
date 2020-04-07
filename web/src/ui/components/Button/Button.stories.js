import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import Button, { COLOR } from './index';

export default {
  title: 'Button',
  component: Button,
  decorators: [
    withKnobs,
    storyFn => (
      <div className="h-screen flex items-center justify-center p-4">
        {storyFn()}
      </div>
    ),
  ],
};

export const Primary = () => <Button>{text('Label', 'Primary')}</Button>;

export const PrimaryOutline = () => (
  <Button outline>{text('Label', 'Primary Outline')}</Button>
);

export const Secondary = () => (
  <Button color={COLOR.secondary}>{text('Label', 'Secondary')}</Button>
);

export const Danger = () => (
  <Button color={COLOR.danger}>{text('Label', 'Danger')}</Button>
);

export const DangerOutline = () => (
  <Button color={COLOR.danger} outline>
    {text('Label', 'Danger Outline')}
  </Button>
);

export const Wide = () => <Button wide>{text('Label', 'Wide Button')}</Button>;

export const Disabled = () => (
  <Button disabled outline={boolean('Outline')} color={select('Color', COLOR)}>
    {text('Label', 'Button')}
  </Button>
);

export const Loading = () => (
  <Button isLoading outline={boolean('Outline')} color={select('Color', COLOR)}>
    {text('Label', 'Button')}
  </Button>
);

export const CompleteExample = () => (
  <Button
    isLoading={boolean('Loading')}
    outline={boolean('Outline')}
    wide={boolean('Wide')}
    disabled={boolean('Disabled')}
    color={select('Color', COLOR)}
  >
    {text('Label', 'Button')}
  </Button>
);
