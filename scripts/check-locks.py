#!/usr/bin/env python3
import json, sys, hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[1]
errors=[]; passed=0

# 1) GREEN LOCK checks: behavior/text/assets that may not change without explicit user permission.
locks_path=root/'VivaEuropa-LOCKS.json'
if not locks_path.is_file():
    errors.append('SYSTEM FAIL missing VivaEuropa-LOCKS.json')
else:
    manifest=json.loads(locks_path.read_text(encoding='utf-8'))
    for lock in manifest.get('locks',[]):
        for c in lock.get('checks',[]):
            f=root/c['file']
            kind=c['type']
            ok=False
            if kind=='file_exists':
                ok=f.is_file()
            else:
                if f.is_file():
                    txt=f.read_text(encoding='utf-8',errors='replace')
                    if kind=='contains': ok=c['value'] in txt
                    elif kind=='not_contains': ok=c['value'] not in txt
                    elif kind=='sha256': ok=hashlib.sha256(f.read_bytes()).hexdigest()==c['value']
            if ok: passed+=1
            else: errors.append(f"{lock['id']} FAIL {kind} {c['file']}: {c.get('value','')[:140]}")

# 2) Baseline inventory check: a future FULL snapshot may not silently lose files
# that already existed in the recovered GitHub baseline.
base_path=root/'VivaEuropa-BASELINE-MANIFEST.json'
if not base_path.is_file():
    errors.append('SYSTEM FAIL missing VivaEuropa-BASELINE-MANIFEST.json')
else:
    base=json.loads(base_path.read_text(encoding='utf-8'))
    for rel in base.get('required_paths',[]):
        ok=(root/rel).is_file()
        if ok: passed+=1
        else: errors.append(f"BASELINE INVENTORY FAIL missing required file: {rel}")

if errors:
    print('LOCK CHECK: FAIL')
    print('\n'.join(errors))
    sys.exit(1)
print(f"LOCK CHECK: PASS ({passed} checks incl. GREEN LOCK + baseline inventory)")
