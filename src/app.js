// Wire modules together

import { initDragAndDrop } from './dragDrop.js';
import { initEvents } from './events.js';

function boot() {
  initEvents();
  initDragAndDrop(document.getElementById('board'));
}

document.addEventListener('DOMContentLoaded', boot);
