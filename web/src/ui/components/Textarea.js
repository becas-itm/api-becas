import React from 'react';
import classNames from 'classnames';

const Textarea = React.forwardRef(({ className, ...restProps }, ref) => {
  const styles = classNames(
    'w-full px-3 py-2 rounded',
    restProps.readOnly || restProps.disabled ? 'bg-gray-100' : 'bg-gray-100',
    restProps.disabled && 'cursor-not-allowed',
  );
  return <textarea {...restProps} ref={ref} className={styles} />;
});

export default Textarea;
