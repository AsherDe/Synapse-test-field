// Area A Create Task JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const modal = document.getElementById('adModal');
    const closeModal = document.getElementById('closeModal');
    
    // Add random classes to test CSS selector robustness
    addRandomClasses();
    
    // Randomize priority order to test generalization
    randomizePriorityOrder();
    
    // Random modal interference
    setTimeout(() => {
        if (Math.random() < 0.25) { // 25% chance to show modal
            showInterferenceModal();
        }
    }, 15000 + Math.random() * 20000); // Random delay between 15-35 seconds
    
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(taskForm);
        const taskData = {
            id: '#PROJ-' + String(Date.now()).slice(-3),
            project: formData.get('project'),
            issueType: formData.get('issueType'),
            reporter: formData.get('reporter'),
            component: formData.get('component'),
            priority: formData.get('priority'),
            summary: formData.get('summary'),
            description: formData.get('description'),
            createdAt: new Date().toISOString()
        };
        
        // Validate required fields
        if (!taskData.project || !taskData.issueType || !taskData.reporter || 
            !taskData.priority || !taskData.summary || !taskData.description) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Store task data
        const existingTasks = JSON.parse(localStorage.getItem('jira_recent_tasks') || '[]');
        existingTasks.push(taskData);
        localStorage.setItem('jira_recent_tasks', JSON.stringify(existingTasks));
        
        // Update counters
        const openCount = parseInt(localStorage.getItem('jira_open_count') || '0') + 1;
        localStorage.setItem('jira_open_count', openCount.toString());
        
        // Store task data for success page
        localStorage.setItem('jira_last_task', JSON.stringify(taskData));
        
        // Simulate form submission
        const submitBtn = taskForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Creating Task...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            window.location.href = 'success.html';
        }, 1500);
    });
    
    // Modal event listeners
    closeModal.addEventListener('click', closeInterferenceModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeInterferenceModal();
        }
    });
    
    // Survey button listeners
    document.querySelectorAll('.survey-btn').forEach(btn => {
        btn.addEventListener('click', closeInterferenceModal);
    });
    
    function addRandomClasses() {
        const formElements = taskForm.querySelectorAll('input, select, textarea');
        formElements.forEach(el => {
            const randomClass = 'input-field-' + Math.random().toString(36).substr(2, 5);
            el.classList.add('input-field', randomClass);
        });
    }
    
    function randomizePriorityOrder() {
        const priorityGroup = document.getElementById('priorityGroup');
        const priorities = Array.from(priorityGroup.children);
        
        // Shuffle array
        for (let i = priorities.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [priorities[i], priorities[j]] = [priorities[j], priorities[i]];
        }
        
        // Re-append in new order
        priorities.forEach(priority => {
            priorityGroup.appendChild(priority);
        });
    }
    
    function showInterferenceModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeInterferenceModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Auto-fill demonstration for returning users
    setTimeout(() => {
        const visitCount = parseInt(localStorage.getItem('jira_visit_count') || '0');
        if (visitCount > 2) {
            // Auto-fill reporter field for frequent users
            const reporterField = document.getElementById('reporter');
            const lastReporter = localStorage.getItem('jira_last_reporter');
            if (lastReporter && Math.random() > 0.5) {
                reporterField.value = lastReporter;
                reporterField.dispatchEvent(new Event('input'));
            }
        }
        localStorage.setItem('jira_visit_count', (visitCount + 1).toString());
    }, 3000);
    
    // Store reporter for future auto-fill
    document.getElementById('reporter').addEventListener('change', function(e) {
        if (e.target.value) {
            localStorage.setItem('jira_last_reporter', e.target.value);
        }
    });
});