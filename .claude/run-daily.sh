#!/usr/bin/env bash
# FX-Lab Agency — Local daily runner
# Usage: bash .claude/run-daily.sh
# Or add to crontab: 0 22 * * * cd /path/to/FX-Lab && bash .claude/run-daily.sh >> ~/.fx-lab-agency.log 2>&1

set -e
cd "$(dirname "$0")/.."

PROMPT="You are the FX-Lab Agency Coordinator. The repo is at $(pwd). Read CLAUDE.md, then .claude/MEMORY.md, then .claude/roadmap.md. Run today's automated tasks: (1) Bug Hunter — scan all js/effects/*.js for missing teardown, missing required fields, broken patterns; fix any issues found and commit with format '[agency] fix: description'. (2) Work on the highest-priority pending item in .claude/roadmap.md. (3) Update .claude/MEMORY.md with what was done and write a log entry to .claude/logs/$(date +%Y-%m-%d).md. (4) Push all commits with: git push -u origin HEAD"

echo "[$(date)] Starting FX-Lab Agency daily run..."
claude -p "$PROMPT" --dangerouslySkipPermissions
echo "[$(date)] Daily run complete."
