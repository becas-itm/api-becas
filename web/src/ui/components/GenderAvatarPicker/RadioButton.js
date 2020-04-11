// Taken from: https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/js/radioButton.js

const KEY_CODE = Object.freeze({
  RETURN: 13,
  SPACE: 32,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
});

export default class RadioButton {
  constructor(node, groupObj) {
    this.node = node;
    this.radioGroup = groupObj;
  }

  init() {
    this.node.tabIndex = -1;
    this.node.setAttribute('aria-checked', 'false');

    this.node.addEventListener('keydown', this.handleKeydown.bind(this));
    this.node.addEventListener('click', this.handleClick.bind(this));
    this.node.addEventListener('focus', this.handleFocus.bind(this));
    this.node.addEventListener('blur', this.handleBlur.bind(this));
  }

  handleKeydown(event) {
    let stopPropagation = true;

    switch (event.keyCode) {
      case KEY_CODE.SPACE:
      case KEY_CODE.RETURN:
        this.radioGroup.setChecked(this);
        break;

      case KEY_CODE.UP:
      case KEY_CODE.LEFT:
        this.radioGroup.setCheckedToPrevious(this);
        break;

      case KEY_CODE.DOWN:
      case KEY_CODE.RIGHT:
        this.radioGroup.setCheckedToNext(this);
        break;

      default:
        stopPropagation = false;
        break;
    }

    if (stopPropagation) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  handleClick() {
    this.radioGroup.setChecked(this);
  }

  handleFocus() {
    this.node.classList.add('focus');
  }

  handleBlur() {
    this.node.classList.remove('focus');
  }
}
