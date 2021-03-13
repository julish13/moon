'use strict';

(() => {
  const form = document.querySelector('.form-feedback');
  const telInputElement = form.querySelector('#tel');

  const regex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  const onInputCheckTel = () => {
    const value = telInputElement.value;
    if(!regex.test(value)) {
      telInputElement.setCustomValidity('Введите 10-значный номер телефона');
    } else {
      telInputElement.setCustomValidity('');
    }
    telInputElement.reportValidity();
  }
  telInputElement.addEventListener('input', onInputCheckTel);
})();
