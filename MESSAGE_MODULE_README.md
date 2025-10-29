
# Message Module API Documentation

This document provides documentation for the Message Module API, which allows you to retrieve messages for a specific LINE group.

## Endpoints

### Get Messages for a Group

Retrieves a list of messages for a specific LINE group, with options for filtering by status, date, and pagination.

**Endpoint:** `GET /api/groups/:id/messages`

**URL Parameters:**

*   `id` (string, required): The internal CUID of the LINE group.

**Query Parameters:**

*   `status` (string, optional, enum: `PENDING`, `VERIFIED`, `REJECTED`): Filters messages by their verification status.
*   `date` (string, optional, format: YYYY-MM-DD): Filters messages by a specific date. Cannot be used with `page` or `limit`.
*   `page` (number, optional, default: 1): The page number for pagination. Requires `limit` to be provided. Cannot be used with `date`.
*   `limit` (number, optional, default: 10): The number of messages to return per page. Requires `page` to be provided. Cannot be used with `date`.

**Example Request (with date filter):**

```
GET /api/groups/cln0s8c0s00001a2b3c4d5e6f/messages?date=2023-10-29&status=VERIFIED
```

**Example Request (with pagination):**

```
GET /api/groups/cln0s8c0s00001a2b3c4d5e6f/messages?page=1&limit=20&status=PENDING
```

**Example Response:**

```json
[
  {
    "id": "message_id_1",
    "type": "text",
    "text": "Hello everyone!",
    "imageUrl": null,
    "timestamp": "2023-10-29T10:00:00.000Z",
    "lineUser": {
      "displayName": "User A",
      "pictureUrl": "http://example.com/user_a.jpg"
    },
    "verification": {
      "id": "verification_id_1",
      "messageId": "message_id_1",
      "status": "VERIFIED",
      "notes": "Content approved",
      "verifiedAt": "2023-10-29T10:05:00.000Z"
    }
  },
  {
    "id": "message_id_2",
    "type": "image",
    "text": null,
    "imageUrl": "http://localhost:5000/uploads/2023/29_10/image_abc.jpg",
    "timestamp": "2023-10-29T11:00:00.000Z",
    "lineUser": {
      "displayName": "User B",
      "pictureUrl": "http://example.com/user_b.jpg"
    },
    "verification": null
  }
]
```
