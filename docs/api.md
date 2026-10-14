# API

## Endpoints

| Method | Path | Response | Notes |
|---|---|---|---|
| `GET` | `/api/health` | `200` `{"status":"ok"}` | Liveness check. Sent with `Cache-Control: no-store`. |
| `GET` | `/api/version?format=short\|full` | `short`: `200` `{"version":"0.1.0"}`; `full`: `200` `{"name":"todonow","version":"0.1.0","node":"v22.x.y"}` | App version. `format` is optional and defaults to `short`; `node` is the runtime version. Any other value, an empty value or a repeated `format` parameter: `400` `{"error":"INVALID_FORMAT","allowed":["short","full"]}`. |
| `GET` | `/api/ready` | `200` `{"ready":true}` | Readiness check for deploy smoke tests. Sent with `Cache-Control: no-store` and `X-App-Version: <version>` (the `version` in `package.json`, e.g. `0.1.0`). |
| `POST` | `/api/tasks` | `201` `{"id":"…","title":"Buy milk","dueDate":"2026-10-20","dueTime":null,"priority":"NORMAL"}` | Creates a task owned by the logged-in user. Body `{"title":string,"dueDate":"YYYY-MM-DD","dueTime"?:"HH:MM"\|null}`; `ownerId` and `priority` in the body are ignored (priority is always `NORMAL`). No valid session: `401` `{"error":"UNAUTHORIZED"}`. Bad JSON, wrong types, title over 200 characters, or a malformed date/time: `400` `{"error":"INVALID_INPUT"}`. Missing title and/or due date: `400` `{"error":"VALIDATION","errors":["TITLE_REQUIRED","DUE_DATE_REQUIRED"]}`. |
| `POST` | `/api/auth/password-reset/request` | `202` `{"ok":true}` | Body `{"email": string}` (max 254). Emails a reset link (valid once, 1 hour) in the `Accept-Language` locale (`vi` or `en`, default `vi`), built from `APP_BASE_URL` (fallback: the request origin, outside production only; in production without `APP_BASE_URL` nothing is sent and the cause is logged). Same `202` whether or not the account exists, and when sending fails (logged). Bad shape: `400` `{"error":"INVALID_INPUT"}`. |
| `POST` | `/api/auth/password-reset` | `200` `{"ok":true}` | Body `{"token": string, "password": string}` (password max 128). Sets the new password; no session cookie is set or cleared. Unknown, used or expired token: `400` `{"error":"INVALID_TOKEN"}`. Password breaks the rule: `400` `{"error":"PASSWORD_RULE","failures":[...]}`. Bad shape: `400` `{"error":"INVALID_INPUT"}`. |
