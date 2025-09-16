# Dynamic Kanban Board

## How to run
This project uses ES modules; serve it with a simple static server.

Example:
- `npx serve` in project root (install serve if you don't have it)
- or `python -m http.server 8080` and open http://localhost:8080

## Features
- Create tasks (title + description).
- Three columns (To Do, In Progress, Done).
- Drag & drop between columns.
- Persistence via localStorage.
- Modular code: storage, dom helpers, renderer, drag/drop, events, utils.

## Files of interest
- `src/storage.js` - localStorage wrapper
- `src/dom.js` - DOM utilities (el, $)
- `src/renderer.js` - rendering logic
- `src/dragDrop.js` - drag & drop
- `src/events.js` - form, delete, drop handlers
- `src/utils.js` - reusable utilities (uid)
