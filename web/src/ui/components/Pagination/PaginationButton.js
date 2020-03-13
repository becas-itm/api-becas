import React from 'react';
import classNames from 'classnames';

export default function PaginationButton({ selected, ...restProps }) {
  const styles = classNames(
    'Pagination__pageBtn h-10 flex items-center justify-center rounded focus:outline-none font-semibold',
    selected
      ? 'bg-primary focus:shadow-outline text-white'
      : 'hover:bg-gray-300 focus:bg-gray-300 text-gray-600 hover:text-gray-700 focus:text-gray-700',
  );

  return (
    <button {...restProps} style={{ minWidth: '2.5rem' }} className={styles} />
  );
}
