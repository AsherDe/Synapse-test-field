# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Synapse A/B Testing Platform** - a comprehensive testing ground for browser automation plugins. The platform consists of three simulation areas designed to test different types of automation capabilities:

- **Area A**: Jira Task System (FormFiller plugin testing)
- **Area B**: Academic Paper Finder (WorkflowCloner plugin testing)  
- **Area C**: Blog & Notes System (ClipboardEnhancer plugin testing)

## Architecture Overview

### File Structure
```
/
├── index.html                    # Main landing page
├── area-a/                      # Jira simulation
│   ├── login.html               # Login page with auto-fill testing
│   ├── dashboard.html           # Main dashboard
│   ├── create-task.html         # Form filling test page
│   └── success.html             # Task creation confirmation
├── area-b/                      # Academic paper simulation
│   ├── search.html              # Paper search interface
│   ├── results.html             # Search results with multiple tabs
│   └── paper.html               # Individual paper pages
├── area-c/                      # Blog & notes simulation
│   └── notes.html               # Dual-pane article/notes layout
├── assets/
│   ├── css/
│   │   ├── main.css             # Landing page styles
│   │   ├── area-a.css           # Jira simulation styles
│   │   ├── area-b.css           # Paper finder styles
│   │   ├── area-c.css           # Notes system styles
│   │   ├── paper-variant-a.css  # Layout variant A
│   │   └── paper-variant-b.css  # Layout variant B
│   └── js/
│       ├── area-a-*.js          # Jira functionality
│       ├── area-b-*.js          # Paper finder functionality
│       └── area-c-*.js          # Notes functionality
```

### Design System
All areas use a **Notion-inspired design system** with consistent:
- Color variables (--notion-bg, --notion-text, --notion-blue, etc.)
- Typography (Apple system fonts)
- Component styling (buttons, forms, cards)
- Responsive design patterns

### Key Features for Testing

#### Interference Elements (Built-in Robustness Testing)
1. **Dynamic CSS classes**: Random class names added to form elements
2. **Layout variants**: Multiple CSS variants for button positioning
3. **Element reordering**: Priority options randomized on each load
4. **Modal interruptions**: Random survey popups during form filling
5. **DOM changes**: Dynamic comment loading that modifies page structure

#### Data Persistence
- Uses `localStorage` for cross-page state management
- Task counters, user sessions, and form data persist
- Notes auto-save functionality
- Selection metadata capture and enhancement

## Development Commands

This is a static HTML/CSS/JavaScript project that can be served with any web server:

```bash
# Simple Python server
python -m http.server 8000

# Node.js serve
npx serve .

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

## Testing Scenarios

### Area A: Form Filling Automation
- **Target**: Test auto-completion and form filling
- **Key Elements**: Login forms, complex multi-field forms, dropdowns, radio buttons
- **Interference**: Dynamic classes, randomized field order, popup interruptions

### Area B: Workflow Automation  
- **Target**: Test cross-page workflows and tab management
- **Key Elements**: Search → Results → Multiple paper tabs → Citation export
- **Interference**: Randomized result order, varying button positions, similar competing buttons

### Area C: Context-Aware Clipboard
- **Target**: Test intelligent text selection and metadata extraction
- **Key Elements**: Rich text with metadata attributes, copy/paste enhancement
- **Interference**: Complex nested HTML, dynamic content loading