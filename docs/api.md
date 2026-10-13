# API

## Endpoints

| Method | Path | Response | Notes |
|---|---|---|---|
| `GET` | `/api/health` | `200` `{"status":"ok"}` | Liveness check. Sent with `Cache-Control: no-store`. |
