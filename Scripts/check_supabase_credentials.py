#!/usr/bin/env python3
"""Targeted Supabase credential check. Never print matched values or source lines."""
import base64
import json
import re
import subprocess
import sys
from pathlib import Path

JWT = re.compile(r'eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+')
SECRET = re.compile(r'\bsb_secret_[A-Za-z0-9_-]{16,}')
ASSIGNMENT = re.compile(r'''^[ \t]*(?:export[ \t]+)?["']?(?:SUPABASE_JWT_SECRET|SUPABASE_SERVICE_ROLE_KEY|SUPABASE_SECRET_KEY)["']?[ \t]*[:=][ \t]*(.*?)[ \t]*,?[ \t]*$''', re.M)

def findings(text):
    results = set()
    for match in JWT.finditer(text):
        try:
            payload = match.group().split('.')[1]
            claims = json.loads(base64.urlsafe_b64decode(payload + '=' * (-len(payload) % 4)))
            if isinstance(claims, dict) and claims.get('role') == 'service_role':
                results.add((text.count('\n', 0, match.start()) + 1, 'privileged-jwt'))
        except (ValueError, UnicodeError):
            pass
    for match in SECRET.finditer(text):
        results.add((text.count('\n', 0, match.start()) + 1, 'secret-api-key'))
    for match in ASSIGNMENT.finditer(text):
        value = match.group(1).split(' #', 1)[0].strip().strip('\"\'')
        if value and value != 'REPLACE_ME':
            results.add((text.count('\n', 0, match.start()) + 1, 'nonempty-privileged-setting'))
    return sorted(results)

def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve()
    try:
        raw = subprocess.check_output(['git', '-C', str(root), 'ls-files', '-z'], stderr=subprocess.DEVNULL)
        paths = [Path(p.decode()) for p in raw.split(b'\0') if p]
        if not paths:
            raise ValueError('No tracked files')
        count = 0
        for relative in paths:
            path = root / relative
            if path.is_symlink():
                continue
            for line, rule in findings(path.read_bytes().decode('utf-8', errors='replace')):
                print(json.dumps({'file': str(relative), 'line': line, 'rule': rule}))
                count += 1
        print(json.dumps({'tracked_paths': len(paths), 'findings': count, 'scope': 'working tree, tracked files only'}))
        return 1 if count else 0
    except (OSError, ValueError, subprocess.CalledProcessError):
        print('Credential check could not complete; no source content emitted.', file=sys.stderr)
        return 2

if __name__ == '__main__':
    sys.exit(main())
