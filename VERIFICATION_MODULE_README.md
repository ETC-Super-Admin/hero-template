
# Verification Module API Documentation

This document provides documentation for the Verification Module API, which allows you to manage the verification status of messages.

## Endpoints

### Create or Update Message Verification

Creates a new verification entry for a message or updates an existing one.

**Endpoint:** `POST /api/messages/:messageId/verifications`

**URL Parameters:**

*   `messageId` (string, required): The ID of the message to verify.

**Request Body:**

```json
{
  "status": "VERIFIED",
  "notes": "Content approved by moderator"
}
```

*   `status` (string, required, enum: `PENDING`, `VERIFIED`, `REJECTED`): The verification status of the message.
*   `notes` (string, optional): Additional notes or comments regarding the verification.

**Example Request:**

```
POST /api/messages/message_id_1/verifications
Content-Type: application/json

{
  "status": "VERIFIED",
  "notes": "Content approved by moderator"
}
```

**Example Response (201 Created or 200 OK):**

```json
{
  "id": "verification_id_1",
  "messageId": "message_id_1",
  "status": "VERIFIED",
  "notes": "Content approved by moderator",
  "verifiedAt": "2023-10-29T15:30:00.000Z"
}
```
