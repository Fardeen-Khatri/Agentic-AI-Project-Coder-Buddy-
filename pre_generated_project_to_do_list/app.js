// app.js – SimpleTodo core logic
// -------------------------------------------------
// This script implements the data model, task manager, UI rendering,
// and event handling for the SimpleTodo application.
// It is written in plain vanilla JavaScript and loaded with the `defer`
// attribute, so the DOM is ready when the code runs.

// -------------------------------------------------------------------
// 1. Data Model
// -------------------------------------------------------------------
/**
 * Represents a single todo task.
 * @class
 */
class Task {
  /**
   * @param {string} id - Unique identifier for the task.
   * @param {string} text - The task description.
   * @param {boolean} [completed=false] - Completion state.
   */
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}
// Expose globally for debugging (optional)
window.Task = Task;

// -------------------------------------------------------------------
// 2. Task Manager – handles storage and manipulation of tasks
// -------------------------------------------------------------------
class TaskManager {
  constructor() {
    /** @type {Task[]} */
    this.tasks = [];
    this.storageKey = 'simpleTodoTasks';
  }

  /** Load tasks from localStorage and convert them into Task instances */
  loadFromStorage() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      this.tasks = [];
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      // Ensure we always have an array of Task objects
      this.tasks = Array.isArray(parsed)
        ? parsed.map(item => new Task(item.id, item.text, item.completed))
        : [];
    } catch (e) {
      console.error('Failed to parse tasks from storage:', e);
      this.tasks = [];
    }
  }

  /** Persist current tasks array to localStorage */
  saveToStorage() {
    try {
      const payload = JSON.stringify(this.tasks);
      localStorage.setItem(this.storageKey, payload);
    } catch (e) {
      console.error('Failed to save tasks to storage:', e);
    }
  }

  /** Add a new task with the given text */
  addTask(text) {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    const newTask = new Task(id, text.trim(), false);
    this.tasks.push(newTask);
    this.saveToStorage();
    return newTask;
  }

  /** Toggle the completed flag of a task identified by id */
  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveToStorage();
    }
  }

  /** Delete a task from the list */
  deleteTask(id) {
    const originalLength = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    if (this.tasks.length !== originalLength) {
      this.saveToStorage();
    }
  }

  /**
   * Return tasks according to filter criteria.
   * @param {'all'|'active'|'completed'} filter
   * @returns {Task[]}
   */
  getFilteredTasks(filter = 'all') {
    switch (filter) {
      case 'active':
        return this.tasks.filter(t => !t.completed);
      case 'completed':
        return this.tasks.filter(t => t.completed);
      case 'all':
      default:
        return this.tasks.slice(); // shallow copy
    }
  }
}

// Expose the manager instance globally for debugging.
window.TaskManager = TaskManager;

// -------------------------------------------------------------------
// 3. UI Rendering Helpers
// -------------------------------------------------------------------
/**
 * Render the task list based on the current filter.
 * @param {'all'|'active'|'completed'} filter
 */
function renderTasks(filter = 'all') {
  const listEl = document.getElementById('task-list');
  if (!listEl) return;

  const tasks = taskManager.getFilteredTasks(filter);
  // Clear existing content
  listEl.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    // Clicking the text toggles completion
    span.style.cursor = 'pointer';

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.setAttribute('aria-label', 'Delete task');
    delBtn.textContent = '✕';

    li.appendChild(span);
    li.appendChild(delBtn);
    listEl.appendChild(li);
  });
}

/** Update the visual state of filter buttons */
function updateFilterUI(activeFilter) {
  const filters = ['all', 'active', 'completed'];
  filters.forEach(f => {
    const btn = document.getElementById(`filter-${f}`);
    if (btn) {
      btn.classList.toggle('active', f === activeFilter);
    }
  });
}

// -------------------------------------------------------------------
// 4. Event Binding
// -------------------------------------------------------------------
let currentFilter = 'all';
let taskManager; // will be instantiated on DOMContentLoaded

function bindEvents() {
  // Form submission – add new task
  const form = document.getElementById('task-form');
  const input = document.getElementById('new-task');
  if (form && input) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const text = input.value.trim();
      if (text) {
        taskManager.addTask(text);
        input.value = '';
        renderTasks(currentFilter);
      }
    });
  }

  // Click delegation for task list (toggle & delete)
  const listEl = document.getElementById('task-list');
  if (listEl) {
    listEl.addEventListener('click', e => {
      const target = e.target;
      const li = target.closest('li');
      if (!li) return; // click outside a task item
      const id = li.dataset.id;
      if (target.classList.contains('delete-btn')) {
        taskManager.deleteTask(id);
        renderTasks(currentFilter);
      } else if (target.classList.contains('task-text') || target === li) {
        taskManager.toggleTask(id);
        renderTasks(currentFilter);
      }
    });
  }

  // Filter buttons
  const filterButtons = ['all', 'active', 'completed'];
  filterButtons.forEach(f => {
    const btn = document.getElementById(`filter-${f}`);
    if (btn) {
      btn.addEventListener('click', () => {
        currentFilter = f;
        renderTasks(currentFilter);
        updateFilterUI(currentFilter);
      });
    }
  });
}

// -------------------------------------------------------------------
// 5. Initialization
// -------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  taskManager = new TaskManager();
  taskManager.loadFromStorage();
  renderTasks(currentFilter);
  updateFilterUI(currentFilter);
  bindEvents();
  // expose the instance for debugging
  window.taskManager = taskManager;
});
