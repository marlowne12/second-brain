# 🧠 Second Brain

A personal knowledge management system that feels like a mix of Obsidian and Linear.

## Structure

```
second-brain/
├── documents/          # All viewable docs (created from conversations)
│   ├── concepts/       # Important concepts we explore
│   ├── daily/          # Daily journal entries
│   ├── projects/       # Project documentation
│   └── insights/       # Key learnings and insights
├── app/                # NextJS app
└── README.md
```

## How It Works

1. **Auto-Generated Content**: As we work together, I create documents in `documents/` capturing important concepts, decisions, and insights.

2. **Daily Journals**: Every day, a journal entry is created summarizing our discussions at a high level.

3. **Viewable UI**: The NextJS app provides a clean, searchable interface to browse all documents.

## Document Format

All documents are Markdown with YAML frontmatter:

```markdown
---
title: "Document Title"
date: "2026-01-28"
type: concept | daily | project | insight
tags: [ai, automation, workflow]
---

# Content here...
```

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

*Built by Max for Marlon's second brain.*
