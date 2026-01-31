---
title: "Proactive Agents: Key Learnings"
date: "2026-01-28"
type: insight
tags: [agents, automation, lessons]
---

# Proactive Agents: Key Learnings

After building and deploying the autonomous CEO system, here are the critical insights:

## What Works

### 1. Cron-Based Orchestration
Scheduled agents (vs. always-on) are more reliable and cost-effective:
- Predictable token usage
- Clear execution boundaries
- Easy debugging (one agent at a time)

### 2. File-Based Memory
Using files (data/, memory/, builds/) instead of databases:
- Human-readable outputs
- Easy to inspect and debug
- Git-trackable history
- Works without infrastructure

### 3. Isolated Sessions
Each agent runs in its own context:
- No state contamination
- Clear responsibilities
- Parallel execution possible

## Gotchas to Avoid

### 1. Tool Dependencies
Agents fail silently when tools are missing (Brave API, social APIs). Always validate tool availability before heavy operations.

### 2. Time Zones
Cron schedules must account for PT. Always double-check the actual fire time.

### 3. Output Routing
Make sure agent outputs go somewhere useful—either to files for async review or to messaging channels for real-time alerts.

## Next Steps
- Add inter-agent communication
- Build feedback loops for learning
- Create dashboards for monitoring
