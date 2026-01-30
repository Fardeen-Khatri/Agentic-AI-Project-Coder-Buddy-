# SimpleTodo

![License](https://img.shields.io/badge/license-MIT-green)

A lightweight web‑based to‑do list application that stores tasks in the browser’s **localStorage**. No build step or server is required – just open the page and start managing tasks.

## Tech Stack
- **HTML** – structure of the UI
- **CSS** – styling and responsive layout
- **JavaScript** – task model, manager, rendering, event handling, persistence

## Features
- Add new tasks
- Mark tasks as completed / uncompleted
- Delete individual tasks
- Filter tasks (All / Active / Completed)
- Persist tasks across page reloads using `localStorage`
- Responsive design for desktop and mobile

## Installation / Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/simpletodo.git
   ```
2. Open `index.html` in any modern browser. No additional build steps or dependencies are required.

## Usage
- **Add a task**: Type a description into the input field at the top and press **Enter** or click the **Add** button.
- **Complete a task**: Click the checkbox next to a task to toggle its completed state.
- **Delete a task**: Click the trash‑can icon on the right side of a task.
- **Filter tasks**: Use the *All*, *Active*, and *Completed* buttons at the bottom to view tasks by status.

All changes are saved automatically to `localStorage` under the key `simpleTodoTasks`.

## Architecture
- `index.html` – UI markup and basic structure.
- `style.css` – Styling, layout, and responsive design.
- `app.js` – Core logic:
  - **Task** model (id, description, completed)
  - **TaskManager** for CRUD operations and persistence
  - Rendering functions that update the DOM based on the current state
  - Event listeners for user interactions (add, toggle, delete, filter)

## Development Notes
- Tasks are persisted in the browser’s `localStorage` using the key **`simpleTodoTasks`**. Clearing browser data will remove all saved tasks.
- The code is written in plain JavaScript without any external libraries to keep the project simple and easy to understand.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bug‑fix.
3. Ensure your changes follow the existing code style.
4. Submit a pull request with a clear description of your changes.

Feel free to open issues for bugs, feature requests, or general feedback.

## License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
