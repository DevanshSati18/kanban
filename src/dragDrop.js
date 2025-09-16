// Handles HTML5 drag & drop mechanics. Keeps UI concerns separated from storage.
// Emits custom events on the board element to notify the app about drop changes.

export function initDragAndDrop(boardRoot = document.getElementById('board')) {
    let draggedEl = null;
    let draggedId = null;
  
    // delegate: set up listeners for cards
    boardRoot.addEventListener('dragstart', (e) => {
      const card = e.target.closest('.task-card');
      if (!card) return;
      draggedEl = card;
      draggedId = card.dataset.id;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', draggedId);
      // slightly helpful visual
      card.classList.add('dragging');
    });
  
    boardRoot.addEventListener('dragend', (e) => {
      if (draggedEl) draggedEl.classList.remove('dragging');
      draggedEl = null;
      draggedId = null;
      // remove any drag-over states
      document.querySelectorAll('.task-list').forEach(n => n.classList.remove('drag-over'));
    });
  
    // allow drops on task-list containers
    boardRoot.addEventListener('dragover', (e) => {
      const list = e.target.closest('.task-list');
      if (!list) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      list.classList.add('drag-over');
    });
  
    boardRoot.addEventListener('dragleave', (e) => {
      const list = e.target.closest('.task-list');
      if (!list) return;
      // If leaving the container, remove style
      if (!list.contains(e.relatedTarget)) list.classList.remove('drag-over');
    });
  
    boardRoot.addEventListener('drop', (e) => {
      const list = e.target.closest('.task-list');
      if (!list) return;
      e.preventDefault();
      list.classList.remove('drag-over');
      const targetStatus = list.dataset.status;
      // read id from dataTransfer if available (fallback to draggedId)
      const id = e.dataTransfer.getData('text/plain') || draggedId;
      if (!id) return;
  
      // Emit custom event on board: detail {id, status}
      boardRoot.dispatchEvent(new CustomEvent('task:dropped', {
        bubbles: true,
        detail: { id, status: targetStatus }
      }));
    });
  }
  