const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const counter = document.getElementById('counter');

function updateCounter() {
  const count = taskList.children.length;
  counter.textContent = count === 0 ? "No tasks for now — relax!" : `${count} task${count > 1 ? 's' : ''} remaining`;
}

function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '×';
  removeBtn.className = 'remove-btn';
  removeBtn.setAttribute('aria-label', `Remove task: ${taskText}`);
  removeBtn.addEventListener('click', () => {
    li.classList.add('removing');
    li.addEventListener('animationend', () => {
      li.remove();
      updateCounter();
    });
  });

  li.appendChild(removeBtn);
  return li;
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  const taskElement = createTaskElement(taskText);
  taskList.appendChild(taskElement);
  updateCounter();
  taskInput.value = '';
  taskInput.focus();
});

updateCounter();
