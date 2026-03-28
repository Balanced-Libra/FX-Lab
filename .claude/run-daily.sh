#!/usr/bin/env bash
# FX-Lab Agency — Local daily runner using opencode + Gemini Flash (free)
#
# Setup:
#   1. Install opencode: bun install -g opencode-ai@latest  (or npm install -g opencode-ai@latest)
#   2. Get a free Gemini API key at https://aistudio.google.com
#   3. export GOOGLE_GENERATIVE_AI_API_KEY="your-key-here"  (add to ~/.zshrc or ~/.bashrc)
#   4. opencode will auto-use Gemini Flash via ~/.config/opencode/opencode.json
#
# Add to crontab (crontab -e):
#   0 22 * * * cd /path/to/FX-Lab && bash .claude/run-daily.sh >> ~/.fx-lab-agency.log 2>&1

set -e
cd "$(dirname "$0")/.."

# Ensure opencode config exists with Gemini Flash
mkdir -p ~/.config/opencode
if [ ! -f ~/.config/opencode/opencode.json ]; then
  echo '{"$schema":"https://opencode.ai/config.json","model":"google/gemini-2.0-flash","autoshare":false}' \
    > ~/.config/opencode/opencode.json
fi

PROMPT="You are the FX-Lab Agency Coordinator. The repo is at $(pwd). Read CLAUDE.md, then .claude/MEMORY.md, then .claude/roadmap.md. Run today's automated tasks: (1) Bug Hunter — scan all js/effects/*.js for missing teardown, missing required fields, broken patterns; fix any issues found and commit with format '[agency] fix: description'. (2) Work on the highest-priority pending item in .claude/roadmap.md. (3) Update .claude/MEMORY.md with what was done and write a log entry to .claude/logs/$(date +%Y-%m-%d).md. (4) Push all commits with: git push origin HEAD"

echo "[$(date)] Starting FX-Lab Agency daily run (opencode + Gemini Flash)..."
opencode -p "$PROMPT" -q
echo "[$(date)] Daily run complete."
