// Area B Paper Details JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const paperId = parseInt(urlParams.get('id')) || 1;
    
    // Randomly choose layout variant
    chooseLayoutVariant();
    
    // Load paper data
    loadPaperData(paperId);
    
    // Setup event listeners
    setupEventListeners();
    
    function chooseLayoutVariant() {
        const variants = ['paper-variant-a.css', 'paper-variant-b.css'];
        const randomVariant = variants[Math.floor(Math.random() * variants.length)];
        document.getElementById('paperStyle').href = `../assets/css/${randomVariant}`;
    }
    
    function loadPaperData(id) {
        const papers = JSON.parse(localStorage.getItem('paperfinder_papers') || '[]');
        const paper = papers.find(p => p.id === id) || papers[0] || generateDefaultPaper(id);
        
        // Populate paper details
        document.getElementById('paperTitle').textContent = paper.title;
        document.getElementById('paperDate').textContent = paper.year;
        
        // Authors
        const authorsElement = document.getElementById('paperAuthors');
        authorsElement.innerHTML = paper.authors.map(author => 
            `<span class="author">${author}</span>`
        ).join('');
        
        // Journal
        const journalElement = document.getElementById('paperJournal');
        journalElement.innerHTML = `<strong>Published in:</strong> <span>${paper.journal}</span>`;
        
        // Abstract
        document.getElementById('paperAbstract').textContent = paper.abstract;
        
        // Keywords
        const keywordList = document.getElementById('keywordList');
        keywordList.innerHTML = paper.keywords.map(keyword => 
            `<span class="keyword">${keyword}</span>`
        ).join('');
        
        // Stats
        document.getElementById('citationCount').textContent = paper.citations;
        document.getElementById('downloadCount').textContent = paper.downloads;
        document.getElementById('viewCount').textContent = paper.views;
        
        // Generate references
        generateReferences();
        
        // Generate related papers
        generateRelatedPapers(paper);
    }
    
    function generateDefaultPaper(id) {
        return {
            id: id,
            title: "Advanced Machine Learning Techniques in Modern Applications",
            authors: ["Dr. Jane Smith", "Prof. John Doe"],
            journal: "Journal of Artificial Intelligence",
            year: "2024",
            citations: 85,
            downloads: 542,
            views: 2341,
            abstract: "This paper explores advanced machine learning techniques and their applications in modern software systems. We present novel approaches to deep learning, natural language processing, and computer vision that demonstrate significant improvements over existing methods.",
            keywords: ["machine learning", "deep learning", "neural networks", "AI", "algorithms"]
        };
    }
    
    function generateReferences() {
        const referenceList = document.getElementById('referenceList');
        const references = [
            "Smith, J., & Johnson, M. (2023). Fundamentals of Deep Learning Architecture. Nature Machine Intelligence, 15(3), 123-145.",
            "Chen, L., Wang, K., & Liu, R. (2024). Scalable Machine Learning Systems. ACM Computing Surveys, 28(2), 67-89.",
            "Rodriguez, A., & Thompson, E. (2023). Privacy-Preserving AI Algorithms. IEEE Transactions on Information Theory, 45(7), 234-256.",
            "Park, S., Kim, D., & Lee, H. (2024). Quantum Machine Learning Applications. Physical Review Letters, 112(4), 178-192.",
            "Garcia, M., Brown, T., & Davis, C. (2023). Federated Learning in Distributed Systems. Journal of Parallel Computing, 39(8), 445-467."
        ];
        
        referenceList.innerHTML = references.map((ref, index) => 
            `<div class="reference-item">[${index + 1}] ${ref}</div>`
        ).join('');
    }
    
    function generateRelatedPapers(currentPaper) {
        const relatedPapers = document.getElementById('relatedPapers');
        const relatedTitles = [
            "Efficient Neural Network Training Methods",
            "Scalability in Modern AI Systems",
            "Privacy-Preserving Machine Learning",
            "Quantum Computing and AI Integration",
            "Real-time Processing in ML Applications"
        ];
        
        relatedPapers.innerHTML = relatedTitles.map(title => `
            <div class="related-paper">
                <h4>${title}</h4>
                <p>A comprehensive study exploring related methodologies and applications.</p>
            </div>
        `).join('');
    }
    
    function setupEventListeners() {
        const exportBtn = document.getElementById('exportCitation');
        const downloadBtn = document.getElementById('downloadPdf');
        const citationSuccess = document.getElementById('citationSuccess');
        
        // Export citation functionality
        exportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate citation export
            const paperTitle = document.getElementById('paperTitle').textContent;
            const authors = Array.from(document.getElementById('paperAuthors').querySelectorAll('.author'))
                .map(el => el.textContent).join(', ');
            const year = document.getElementById('paperDate').textContent;
            
            const citation = `${authors} (${year}). ${paperTitle}. Retrieved from PaperFinder Academic Database.`;
            
            // Simulate copying to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(citation).then(() => {
                    showCitationSuccess();
                });
            } else {
                // Fallback for older browsers
                showCitationSuccess();
            }
        });
        
        // Download PDF button (similar functionality to test disambiguation)
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('PDF download feature is not available in this demo.');
        });
        
        // Add random classes for testing CSS selector robustness
        setTimeout(() => {
            addRandomClasses();
        }, 1000);
        
        function showCitationSuccess() {
            citationSuccess.style.display = 'flex';
            setTimeout(() => {
                citationSuccess.style.display = 'none';
            }, 3000);
        }
        
        function addRandomClasses() {
            const elements = [exportBtn, downloadBtn];
            elements.forEach(el => {
                const randomClass = 'btn-' + Math.random().toString(36).substr(2, 5);
                el.classList.add(randomClass);
            });
        }
    }
});