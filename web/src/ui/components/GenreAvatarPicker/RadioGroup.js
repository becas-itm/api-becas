// Taken from: https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/js/radioGroup.js

import RadioButton from './RadioButton';

export default class RadioGroup {
  constructor(node, onChange) {
    this.node = node;

    this.radioButtons = [];

    this.firstRadioButton = null;
    this.lastRadioButton = null;

    this.onChange = onChange;
  }

  init(value) {
    // initialize pop up menus
    if (!this.node.getAttribute('role')) {
      this.node.setAttribute('role', 'radiogroup');
    }

    let isSelected = false;

    for (const node of this.node.querySelectorAll('[role=radio]')) {
      const radio = new RadioButton(node, this);
      radio.init();
      this.radioButtons.push(radio);

      if (!this.firstRadioButton) {
        this.firstRadioButton = radio;
      }

      this.lastRadioButton = radio;

      if (radio.node.getAttribute('value') === value) {
        radio.node.tabIndex = 0;
        radio.node.setAttribute('aria-checked', 'true');
        isSelected = true;
      }
    }

    if (!isSelected) {
      this.firstRadioButton.node.tabIndex = 0;
    }
  }

  setChecked(currentRadio) {
    for (const radio of this.radioButtons) {
      radio.node.setAttribute('aria-checked', 'false');
      radio.node.tabIndex = -1;
    }
    currentRadio.node.setAttribute('aria-checked', 'true');
    currentRadio.node.tabIndex = 0;
    currentRadio.node.focus();
    this.onChange(currentRadio.node.getAttribute('value'));
  }

  setCheckedToPrevious(currentRadio) {
    if (currentRadio === this.firstRadioButton) {
      this.setChecked(this.lastRadioButton);
    } else {
      const index = this.radioButtons.indexOf(currentRadio);
      this.setChecked(this.radioButtons[index - 1]);
    }
  }

  setCheckedToNext(currentRadio) {
    if (currentRadio === this.lastRadioButton) {
      this.setChecked(this.firstRadioButton);
    } else {
      const index = this.radioButtons.indexOf(currentRadio);
      this.setChecked(this.radioButtons[index + 1]);
    }
  }
}
