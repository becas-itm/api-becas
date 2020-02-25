import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Dialog, SIZE } from './index';

// Disable styles checking. This skips a console warning message.
// See https://reacttraining.com/reach-ui/styling/
jest.mock('@reach/utils', () => ({
  ...jest.requireActual('@reach/utils'),
  checkStyles: jest.fn(),
}));

describe('Dialog component', () => {
  describe('Visibility', () => {
    test('prop isOpen=true should render the dialog', () => {
      const { queryByTestId } = render(<Dialog isOpen aria-label="_" />);
      expect(queryByTestId('dialog-overlay')).not.toBeNull();
    });

    test('prop isOpen=false should not render the dialog', () => {
      const { queryByTestId } = render(
        <Dialog isOpen={false} aria-label="_" />,
      );
      expect(queryByTestId('dialog-overlay')).toBeNull();
    });

    test('prop isOpen should be false by default', () => {
      const { queryByTestId } = render(<Dialog aria-label="_" />);
      expect(queryByTestId('dialog-overlay')).toBeNull();
    });
  });

  describe('Content', () => {
    it('should render children as content', () => {
      const { getByText, queryByTestId } = render(
        <Dialog isOpen aria-label="_">
          foo
        </Dialog>,
      );
      expect(getByText('foo')).toBeInTheDocument();
      expect(queryByTestId('dialog-content')).not.toBeNull();
    });
  });

  describe('Close button', () => {
    test('prop renderClose=true should render the button', () => {
      const { queryByTestId } = render(
        <Dialog renderClose isOpen aria-label="_" />,
      );
      expect(queryByTestId('dialog-close')).not.toBeNull();
    });

    test('prop renderClose=false should not render the button', () => {
      const { queryByTestId } = render(
        <Dialog renderClose={false} isOpen aria-label="_" />,
      );
      expect(queryByTestId('dialog-close')).toBeNull();
    });

    it('should render button by default', () => {
      const { queryByTestId } = render(<Dialog isOpen aria-label="_" />);
      expect(queryByTestId('dialog-close')).not.toBeNull();
    });

    it('should close dialog on click', () => {
      const onDismiss = jest.fn();
      const { getByTestId } = render(
        <Dialog onDismiss={onDismiss} isOpen aria-label="_" />,
      );
      const button = getByTestId('dialog-close');

      fireEvent.click(button);

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  test('should close dialog on `Escape` key pressed', () => {
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <Dialog onDismiss={onDismiss} isOpen aria-label="_" />,
    );
    const overlay = getByTestId('dialog-overlay');

    fireEvent.keyDown(overlay, { key: 'Escape' });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('should close dialog on overlay click', () => {
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <Dialog onDismiss={onDismiss} isOpen aria-label="_" />,
    );
    const overlay = getByTestId('dialog-overlay');

    fireEvent.click(overlay);

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  describe('Modal size', () => {
    test('size `regular`', () => {
      const { getByTestId } = render(
        <Dialog size={SIZE.regular} isOpen aria-label="_" />,
      );
      expect(getByTestId('dialog-overlay')).toHaveClass(SIZE.regular);
    });

    test('size `full`', () => {
      const { getByTestId } = render(
        <Dialog size={SIZE.full} isOpen aria-label="_" />,
      );
      expect(getByTestId('dialog-overlay')).toHaveClass(SIZE.full);
    });

    test('size should be `regular` by default', () => {
      const { getByTestId } = render(<Dialog isOpen aria-label="_" />);
      expect(getByTestId('dialog-overlay')).toHaveClass(SIZE.regular);
    });
  });
});
