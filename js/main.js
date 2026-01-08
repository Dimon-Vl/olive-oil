import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initBackToTop } from './modules/backToTop.js';
import { initI18n } from './i18n.js';

import '../scss/style.scss';

initI18n();
initNav();
initReveal();
initBackToTop();
