// Area B Search JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchQuery = document.getElementById('searchQuery');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    
    // Handle search form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchQuery.value.trim();
        if (query) {
            // Store search query for results page
            localStorage.setItem('paperfinder_query', query);
            window.location.href = `results.html?query=${encodeURIComponent(query)}`;
        }
    });
    
    // Handle suggestion tag clicks
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const query = this.getAttribute('data-query');
            searchQuery.value = query;
            localStorage.setItem('paperfinder_query', query);
            window.location.href = `results.html?query=${encodeURIComponent(query)}`;
        });
    });
    
    // Auto-focus search input
    searchQuery.focus();
    
    // Add random classes for testing CSS selector robustness
    setTimeout(() => {
        addRandomClasses();
    }, 1000);
    
    function addRandomClasses() {
        const elements = [searchQuery, ...suggestionTags];
        elements.forEach(el => {
            const randomClass = 'search-' + Math.random().toString(36).substr(2, 5);
            el.classList.add(randomClass);
        });
    }
});