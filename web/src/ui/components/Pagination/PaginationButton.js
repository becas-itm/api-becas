import React from 'react';
import classNames from 'classnames';

export default function PaginationButton({ selected, ...restProps }) {
  const styles = classNames(
    'Pagination__pageBtn h-10 flex items-center justify-center rounded focus:outline-none font-semibold',
    selected
      ? 'bg-primary focus:shadow-outline text-white'
      : 'hover:bg-gray-300 focus:bg-gray-300 hover:text-active focus:text-active',
  );

  return (
    <button {...restProps} style={{ minWidth: '2.5rem' }} className={styles} />
  );
}
