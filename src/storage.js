// LocalStorage wrapper - modular and reusable
const STORAGE_KEY = 'kanban.tasks.v1';

export const Storage = {
  save(tasks) {
    if (!Array.isArray(tasks)) throw new TypeError('tasks must be an array');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },

  load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return []; // no tasks yet
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to parse storage', e);
      return [];
    }
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
