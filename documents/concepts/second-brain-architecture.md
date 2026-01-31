---
title: "Second Brain Architecture"
date: "2026-01-29"
type: concept
tags: [architecture, knowledge-management, second-brain]
---

# Second Brain Architecture

## Overview

The Second Brain is a personal knowledge management system that captures and organizes insights from AI-human conversations.

## Core Principles

### 1. Auto-Population
Documents are created automatically from conversations—no manual entry required. Max extracts key concepts, decisions, and insights in real-time.

### 2. Structured Storage
All documents are Markdown with YAML frontmatter for metadata:

```markdown
---
title: "Document Title"
date: "2026-01-29"
type: concept | daily | project | insight
tags: [topic, another]
---

# Content here...
```

### 3. Four Document Types

| Type | Purpose | Example |
|------|---------|---------|
| **Daily** | Journal entries | "What we discussed today" |
| **Concept** | Important ideas | "How autonomous agents work" |
| **Project** | Active work | "Digital Helper Agency" |
| **Insight** | Key learnings | "What worked and what didn't" |

### 4. Tag-Based Discovery
Tags enable cross-referencing between documents. A concept about "agents" can link to a project using agents and insights learned from building them.

## Technical Architecture

```
second-brain/
├── documents/           # All content (Markdown)
│   ├── concepts/       
│   ├── daily/          
│   ├── projects/       
│   └── insights/       
├── app/                 # NextJS frontend
├── lib/                 # Utilities
└── components/          # React components
```

## Data Flow

1. **Conversation happens** → Max identifies important content
2. **Document created** → Markdown file in appropriate folder
3. **UI updates** → NextJS app reflects new content
4. **Discovery** → Search, tags, and browsing surface knowledge

## Future Enhancements

- [ ] Full-text search with embeddings
- [ ] Bi-directional linking (like Obsidian)
- [ ] Graph visualization of connections
- [ ] API for programmatic access
- [ ] Mobile app
