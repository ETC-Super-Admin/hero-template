
# Line Group Module API Documentation

This document provides documentation for the Line Group Module API, which allows you to retrieve information about LINE groups.

## Endpoints

### Get All Groups

Retrieves a list of all LINE groups known to the system.

**Endpoint:** `GET /api/groups`

**Query Parameters:** None

**Example Request:**

```
GET /api/groups
```

**Example Response:**

```json
[
  {
    "id": "cln0s8c0s00001a2b3c4d5e6f",
    "groupId": "Ca6b8d8e7c6a5b4c3d2e1f0a9b8c7d6e",
    "name": "My Awesome Group",
    "memberAmount": 10,
    "imageCount": 50
  },
  {
    "id": "cln0s8c0s00011a2b3c4d5e6f",
    "groupId": "Ub6b8d8e7c6a5b4c3d2e1f0a9b8c7d6e",
    "name": "Another Group Chat",
    "memberAmount": 25,
    "imageCount": 120
  }
]
```

### Get Daily Summary for a Group

Retrieves a daily summary of messages and their verification statuses for a specific LINE group.

**Endpoint:** `GET /api/groups/:id/summary`

**URL Parameters:**

*   `id` (string, required): The internal CUID of the LINE group.

**Query Parameters:**

*   `date` (string, required, format: YYYY-MM-DD): The date for which to retrieve the summary.

**Example Request:**
let
```
GET /api/groups/cln0s8c0s00001a2b3c4d5e6f/summary?date=2023-10-29
```

**Example Response:**

```json
{
  "total": 150,
  "verified": 100,
  "pending": 40,
  "rejected": 10
}
```
