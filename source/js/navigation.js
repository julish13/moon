'use strict';

(() => {
  const mainNavElement = document.querySelector('.main-nav');
  const mainNavLogo = mainNavElement.querySelector('.main-nav__logo');
  const mainNavToggle = mainNavElement.querySelector('.main-nav__toggle');
  const mainNavSiteNav = mainNavElement.querySelector('.main-nav__site-nav');

  const elements = {
    'main-nav': mainNavElement,
    'main-nav__logo': mainNavLogo,
    'main-nav__toggle': mainNavToggle,
    'main-nav__site-nav': mainNavSiteNav,
  };

  Object.keys(elements).forEach((element) => {
    elements[element].classList.remove(`${element}--no-js`);
    elements[element].classList.add(`${element}--closed`);
  })


  mainNavToggle.addEventListener('click', () => {
    Object.keys(elements).forEach((element) => {
      elements[element].classList.toggle(`${element}--opened`);
      elements[element].classList.toggle(`${element}--closed`);
    })
  });
})();