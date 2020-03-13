const MAX_BUTTONS = 5;

/**
 * Calc the amount of buttons displayed by the paginator.
 * Buttons are prepend and append around the current page button.
 */
export function calcControlButtons({ current, total }) {
  const offset = (MAX_BUTTONS - 1) / 2;
  const buttons = [];

  for (let i = current - offset; i < current; i++) {
    if (i >= 1) {
      buttons.push(i);
    }
  }

  buttons.push(current);

  for (let i = current + 1; i <= current + offset; i++) {
    if (i <= total) {
      buttons.push(i);
    }
  }

  return buttons;
}
