function initMap() {
  const LOCATION = { lat: 59.938891, lng: 30.323037 };

  const map = new google.maps.Map(document.querySelector('#map'), {
    zoom: 14,
    center: LOCATION,
    disableDefaultUI: true,
  });
}

'use strict';

(() => {
  const mainNavElement = document.querySelector('.main-nav');
  const mainNavLogo = mainNavElement?.querySelector('.main-nav__logo');
  const mainNavToggle = mainNavElement?.querySelector('.main-nav__toggle');
  const mainNavSiteNav = mainNavElement?.querySelector('.main-nav__site-nav');

  const elements = {
    'main-nav': mainNavElement,
    'main-nav__logo': mainNavLogo,
    'main-nav__toggle': mainNavToggle,
    'main-nav__site-nav': mainNavSiteNav,
  };

  Object.keys(elements).forEach((element) => {
    elements[element]?.classList.remove(`${element}--no-js`);
    elements[element]?.classList.add(`${element}--closed`);
  })


  mainNavToggle?.addEventListener('click', () => {
    Object.keys(elements).forEach((element) => {
      elements[element]?.classList.toggle(`${element}--opened`);
      elements[element]?.classList.toggle(`${element}--closed`);
    })
  });
})();

'use strict';

(() => {
  const form = document.querySelector('.form-feedback');
  const telInputElement = form?.querySelector('#tel');

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

  telInputElement?.addEventListener('input', onInputCheckTel);

})();
