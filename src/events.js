// Wire up UI events: form submit, delete requests, and handle custom events emitted by dragDrop module.

import { Storage } from './storage.js';
import { renderBoard } from './renderer.js';
import { uid } from './utils.js';

// Use an in-memory tasks array as the single source-of-truth while the page is live.
// Persist to storage whenever tasks change.
let tasks = [];

export function initEvents() {
  const form = document.getElementById('task-form');
  const board = document.getElementById('board');

  // form submit -> add task into "todo"
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    if (!title) return;

    const task = {
      id: uid(),
      title,
      description,
      status: 'todo',
      createdAt: Date.now()
    };
    tasks.unshift(task); // newest on top of its column
    persistAndRender();
    form.reset();
    form.title.focus();
  });

  // delete via custom event from renderer
  board.addEventListener('task:delete', (e) => {
    const { id } = e.detail;
    tasks = tasks.filter(t => t.id !== id);
    persistAndRender();
  });

  // handle drop events emitted by dragDrop module
  board.addEventListener('task:dropped', (e) => {
    const { id, status } = e.detail;
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return;
    tasks[idx].status = status;
    // move the changed task to top of that column for visibility
    const [moved] = tasks.splice(idx, 1);
    tasks.unshift(moved);
    persistAndRender();
  });

  // load initial tasks
  tasks = Storage.load();
  renderBoard(tasks);
}

function persistAndRender() {
  Storage.save(tasks);
  renderBoard(tasks);
}
