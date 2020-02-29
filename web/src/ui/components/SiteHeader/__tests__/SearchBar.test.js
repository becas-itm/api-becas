import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

const renderSearch = ({ onSearch = jest.fn(), ...restProps } = {}) => {
  const result = render(<SearchBar onSearch={onSearch} {...restProps} />);
  return {
    ...result,
    input: result.getByPlaceholderText('Buscar'),
  };
};

describe('Search bar', () => {
  it('should render correctly', () => {
    const { input } = renderSearch();
    expect(input).toBeInTheDocument();
  });

  it('should pass initial value to input', () => {
    const { input } = renderSearch({ initialTerm: 'foo' });
    expect(input.value).toBe('foo');
  });

  it('should fire `onSearch` on form submit', () => {
    const onSearch = jest.fn();
    const { input } = renderSearch({ onSearch });

    fireEvent.change(input, { target: { value: 'baz' } });
    fireEvent.submit(input);

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('baz');
  });

  describe('clear button', () => {
    it('it should only appear if there is a value', () => {
      const { input, queryByText } = renderSearch();

      let clearBtn = queryByText('Limpiar búsqueda');
      expect(clearBtn).not.toBeInTheDocument();

      fireEvent.change(input, { target: { value: 'foo' } });

      clearBtn = queryByText('Limpiar búsqueda');
      expect(clearBtn).toBeInTheDocument();
    });

    it('should clear input value on click', () => {
      const onSearch = jest.fn();
      const { input, getByText } = renderSearch({ onSearch });

      fireEvent.change(input, { target: { value: 'foo' } });
      const clearBtn = getByText('Limpiar búsqueda');
      fireEvent.click(clearBtn);

      expect(input.value).toBe('');
      expect(onSearch).not.toHaveBeenCalled();
    });

    it('should focus on input after click', () => {
      const onSearch = jest.fn();
      const { input, getByText } = renderSearch({ onSearch });

      fireEvent.change(input, { target: { value: 'foo' } });
      const clearBtn = getByText('Limpiar búsqueda');
      fireEvent.click(clearBtn);

      expect(input).toHaveFocus();
    });
  });

  describe('`Escape` keyboard shortcut', () => {
    it('should clear input value', () => {
      const onSearch = jest.fn();
      const { input } = renderSearch({ onSearch });

      fireEvent.change(input, { target: { value: 'foo' } });
      fireEvent.keyDown(input, { key: 'Escape' });

      expect(input.value).toBe('');
      expect(onSearch).not.toHaveBeenCalled();
    });

    it('should not work with different key', () => {
      const otherKey = 'Shift';
      const onSearch = jest.fn();
      const { input } = renderSearch({ onSearch });

      fireEvent.change(input, { target: { value: 'foo' } });
      fireEvent.keyDown(input, { key: otherKey });

      expect(input.value).toBe('foo');
      expect(onSearch).not.toHaveBeenCalled();
    });
  });
});
