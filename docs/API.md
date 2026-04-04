# AIDQA API Reference

> Last updated: 2026-04-02
> Base URL: `https://eboaqtbktyaxzrbcntzy.supabase.co/functions/v1/aidqa-api`
> Source: `supabase/functions/aidqa-api/scan/handlers.ts`

---

## Authentication

All user routes require two headers:

```
Authorization: Bearer <supabase_jwt>
apikey: <VITE_SUPABASE_ANON_KEY>
```

---

## Endpoints

| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | `/health` | None | Liveness check |
| POST | `/v1/scans` | Required | Create scan — body: `{ url }` OR multipart file upload |
| GET | `/v1/scans` | Required | List user's scans, paginated (`?page=1&limit=20`) |
| GET | `/v1/scans/:id` | Required | Scan status + score. Poll until `status = completed` |
| GET | `/v1/scans/:id/findings` | Required | Prioritized finding list (top 7) |
| GET | `/v1/scans/:id/artifacts` | Required | Signed URLs for normalized image, overlay, dom-snapshot |
| DELETE | `/v1/scans/:id` | Required | Delete scan and all its findings |

---

## POST /v1/scans

### URL scan
```json
{ "url": "https://example.com" }
```

### Screenshot upload
Multipart form upload — attach image file as `file` field.

### Optional fields (both paths)
```json
{
  "design_system_config": {
    "colors": ["#3B82F6", "#1E40AF"],
    "spacing": [4, 8, 12, 16, 24, 32, 48, 64]
  }
}
```

### Response (202)
```json
{ "scan_id": "uuid" }
```

---

## GET /v1/scans/:id

Returns scan status. Poll this until `status` is `completed` or `failed`.

```json
{
  "id": "uuid",
  "status": "completed",
  "score": 74,
  "category_scores": {
    "layout": 86,
    "hierarchy": 93,
    "consistency": 80,
    "accessibility": 60,
    "design_system": 70,
    "ux_readiness": 100
  },
  "finding_count": 5,
  "det_status": "completed",
  "ai_status": "completed",
  "created_at": "...",
  "completed_at": "..."
}
```

---

## Frontend Polling

After `POST /v1/scans` returns `{ scan_id }`, poll `GET /v1/scans/:id` every **1500ms**.

Stop condition:
```ts
scan.status === 'completed' || scan.status === 'failed'
```

Hard timeout: **60 seconds** → show error state.

---

## Error Responses

| Status | Meaning |
|---|---|
| 400 | Invalid input (bad URL, missing file) |
| 401 | Missing or invalid JWT |
| 403 | Scan belongs to a different user |
| 404 | Scan not found |
| 429 | Rate limit exceeded (hobby plan: 10 scans/month) |
| 500 | Internal error — check `error_message` on the scan row |
