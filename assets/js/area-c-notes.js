// Area C Notes JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const notesArea = document.getElementById('notesArea');
    const wordCountElement = document.getElementById('wordCount');
    const charCountElement = document.getElementById('charCount');
    const loadCommentsBtn = document.getElementById('loadComments');
    const commentsSection = document.getElementById('commentsSection');
    const clearNotesBtn = document.getElementById('clearNotes');
    const exportNotesBtn = document.getElementById('exportNotes');
    
    // Initialize features
    setupNotesTaking();
    setupCommentsLoading();
    setupTextSelection();
    setupClipboardEnhancement();
    
    function setupNotesTaking() {
        // Update word and character counts
        function updateStats() {
            const text = notesArea.value;
            const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
            const charCount = text.length;
            
            wordCountElement.textContent = `${wordCount} words`;
            charCountElement.textContent = `${charCount} characters`;
        }
        
        notesArea.addEventListener('input', updateStats);
        notesArea.addEventListener('paste', () => setTimeout(updateStats, 100));
        
        // Clear notes functionality
        clearNotesBtn.addEventListener('click', function() {
            if (notesArea.value.trim() && confirm('Are you sure you want to clear all notes?')) {
                notesArea.value = '';
                updateStats();
                notesArea.focus();
            }
        });
        
        // Export notes functionality
        exportNotesBtn.addEventListener('click', function() {
            const notes = notesArea.value;
            if (!notes.trim()) {
                alert('No notes to export!');
                return;
            }
            
            // Create a blob with the notes content
            const blob = new Blob([notes], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            // Create a temporary download link
            const a = document.createElement('a');
            a.href = url;
            a.download = `infohub-notes-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
        
        // Auto-save notes to localStorage
        notesArea.addEventListener('input', function() {
            localStorage.setItem('infohub_notes', notesArea.value);
        });
        
        // Load saved notes
        const savedNotes = localStorage.getItem('infohub_notes');
        if (savedNotes) {
            notesArea.value = savedNotes;
            updateStats();
        }
    }
    
    function setupCommentsLoading() {
        loadCommentsBtn.addEventListener('click', function() {
            // Simulate loading delay
            loadCommentsBtn.textContent = 'Loading...';
            loadCommentsBtn.disabled = true;
            
            setTimeout(() => {
                commentsSection.style.display = 'block';
                loadCommentsBtn.style.display = 'none';
                
                // Add some dynamic comments
                const additionalComment = document.createElement('div');
                additionalComment.className = 'comment';
                additionalComment.innerHTML = `
                    <div class="comment-author">TechEnthusiast</div>
                    <div class="comment-content">This article helped me understand WASM implementation in my current project. The examples are very practical.</div>
                `;
                commentsSection.appendChild(additionalComment);
            }, 1500);
        });
    }
    
    function setupTextSelection() {
        const articleContent = document.querySelector('.article-content');
        
        // Enhanced selection detection
        document.addEventListener('mouseup', function() {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            
            if (selectedText.length > 10) { // Only process meaningful selections
                setTimeout(() => {
                    handleTextSelection(selectedText, selection);
                }, 100);
            }
        });
        
        function handleTextSelection(text, selection) {
            // Get metadata from the selected element
            const range = selection.getRangeAt(0);
            const container = range.commonAncestorContainer;
            const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
            
            // Find the closest element with metadata
            let metadataElement = element;
            while (metadataElement && !metadataElement.hasAttribute('data-metadata')) {
                metadataElement = metadataElement.parentElement;
                if (metadataElement === document.body) {
                    metadataElement = null;
                    break;
                }
            }
            
            // Extract metadata if available
            let metadata = '';
            if (metadataElement) {
                const metadataAttr = metadataElement.getAttribute('data-metadata');
                metadata = parseMetadata(metadataAttr);
            }
            
            // Store enhanced clipboard data
            const enhancedData = {
                text: text,
                metadata: metadata,
                timestamp: new Date().toISOString(),
                source: 'InfoHub - WebAssembly Article'
            };
            
            localStorage.setItem('infohub_last_selection', JSON.stringify(enhancedData));
            
            // Visual feedback
            showSelectionFeedback(text.substring(0, 50) + (text.length > 50 ? '...' : ''));
        }
        
        function parseMetadata(metadataString) {
            const metadata = {};
            if (metadataString) {
                const pairs = metadataString.split(',');
                pairs.forEach(pair => {
                    const [key, value] = pair.split(':').map(s => s.trim());
                    if (key && value) {
                        metadata[key] = value;
                    }
                });
            }
            return metadata;
        }
        
        function showSelectionFeedback(previewText) {
            // Create temporary feedback element
            const feedback = document.createElement('div');
            feedback.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--notion-blue);
                color: white;
                padding: 12px 16px;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 1000;
                max-width: 300px;
                font-size: 14px;
                transition: all 0.3s ease;
            `;
            feedback.innerHTML = `
                <div style="font-weight: 600; margin-bottom: 4px;">📋 Text Selected</div>
                <div style="opacity: 0.9; font-size: 12px;">"${previewText}"</div>
            `;
            
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                feedback.style.opacity = '0';
                feedback.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    document.body.removeChild(feedback);
                }, 300);
            }, 2000);
        }
    }
    
    function setupClipboardEnhancement() {
        // Enhanced paste functionality
        notesArea.addEventListener('paste', function(e) {
            // Check if we have enhanced clipboard data
            const lastSelection = localStorage.getItem('infohub_last_selection');
            if (lastSelection) {
                try {
                    const data = JSON.parse(lastSelection);
                    
                    // If the pasted text matches our stored selection, enhance it
                    setTimeout(() => {
                        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
                        if (pastedText.trim() === data.text.trim()) {
                            enhancePastedContent(data);
                        }
                    }, 100);
                } catch (error) {
                    console.log('Error parsing selection data:', error);
                }
            }
        });
        
        function enhancePastedContent(data) {
            const currentValue = notesArea.value;
            const cursorPos = notesArea.selectionStart;
            
            // Find the recently pasted text
            const beforeCursor = currentValue.substring(0, cursorPos);
            const afterCursor = currentValue.substring(cursorPos);
            
            // Create enhanced version with metadata
            let enhancedContent = data.text;
            
            if (Object.keys(data.metadata).length > 0) {
                enhancedContent += '\n\n[Metadata: ';
                const metadataEntries = Object.entries(data.metadata).map(([key, value]) => `${key}: ${value}`);
                enhancedContent += metadataEntries.join(', ') + ']';
            }
            
            enhancedContent += `\n[Source: ${data.source}, ${new Date(data.timestamp).toLocaleString()}]`;
            
            // Find where the original text was pasted and replace it
            const originalTextIndex = beforeCursor.lastIndexOf(data.text);
            if (originalTextIndex !== -1) {
                const newValue = beforeCursor.substring(0, originalTextIndex) + enhancedContent + afterCursor;
                notesArea.value = newValue;
                
                // Position cursor at the end of the enhanced content
                const newCursorPos = originalTextIndex + enhancedContent.length;
                notesArea.setSelectionRange(newCursorPos, newCursorPos);
                
                // Trigger input event to update stats
                notesArea.dispatchEvent(new Event('input'));
                
                // Show enhancement notification
                showEnhancementFeedback();
            }
        }
        
        function showEnhancementFeedback() {
            const feedback = document.createElement('div');
            feedback.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: var(--notion-green);
                color: white;
                padding: 12px 16px;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 1000;
                font-size: 14px;
                font-weight: 600;
                transition: all 0.3s ease;
            `;
            feedback.innerHTML = '✨ Content Enhanced with Metadata';
            
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                feedback.style.opacity = '0';
                feedback.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    document.body.removeChild(feedback);
                }, 300);
            }, 3000);
        }
    }
    
    // Add some random classes for testing CSS selector robustness
    setTimeout(() => {
        addRandomClasses();
    }, 2000);
    
    function addRandomClasses() {
        const elements = [notesArea, clearNotesBtn, exportNotesBtn, loadCommentsBtn];
        elements.forEach(el => {
            if (el) {
                const randomClass = 'enhanced-' + Math.random().toString(36).substr(2, 5);
                el.classList.add(randomClass);
            }
        });
    }
});