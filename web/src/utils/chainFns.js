export default function chainFns(...fns) {
  fns = fns.filter(Boolean);
  return (...args) => fns.forEach(fn => fn(...args));
}
