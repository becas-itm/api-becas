import React from 'react';
import classNames from 'classnames';

const Textarea = React.forwardRef(({ className, ...restProps }) => {
  const styles = classNames(
    'w-full px-3 py-2 rounded',
    restProps.readOnly || restProps.disabled ? 'bg-gray-300' : 'bg-gray-200',
    restProps.disabled && 'cursor-not-allowed',
  );
  return <textarea {...restProps} className={styles} />;
});

export default Textarea;
