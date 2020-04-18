import React from 'react';
import { FastField as BaseFastField } from 'formik';

export function FastField({ label, name, children }) {
  return (
    <>
      {label ? <span className="block text-sm pb-1">{label}</span> : null}
      <BaseFastField name={name}>
        {({ field, meta }) => (
          <>
            {React.Children.map(children, child =>
              React.cloneElement(child, field),
            )}
            {meta.touched && meta.error && (
              <div
                data-testid={`${field.name}-validation}`}
                className="pl-3 mt-1 text-error font-semibold text-sm"
              >
                {meta.error}
              </div>
            )}
          </>
        )}
      </BaseFastField>
    </>
  );
}
