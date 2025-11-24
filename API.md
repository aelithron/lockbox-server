# Lockbox API
A simple guide to the routes in this API!
A note, it only responds in JSON, and all request bodies must be in JSON.
## GET /
The simplest method, this one is really only good for verifying the API is operational.
Also shows uptime data.
### Request
No data is needed to request this :3
### Response
200 OK
```json
{
  "server":"Lockbox Server",
  "github_repo":"https://github.com/aelithron/lockbox-server",
  "accessing_on":"(hostname used in the request)",
  "uptime":"(number of online seconds)"
}
```
## GET /verify
Verifies if a certain key is valid for a box.
### Request
An `Authentication` header with either a `Drop-Key` or `Unlock-Key` prefix, followed by the key itself.
### Response
- 401 Unauthorized / 403 Forbidden:
```json
{
  success: false,
  message: "Missing Authorization header."
}
```
- 403 Forbidden:
```json
{
  success: false,
  message: "Invalid (Drop|Unlock) Key, make sure you are sending a valid key."
}
```
- 200 OK:
```json
{
  success: true,
  message: "Successfully verified your (Drop|Unlock) Key."
}
```
# Boxes
## GET /box
Opens a Box, revealing the full contents in the response.
### Request
An `Authentication` header with an `Unlock-Key` prefix, followed by a valid Unlock Key.
### Response
- 401 Unauthorized:
```json
{
  success: false,
  message: "Missing Authorization header."
}
```
- 403 Forbidden:
```json
{
  success: false,
  message: "Invalid Unlock Key, make sure you are sending a valid key."
}
```
- 200 OK:
```json
{
  success: true,
  boxContents: [
    { id: "(16-character alphanumeric string)", note: "(text)", addedAt: "(a JavaScript Date object, like 2025-09-21T22:50:28.025Z)" },
    ...
  ]
}
```
## POST /box
Creates a new Box and returns the plaintext keys.
### Request
No request data required.
### Response
```json
{
  success: true
}
```