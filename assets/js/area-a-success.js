// Area A Success Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Display task details from stored data
    const lastTask = JSON.parse(localStorage.getItem('jira_last_task') || '{}');
    
    if (lastTask.id) {
        // Update task ID
        document.getElementById('taskId').textContent = lastTask.id;
        
        // Display task summary
        const taskSummary = document.getElementById('taskSummary');
        if (taskSummary && Object.keys(lastTask).length > 0) {
            taskSummary.innerHTML = `
                <h3>Task Details</h3>
                <div class="task-detail">
                    <strong>Project:</strong> ${formatProjectName(lastTask.project)}
                </div>
                <div class="task-detail">
                    <strong>Type:</strong> ${formatIssueType(lastTask.issueType)}
                </div>
                <div class="task-detail">
                    <strong>Priority:</strong> ${formatPriority(lastTask.priority)}
                </div>
                <div class="task-detail">
                    <strong>Reporter:</strong> ${lastTask.reporter}
                </div>
                <div class="task-detail">
                    <strong>Summary:</strong> ${lastTask.summary}
                </div>
            `;
            taskSummary.style.display = 'block';
        }
    }
    
    function formatProjectName(project) {
        const projectNames = {
            'project-synapse': 'Project Synapse',
            'project-cortex': 'Project Cortex',
            'infra-team': 'Infra Team'
        };
        return projectNames[project] || project;
    }
    
    function formatIssueType(type) {
        const types = {
            'bug': 'Bug',
            'feature': 'Feature Request',
            'task': 'Task'
        };
        return types[type] || type;
    }
    
    function formatPriority(priority) {
        return priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : '';
    }
});