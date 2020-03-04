export function collectFilters(form) {
  const filters = {};
  for (const filter of form.elements) {
    if (!filter.name || filter.disabled) {
      continue;
    }

    // treat filters whose names end with [] as arrays
    if (filter.name.endsWith('[]')) {
      const filterName = filter.name.slice(0, filter.name.length - 2);
      if (!filters[filterName]) {
        filters[filterName] = [];
      }
      if (filter.checked) {
        filters[filterName].push(filter.value);
      }

      continue;
    }

    filters[filter.name] = filter.value;
  }

  return filters;
}
