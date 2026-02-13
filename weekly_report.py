#!/usr/bin/env python3
"""Generate a weekly work report for Apple Notes.

This is intentionally simple and local-only:
- Summarizes modern-template activity from the last 7 days.
- Uses (1) modern-template/WORKLOG.md sections and (2) git log.

Outputs plain text to stdout.
"""

from __future__ import annotations

import re
import subprocess
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

KST = ZoneInfo("Asia/Seoul")

WORKSPACE = Path("/Users/johyeonchang/.openclaw/workspace")
REPO = WORKSPACE / "modern-template"
WORKLOG = REPO / "WORKLOG.md"


def run(cmd: list[str]) -> str:
    return subprocess.check_output(cmd, cwd=str(REPO), text=True, stderr=subprocess.STDOUT)


@dataclass
class Section:
    header: str
    date: datetime | None
    body: str


HEADER_RE = re.compile(r"^##\s+(\d{4}-\d{2}-\d{2})(?:\s*\([^)]*\))?(?:\s+(\d{2}:\d{2}))?\s*(?:-\s*)?(.*)$")


def parse_worklog(md: str) -> list[Section]:
    lines = md.splitlines()
    sections: list[Section] = []
    cur_header = None
    cur_date: datetime | None = None
    cur_body: list[str] = []

    def flush():
        nonlocal cur_header, cur_date, cur_body
        if cur_header is not None:
            sections.append(Section(cur_header, cur_date, "\n".join(cur_body).strip()))
        cur_header, cur_date, cur_body = None, None, []

    for line in lines:
        m = HEADER_RE.match(line)
        if m:
            flush()
            ymd, hhmm, rest = m.group(1), m.group(2), m.group(3)
            cur_header = line.strip()
            try:
                if hhmm:
                    cur_date = datetime.strptime(f"{ymd} {hhmm}", "%Y-%m-%d %H:%M").replace(tzinfo=KST)
                else:
                    cur_date = datetime.strptime(ymd, "%Y-%m-%d").replace(tzinfo=KST)
            except Exception:
                cur_date = None
            cur_body = []
        else:
            if cur_header is not None:
                cur_body.append(line)

    flush()
    return sections


def main() -> None:
    now = datetime.now(KST)
    since = now - timedelta(days=7)

    print(f"📋 주간업무보고 (최근 7일) — {since:%Y-%m-%d} ~ {now:%Y-%m-%d}")
    print()

    # 1) WORKLOG.md sections
    if WORKLOG.exists():
        md = WORKLOG.read_text(encoding="utf-8", errors="replace")
        sections = parse_worklog(md)
        recent = [s for s in sections if (s.date is None or s.date >= since)]

        print("[modern-template WORKLOG]")
        if not recent:
            print("- (최근 7일 기록 없음)")
        else:
            for s in recent[:15]:
                print(f"- {s.header}")
        print()
    else:
        print("[modern-template WORKLOG]")
        print("- WORKLOG.md 파일이 없습니다.")
        print()

    # 2) Git log
    print("[modern-template git log]")
    try:
        out = run(["git", "log", "--oneline", f"--since={since.isoformat()}"])
        out = out.strip()
        if out:
            for line in out.splitlines()[:30]:
                print(f"- {line}")
        else:
            print("- (최근 7일 커밋 없음)")
    except Exception as e:
        print(f"- git log 실패: {e}")


if __name__ == "__main__":
    main()
