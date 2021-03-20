'use strict';

(() => {
  const formElement = document.querySelector('.form-feedback');
  const Inputmask = window.Inputmask;

  if (formElement) {
    const telInputElement = formElement.querySelector('#tel');
    const mask = new Inputmask('9 (999) 999-99-99');
    if (telInputElement) {
      mask.mask(telInputElement);
    }
  }
})();
