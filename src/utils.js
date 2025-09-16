// Small utilities. Includes a reusable UID generator and any helpers needed.
// This module fulfills the "at least one reusable utility function" requirement.

export function uid(prefix = '') {
    // simple unique id based on time + random — good enough for local app
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
  