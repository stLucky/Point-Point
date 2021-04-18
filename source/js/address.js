const DESKTOP_WIDTH = '(min-width: 1440px)';
const DEFAULT_ADDRESS = 'Адрес не указан'

const addressActive = document.querySelector('.transportation__text--active');

const isUpperDesktop = window.matchMedia(DESKTOP_WIDTH).matches;

if (isUpperDesktop) {
  addressActive.textContent = DEFAULT_ADDRESS;
}
