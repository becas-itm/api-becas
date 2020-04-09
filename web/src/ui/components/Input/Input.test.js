import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './index';

test('renders correctly', () => {
  const { queryByTestId } = render(<Input />);
  expect(queryByTestId('Input')).toBeInTheDocument();
});

test('type prop is `input` by default', () => {
  const { getByTestId } = render(<Input className="test" />);
  expect(getByTestId('Input')).toHaveAttribute('type', 'input');
});

test('className prop is merged', () => {
  const { container } = render(<Input className="test" />);
  const input = container.firstChild;
  expect(input.className).not.toBe('test');
  expect(input).toHaveClass('test');
});

describe('endIcon prop', () => {
  it('should render icon', () => {
    const endIcon = <div data-testid="icon" />;
    const { queryByTestId } = render(<Input endIcon={endIcon} />);
    expect(queryByTestId('icon')).toBeInTheDocument();
  });
});

test('onFocus prop is passed', () => {
  const focusSpy = jest.fn();
  const { getByTestId } = render(<Input onFocus={focusSpy} />);
  const input = getByTestId('Input');
  fireEvent.focus(input);
  expect(focusSpy).toHaveBeenCalledTimes(1);
});

test('onBlur prop is passed', () => {
  const blurSpy = jest.fn();
  const { getByTestId } = render(<Input onBlur={blurSpy} />);
  const input = getByTestId('Input');
  fireEvent.blur(input);
  expect(blurSpy).toHaveBeenCalledTimes(1);
});

test('ref is forwarded to input element', () => {
  const ref = React.createRef(null);
  const { container } = render(<Input ref={ref} />);
  const input = container.querySelector('input');
  expect(ref.current).toBe(input);
});
