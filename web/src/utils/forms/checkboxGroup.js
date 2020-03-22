export function checkboxGroup(fieldName, formik) {
  return value =>
    getCheckboxProps({
      value,
      name: fieldName,
      values: formik.values[fieldName],
      setFieldValue: formik.setFieldValue,
    });
}

function getCheckboxProps({ name, value, values, setFieldValue }) {
  return {
    name,
    value,
    checked: values.includes(value),
    onChange: () => {
      const set = new Set(values);

      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }

      setFieldValue(name, Array.from(set));
    },
  };
}
