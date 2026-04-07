#!/usr/bin/env python3
"""
Upload knowledge base images and knowledgebase.json to Supabase Storage.

Run once from the project root:
    python scripts/upload-kb-images.py

Requires:
    - requests (included with Anaconda)
    - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY set as environment variables
      (or add them to a .env file in the project root)
"""

import os
import sys
from pathlib import Path

try:
    import requests
except ImportError:
    print("ERROR: requests not found. Run: pip install requests")
    sys.exit(1)

# Try loading .env file if python-dotenv is available
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
BUCKET = "aidqa-kb"

KB_DIR = Path(__file__).parent.parent / "docs" / "Design_knowledgebase"

# Images referenced in knowledgebase.json — these are required for the curated reference set.
# The other images in the folder are not referenced and can be skipped.
IMAGES_TO_UPLOAD = [
    ("williamssonoma.png", "image/png"),
    ("moma.png", "image/png"),
    ("hipcamp.png", "image/png"),
    ("spotify.png", "image/png"),
    ("shopify.png", "image/png"),
]


def upload_file(local_path: Path, storage_path: str, content_type: str) -> bool:
    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET}/{storage_path}"
    headers = {
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
        "Content-Type": content_type,
        "x-upsert": "true",
    }
    with open(local_path, "rb") as f:
        response = requests.put(url, headers=headers, data=f, timeout=60)
    if response.status_code in (200, 201):
        return True
    print(f"  ERROR {response.status_code}: {response.text[:200]}")
    return False


def main():
    if not SUPABASE_URL or not SERVICE_ROLE_KEY:
        print("ERROR: Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.")
        print("  Add them to a .env file in the project root, or export them in your shell.")
        sys.exit(1)

    print(f"Uploading to Supabase bucket: {BUCKET}")
    print(f"Source directory: {KB_DIR}\n")

    errors = 0

    # Upload reference images
    for filename, mime in IMAGES_TO_UPLOAD:
        local_path = KB_DIR / filename
        if not local_path.exists():
            print(f"  SKIP (not found): {filename}")
            continue
        storage_path = f"images/{filename}"
        size_kb = local_path.stat().st_size // 1024
        print(f"  Uploading {filename} ({size_kb}KB) → {storage_path} ...", end=" ", flush=True)
        ok = upload_file(local_path, storage_path, mime)
        print("OK" if ok else "FAILED")
        if not ok:
            errors += 1

    # Upload knowledgebase.json (required for the edge function to load knowledge objects at runtime)
    kb_json = KB_DIR / "knowledgebase.json"
    if kb_json.exists():
        size_kb = kb_json.stat().st_size // 1024
        print(f"\n  Uploading knowledgebase.json ({size_kb}KB) → knowledgebase.json ...", end=" ", flush=True)
        ok = upload_file(kb_json, "knowledgebase.json", "application/json")
        print("OK" if ok else "FAILED")
        if not ok:
            errors += 1
    else:
        print(f"\n  SKIP (not found): knowledgebase.json at {kb_json}")

    print()
    if errors:
        print(f"Completed with {errors} error(s). Check the output above.")
        sys.exit(1)
    else:
        print("All files uploaded successfully.")
        print("Verify in the Supabase dashboard: Storage → aidqa-kb/")


if __name__ == "__main__":
    main()
