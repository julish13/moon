'use strict';

(() => {
  const mainNavElement = document.querySelector('.main-nav');
  const mainElement = document.querySelector('.main');
  const footerElement = document.querySelector('.page-footer');

  if (mainNavElement) {
    const mainNavLogoElement = mainNavElement.querySelector('.main-nav__logo');
    const mainNavToggleElement = mainNavElement.querySelector('.main-nav__toggle');
    const mainNavSiteNavElement = mainNavElement.querySelector('.main-nav__site-nav');
    const navItemsCollection = mainNavElement.querySelectorAll('.site-nav__item');

    const elements = {
      'main-nav': mainNavElement,
      'main-nav__logo': mainNavLogoElement,
      'main-nav__toggle': mainNavToggleElement,
      'main-nav__site-nav': mainNavSiteNavElement,
    };

    Object.keys(elements).forEach((element) => {
      if (elements[element] !== undefined) {
        elements[element].classList.remove(`${element}--no-js`);
        elements[element].classList.add(`${element}--closed`);
      }
    })

    const toggleMenu = () => {
      Object.keys(elements).forEach((element) => {
        if (elements[element] !== undefined) {
          elements[element].classList.toggle(`${element}--opened`);
          elements[element].classList.toggle(`${element}--closed`);
        }
      })
      if (mainElement) {
        mainElement.classList.toggle('main--menu-open');
      }
      if (footerElement) {
        footerElement.classList.toggle('page-footer--menu-open');
      }
    };

    if (mainNavToggleElement) {
      mainNavToggleElement.addEventListener('click', toggleMenu);
    }

    if (navItemsCollection.length > 0) {
      navItemsCollection.forEach((item) => {
        const link = item.querySelector('a');
        link.addEventListener('click', toggleMenu);
      })
    }
  }
})();
