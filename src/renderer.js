// Responsible for converting task data -> DOM and keeping DOM updated.
// It does NOT handle persistence or drag logic directly.

import { el, $ } from './dom.js';

export function renderBoard(tasks = []) {
  // tasks: array of {id,title,description,status,createdAt}
  const statusLists = {
    todo: tasks.filter(t => t.status === 'todo'),
    inprogress: tasks.filter(t => t.status === 'inprogress'),
    done: tasks.filter(t => t.status === 'done')
  };

  for (const status of ['todo', 'inprogress', 'done']) {
    const container = document.querySelector(`.task-list[data-status="${status}"]`);
    container.innerHTML = ''; // clear

    const list = statusLists[status];
    if (list.length === 0) {
      const empty = el('div', { class: 'empty' }, 'No tasks');
      container.append(empty);
      continue;
    }

    for (const task of list) {
      container.append(renderTaskCard(task));
    }
  }
}

export function renderTaskCard(task) {
  // create card element; make draggable
  const card = el('div', { class: 'task-card', draggable: 'true', dataset: { id: task.id } },
    el('div', { class: 'task-title' }, task.title),
    el('div', { class: 'task-desc' }, task.description || ''),
    el('div', { class: 'task-meta' },
      el('small', {}, new Date(task.createdAt).toLocaleString()),
      el('div', { class: 'controls' },
        el('button', { class: 'btn', onclick: (e)=> e.stopPropagation() }, 'Edit'),
        el('button', { class: 'btn danger', onclick: (e)=> {
          e.stopPropagation();
          // dispatch custom event to request delete
          card.dispatchEvent(new CustomEvent('task:delete', { bubbles: true, detail: { id: task.id } }));
        } }, 'Delete')
      )
    )
  );

  // attach data for drag/drop module to read
  card.dataset.status = task.status;
  return card;
}
