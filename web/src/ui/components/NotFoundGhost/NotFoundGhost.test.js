import React from 'react';
import { render } from '@testing-library/react';
import { NotFoundGhost } from './index';

test('should render component', () => {
  const title = 'foo';
  const { getByText } = render(<NotFoundGhost title={title} />);
  expect(getByText('foo')).toBeInTheDocument();
});

test('should render description when passed ', () => {
  const description = 'foo';
  const { getByText } = render(
    <NotFoundGhost description={description} title="bar" />,
  );
  expect(getByText('foo')).toBeInTheDocument();
});

test('should render action when passed ', () => {
  const action = 'foo';
  const { getByText } = render(
    <NotFoundGhost action={action} description="bar" title="buz" />,
  );
  expect(getByText('foo')).toBeInTheDocument();
});
