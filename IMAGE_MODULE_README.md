# Image Module API Documentation

This document provides documentation for the Image Module API, which allows you to retrieve images that have been uploaded to the server.

## Endpoints

### Get Images by Group

Retrieves a list of images for a specific LINE group.

**Endpoint:** `GET /api/images/group/:groupId`

**URL Parameters:**

*   `groupId` (string, required): The ID of the LINE group.

**Query Parameters:**

*   `page` (number, optional, default: 1): The page number for pagination.
*   `limit` (number, optional, default: 10): The number of images to return per page.
*   `year` (number, optional): The year to filter images by.
*   `dayMonth` (string, optional, format: DD_MM): The day and month to filter images by (requires `year`).

**Example Request:**

```
GET /api/images/group/c12345678901234567890123456789012?page=1&limit=20&year=2023&dayMonth=28_10
```

**Example Response:**

```json
[
  {
    "id": "message_id_1",
    "imageUrl": "http://localhost:5000/uploads/2023/28_10/image1.jpg",
    "timestamp": "2023-10-28T10:00:00.000Z",
    "lineUser": {
      "id": "user_id_1",
      "displayName": "User 1",
      "pictureUrl": "http://example.com/user1.jpg"
    }
  },
  {
    "id": "message_id_2",
    "imageUrl": "http://localhost:5000/uploads/2023/28_10/image2.jpg",
    "timestamp": "2023-10-28T11:00:00.000Z",
    "lineUser": {
      "id": "user_id_2",
      "displayName": "User 2",
      "pictureUrl": "http://example.com/user2.jpg"
    }
  }
]
```

### Get Years with Images by Group

Retrieves a list of years that contain images for a specific LINE group.

**Endpoint:** `GET /api/images/group/:groupId/years`

**URL Parameters:**

*   `groupId` (string, required): The ID of the LINE group.

**Example Request:**

```
GET /api/images/group/c12345678901234567890123456789012/years
```

**Example Response:**

```json
[
  2023,
  2022
]
```

### Get Day/Months with Images by Group and Year

Retrieves a list of day/month combinations (DD_MM) that contain images for a specific LINE group and year.

**Endpoint:** `GET /api/images/group/:groupId/year/:year`

**URL Parameters:**

*   `groupId` (string, required): The ID of the LINE group.
*   `year` (number, required): The year to filter by.

**Example Request:**

```
GET /api/images/group/c12345678901234567890123456789012/year/2023
```

**Example Response:**

```json
[
  "28_10",
  "15_09"
]
```

### Get Images by Group, Year, and Day/Month

Retrieves a list of images for a specific LINE group, year, and day/month.

**Endpoint:** `GET /api/images/group/:groupId/year/:year/daymonth/:dayMonth`

**URL Parameters:**

*   `groupId` (string, required): The ID of the LINE group.
*   `year` (number, required): The year to filter by.
*   `dayMonth` (string, required, format: DD_MM): The day and month to filter by.

**Query Parameters:**

*   `page` (number, optional, default: 1): The page number for pagination.
*   `limit` (number, optional, default: 10): The number of images to return per page.

**Example Request:**

```
GET /api/images/group/c12345678901234567890123456789012/year/2023/daymonth/28_10?page=1&limit=20
```

**Example Response:**

```json
[
  {
    "id": "message_id_1",
    "imageUrl": "http://localhost:5000/uploads/2023/28_10/image1.jpg",
    "timestamp": "2023-10-28T10:00:00.000Z",
    "lineUser": {
      "id": "user_id_1",
      "displayName": "User 1",
      "pictureUrl": "http://example.com/user1.jpg"
    }
  }
]
```

### Get Images by User

Retrieves a list of images uploaded by a specific LINE user.

**Endpoint:** `GET /api/images/user/:userId`

**URL Parameters:**

*   `userId` (string, required): The ID of the LINE user.

**Query Parameters:**

*   `page` (number, optional, default: 1): The page number for pagination.
*   `limit` (number, optional, default: 10): The number of images to return per page.
*   `year` (number, optional): The year to filter images by.
*   `dayMonth` (string, optional, format: DD_MM): The day and month to filter images by (requires `year`).

**Example Request:**

```
GET /api/images/user/u12345678901234567890123456789012?page=1&limit=20&year=2023&dayMonth=28_10
```

**Example Response:**

```json
[
  {
    "id": "message_id_1",
    "imageUrl": "http://localhost:5000/uploads/2023/28_10/image1.jpg",
    "timestamp": "2023-10-28T10:00:00.000Z",
    "lineGroup": {
      "id": "group_id_1",
      "name": "Group 1"
    }
  },
  {
    "id": "message_id_3",
    "imageUrl": "http://localhost:5000/uploads/2023/28_10/image3.jpg",
    "timestamp": "2023-10-28T12:00:00.000Z",
    "lineGroup": {
      "id": "group_id_2",
      "name": "Group 2"
    }
  }
]
```

### Get Years with Images by User

Retrieves a list of years that contain images for a specific LINE user.

**Endpoint:** `GET /api/images/user/:userId/years`

**URL Parameters:**

*   `userId` (string, required): The ID of the LINE user.

**Example Request:**

```
GET /api/images/user/u12345678901234567890123456789012/years
```

**Example Response:**

```json
[
  2023,
  2022
]
```

### Get Day/Months with Images by User and Year

Retrieves a list of day/month combinations (DD_MM) that contain images for a specific LINE user and year.

**Endpoint:** `GET /api/images/user/:userId/year/:year`

**URL Parameters:**

*   `userId` (string, required): The ID of the LINE user.
*   `year` (number, required): The year to filter by.

**Example Request:**

```
GET /api/images/user/u12345678901234567890123456789012/year/2023
```

**Example Response:**

```json
[
  "28_10",
  "15_09"
]
```

### Get Images by User, Year, and Day/Month

Retrieves a list of images for a specific LINE user, year, and day/month.

**Endpoint:** `GET /api/images/user/:userId/year/:year/daymonth/:dayMonth`

**URL Parameters:**

*   `userId` (string, required): The ID of the LINE user.
*   `year` (number, required): The year to filter by.
*   `dayMonth` (string, required, format: DD_MM): The day and month to filter by.

**Query Parameters:**

*   `page` (number, optional, default: 1): The page number for pagination.
*   `limit` (number, optional, default: 10): The number of images to return per page.

**Example Request:**

```
GET /api/images/user/u12345678901234567890123456789012/year/2023/daymonth/28_10?page=1&limit=20
```

**Example Response:**

```json
[
  {
    "id": "message_id_1",
    "imageUrl": "http://localhost:5000/uploads/2023/28_10/image1.jpg",
    "timestamp": "2023-10-28T10:00:00.000Z",
    "lineGroup": {
      "id": "group_id_1",
      "name": "Group 1"
    }
  }
]
```