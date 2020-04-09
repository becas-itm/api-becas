import React from 'react';

export function RenderIcon({ isFocused, ...restProps }) {
  return (
    <div
      style={{ minWidth: 40, minHeight: 40 }}
      className="flex items-center justify-center"
    >
      <div {...restProps} />
    </div>
  );
}
