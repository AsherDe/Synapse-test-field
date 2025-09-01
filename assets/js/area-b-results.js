// Area B Results JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query') || localStorage.getItem('paperfinder_query') || 'machine learning';
    
    // Update page title and search info
    document.getElementById('resultsTitle').textContent = `About "${query}"`;
    document.getElementById('resultsCount').textContent = `Found 10 papers for "${query}"`;
    document.getElementById('searchQuerySmall').value = query;
    
    // Generate fake papers data
    const papers = generatePapers(query);
    
    // Render results
    renderResults(papers);
    
    // Add event listeners
    setupEventListeners();
    
    function generatePapers(searchQuery) {
        const paperTemplates = [
            {
                titleTemplate: "Deep Learning Approaches to {query}: A Comprehensive Survey",
                authors: ["Dr. Sarah Chen", "Prof. Michael Johnson", "Dr. Lisa Wang"],
                journal: "Journal of Machine Learning Research",
                year: "2024",
                citations: 127,
                abstract: "This paper presents a comprehensive survey of deep learning approaches applied to {query}. We review recent advances and identify key challenges..."
            },
            {
                titleTemplate: "Automated {query} Using Reinforcement Learning",
                authors: ["Prof. David Miller", "Dr. Anna Rodriguez"],
                journal: "Nature Machine Intelligence",
                year: "2023",
                citations: 89,
                abstract: "We propose a novel reinforcement learning framework for automated {query} that achieves state-of-the-art performance..."
            },
            {
                titleTemplate: "Scalable {query} in Large-Scale Systems",
                authors: ["Dr. Kevin Zhang", "Prof. Emma Thompson", "Dr. James Liu"],
                journal: "ACM Computing Surveys",
                year: "2024",
                citations: 156,
                abstract: "This work addresses the challenges of implementing {query} in large-scale distributed systems..."
            },
            {
                titleTemplate: "Novel Algorithms for {query} Optimization",
                authors: ["Dr. Maria Garcia", "Prof. Robert Kim"],
                journal: "IEEE Transactions on Pattern Analysis",
                year: "2023",
                citations: 73,
                abstract: "We introduce a family of novel algorithms designed to optimize {query} performance in real-time applications..."
            },
            {
                titleTemplate: "A Comparative Study of {query} Methodologies",
                authors: ["Prof. Alex Turner", "Dr. Sophie Anderson", "Dr. Carlos Mendez"],
                journal: "Computer Science Review",
                year: "2024",
                citations: 94,
                abstract: "This comparative study evaluates different methodologies for {query} across various domains and datasets..."
            },
            {
                titleTemplate: "Privacy-Preserving {query} Framework",
                authors: ["Dr. Jennifer Park", "Prof. Thomas Brown"],
                journal: "ACM Transactions on Privacy and Security",
                year: "2023",
                citations: 82,
                abstract: "We present a novel framework that enables {query} while preserving user privacy through advanced cryptographic techniques..."
            },
            {
                titleTemplate: "Real-time {query} for Edge Computing",
                authors: ["Dr. Ryan Lee", "Prof. Amy Chen", "Dr. Mark Wilson"],
                journal: "IEEE Internet of Things Journal",
                year: "2024",
                citations: 67,
                abstract: "This paper explores real-time {query} solutions optimized for resource-constrained edge computing environments..."
            },
            {
                titleTemplate: "Quantum-Enhanced {query} Algorithms",
                authors: ["Prof. Julia Martinez", "Dr. Peter Jackson"],
                journal: "Nature Quantum Information",
                year: "2024",
                citations: 45,
                abstract: "We investigate how quantum computing can enhance traditional {query} algorithms, demonstrating significant speedups..."
            },
            {
                titleTemplate: "Federated Learning for {query}",
                authors: ["Dr. Helen Wu", "Prof. Chris Davis", "Dr. Nina Patel"],
                journal: "Machine Learning Journal",
                year: "2023",
                citations: 118,
                abstract: "This work proposes a federated learning approach to {query} that enables collaborative model training without data sharing..."
            },
            {
                titleTemplate: "Explainable AI in {query} Applications",
                authors: ["Prof. Daniel Kim", "Dr. Rachel Green"],
                journal: "AI Ethics Journal",
                year: "2024",
                citations: 91,
                abstract: "We develop explainable AI techniques specifically tailored for {query} applications, improving transparency and trust..."
            }
        ];
        
        // Shuffle the array to randomize order each time
        const shuffled = paperTemplates.sort(() => Math.random() - 0.5);
        
        return shuffled.map((template, index) => ({
            id: index + 1,
            title: template.titleTemplate.replace(/{query}/g, searchQuery),
            authors: template.authors,
            journal: template.journal,
            year: template.year,
            citations: template.citations + Math.floor(Math.random() * 20),
            abstract: template.abstract.replace(/{query}/g, searchQuery),
            keywords: generateKeywords(searchQuery),
            downloads: Math.floor(Math.random() * 1000) + 100,
            views: Math.floor(Math.random() * 5000) + 500
        }));
    }
    
    function generateKeywords(query) {
        const baseKeywords = query.split(' ');
        const additionalKeywords = ['algorithms', 'optimization', 'neural networks', 'data analysis', 'performance', 'evaluation'];
        const randomAdditional = additionalKeywords.sort(() => Math.random() - 0.5).slice(0, 3);
        return [...baseKeywords, ...randomAdditional];
    }
    
    function renderResults(papers) {
        const resultsList = document.getElementById('resultsList');
        resultsList.innerHTML = '';
        
        papers.forEach(paper => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <div class="result-header">
                    <h3 class="result-title">
                        <a href="paper.html?id=${paper.id}" target="_blank">${paper.title}</a>
                    </h3>
                    <div class="result-authors">
                        ${paper.authors.join(', ')}
                    </div>
                </div>
                <div class="result-meta">
                    <span>${paper.journal}</span>
                    <span>${paper.year}</span>
                    <span>${paper.citations} citations</span>
                </div>
                <div class="result-abstract">
                    ${paper.abstract}
                </div>
                <div class="result-tags">
                    ${paper.keywords.map(keyword => `<span class="result-tag">${keyword}</span>`).join('')}
                </div>
            `;
            resultsList.appendChild(resultItem);
        });
        
        // Store papers data for individual paper pages
        localStorage.setItem('paperfinder_papers', JSON.stringify(papers));
    }
    
    function setupEventListeners() {
        // Small search bar
        const searchBarSmall = document.getElementById('searchQuerySmall');
        const searchBtnSmall = document.querySelector('.search-btn-small');
        
        function performSearch() {
            const newQuery = searchBarSmall.value.trim();
            if (newQuery) {
                localStorage.setItem('paperfinder_query', newQuery);
                window.location.href = `results.html?query=${encodeURIComponent(newQuery)}`;
            }
        }
        
        searchBtnSmall.addEventListener('click', performSearch);
        searchBarSmall.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Sort and filter functionality
        document.getElementById('sortBy').addEventListener('change', function() {
            // In a real app, this would re-sort results
            console.log('Sorting by:', this.value);
        });
        
        document.getElementById('yearFilter').addEventListener('change', function() {
            // In a real app, this would filter results
            console.log('Filtering by year:', this.value);
        });
    }
});