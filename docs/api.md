# API

## Endpoints

| Method | Path | Response | Notes |
|---|---|---|---|
| `GET` | `/api/health` | `200` `{"status":"ok"}` | Liveness check. Sent with `Cache-Control: no-store`. |
| `GET` | `/api/version?format=short\|full` | `short`: `200` `{"version":"0.1.0"}`; `full`: `200` `{"name":"todonow","version":"0.1.0","node":"v22.x.y"}` | App version. `format` is optional and defaults to `short`; `node` is the runtime version. Any other value, an empty value or a repeated `format` parameter: `400` `{"error":"INVALID_FORMAT","allowed":["short","full"]}`. |
| `GET` | `/api/ready` | `200` `{"ready":true}` | Readiness check for deploy smoke tests. Sent with `Cache-Control: no-store` and `X-App-Version: <version>` (the `version` in `package.json`, e.g. `0.1.0`). |
