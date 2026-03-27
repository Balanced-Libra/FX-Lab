# Agent Role Definitions

_Last updated: 2026-03-27_

These are the specialist sub-agents the Coordinator spawns. Each section defines what the agent does, what tools it uses, and what it returns.

---

## Bug Hunter

**When to spawn**: Daily health check, or when MEMORY.md lists known issues.

**Task**: Scan all `js/effects/*.js` files for:
- Missing `teardown()` method
- `teardown()` that doesn't cancel all rAFs/intervals/observers
- Missing `async load()` method
- Missing required fields: id, name, type, tags, perf, description
- Missing `window.EFFECTS_REGISTRY.registerEffect(...)` at end of file
- Effects that use `document.getElementById` or `document.body` (should only use `container`)
- `console.log` debug statements left in
- Any obvious JS syntax errors

**Returns**: A list of files with issues and what specifically is wrong.

**Handoff**: Pass findings to Code Quality agent to fix.

---

## Effect Researcher

**When to spawn**: Weekly Monday run, or when roadmap.md has no candidates in queue.

**Task**:
1. Check `.claude/effects-catalog.md` for queued candidates
2. Pick 1-2 high-priority candidates
3. Research the technique (web search if needed)
4. Draft a complete implementation following `standards.md`
5. Test the implementation mentally (does init/teardown contract hold?)

**Returns**: Complete effect file(s) ready to write to `js/effects/`.

**Sources**: CodePen, CSS-Tricks, Codrops, Shadertoy, web.dev, MDN

---

## Code Quality Agent

**When to spawn**: After Bug Hunter reports issues, or during standards audit.

**Task**:
- Apply fixes from Bug Hunter report
- Standardize effect shape to match `standards.md`
- Add missing vibe tags
- Rewrite jargon-heavy descriptions in plain English
- Ensure filename matches id

**Returns**: Fixed file contents. Commits changes with message: `[agency] fix: <description>`

---

## UI Designer

**When to spawn**: Monthly UI audit, or when card previews need work.

**Task**:
- Improve `index.html` structure and `styles.css`
- Implement/improve card hover preview system
- Add/improve category navigation
- Ensure mobile responsiveness
- Check dark/light theme consistency

**Constraints**:
- No new dependencies
- Do not break existing JS/app.js logic
- Keep code copy button (secondary, for owner)
- Visual-first for non-technical clients

**Returns**: Updated index.html and/or styles.css. Commits changes.

---

## Knowledge Acquirer

**When to spawn**: Weekly Wednesday run.

**Task**:
1. Web-search for new CSS/WebGL/Canvas techniques published recently
2. Check CSS-Tricks, web.dev, Codrops, Shadertoy for notable new work
3. Distill findings into `.claude/knowledge/*.md` docs
4. If a technique is significant enough, add to `standards.md`
5. Add promising effects to `effects-catalog.md` queue

**Returns**: Updated knowledge docs and/or catalog entries. Commits with: `[agency] knowledge: <topic>`

---

## Scribe

**When to spawn**: End of every work session.

**Task**:
- Write a dated log entry to `.claude/logs/YYYY-MM-DD.md`
- Update `.claude/MEMORY.md` with what changed
- Update `.claude/roadmap.md` to check off completed items
- Update effect count in MEMORY.md if effects were added/removed

**Returns**: Updated memory files. Commits with: `[agency] memory: update after <session description>`
