# Line User Module API Documentation

This document provides documentation for the Line User Module API, which allows you to retrieve information about LINE users.

## Endpoints

### Get All Users

Retrieves a list of all LINE users known to the system, including their display name, picture URL, and the count of images they have sent.

**Endpoint:** `GET /api/users`

**Query Parameters:** None

**Example Request:**

```
GET /api/users
```

**Example Response:**

```json
[
  {
    "id": "cln0s8c0s00001a2b3c4d5e6f",
    "displayName": "John Doe",
    "pictureUrl": "https://example.com/profile.jpg",
    "imageCount": 15
  },
  {
    "id": "cln0s8c0s00011a2b3c4d5e6f",
    "displayName": "Jane Smith",
    "pictureUrl": "https://example.com/profile2.jpg",
    "imageCount": 30
  }
]
```
