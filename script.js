const taskInput = document.getElementById('taskInput');
const dueInput = document.getElementById('dueInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const nearingHoursInput = document.getElementById('nearingHours');
const requestNotifBtn = document.getElementById('requestNotif');

addBtn.addEventListener('click', addTask);
requestNotifBtn.addEventListener('click', () => {
  Notification.requestPermission().then(perm => { if (perm === 'granted') alert('Notifications enabled!'); });
});

function addTask() {
  const taskText = taskInput.value.trim();
  const dueTime = dueInput.value;
  if (!taskText) return;
  const li = document.createElement('li');
  li.innerHTML = `<span>${taskText} - Due: ${dueTime ? new Date(dueTime).toLocaleString() : 'No date'}</span>
                  <button onclick="removeTask(this)">❌</button>`;
  taskList.appendChild(li);
  if (dueTime) scheduleNotification(taskText, new Date(dueTime));
  taskInput.value = ''; dueInput.value = '';
}

function removeTask(btn) { btn.parentElement.remove(); }

function scheduleNotification(task, dueDate) {
  const nearingHours = parseFloat(nearingHoursInput.value) || 24;
  const notifyTime = dueDate.getTime() - nearingHours * 3600 * 1000;
  const delay = notifyTime - Date.now();
  if (delay > 0) {
    setTimeout(() => {
      if (Notification.permission === 'granted') new Notification('Reminder', { body: `${task} is due soon!` });
    }, delay);
  }
}
