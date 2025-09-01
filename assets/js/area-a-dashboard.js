// Area A Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Display username from login
    const username = localStorage.getItem('jira_username') || 'TestUser';
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        usernameDisplay.textContent = username;
    }

    // Update task counters with stored data
    updateTaskCounters();
    
    // Load recent tasks
    loadRecentTasks();
});

function updateTaskCounters() {
    const completedCount = localStorage.getItem('jira_completed_count') || '0';
    const openCount = localStorage.getItem('jira_open_count') || '0';
    
    document.getElementById('completed-tasks').textContent = completedCount;
    document.getElementById('open-tasks').textContent = openCount;
}

function loadRecentTasks() {
    const recentTasks = JSON.parse(localStorage.getItem('jira_recent_tasks') || '[]');
    const taskList = document.getElementById('recent-task-list');
    
    if (recentTasks.length > 0) {
        taskList.innerHTML = '';
        recentTasks.slice(-5).reverse().forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <div class="task-info">
                    <span class="task-id">${task.id}</span>
                    <span class="task-title">${task.summary}</span>
                </div>
                <span class="task-status status-progress">Created</span>
            `;
            taskList.appendChild(taskItem);
        });
    }
}