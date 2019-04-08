import { setupServiceWorker, setupInstall } from './utils/browser-utilities.js';
import Scorecard from './elements/scorecard.js';

setupServiceWorker();
setupInstall();

window.addEventListener('load', () => {
  const scorecard = new Scorecard();
  scorecard.start();
})