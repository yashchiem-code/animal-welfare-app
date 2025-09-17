# API Documentation

## Base URL
- Development: `http://localhost:8080`
- Production: `https://your-domain.com`

## Authentication
Currently, the API does not require authentication. All endpoints are publicly accessible.

## Endpoints

### Animals

#### Get All Animals
```http
GET /api/all
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Buddy",
    "breed": "Golden Retriever",
    "location": "Central Park, New York",
    "lat": 40.7829,
    "lng": -73.9654,
    "imageUrl": "https://example.com/image.jpg",
    "fedToday": false,
    "lastFed": null,
    "status": "reported",
    "reportedBy": "John Doe",
    "reportedAt": "2024-01-15T10:30:00"
  }
]
```

#### Get Animal by ID
```http
GET /api/animals/{id}
```

**Parameters:**
- `id` (path): Animal ID

**Response:**
```json
{
  "id": 1,
  "name": "Buddy",
  "breed": "Golden Retriever",
  "location": "Central Park, New York",
  "lat": 40.7829,
  "lng": -73.9654,
  "imageUrl": "https://example.com/image.jpg",
  "fedToday": false,
  "lastFed": null,
  "status": "reported",
  "reportedBy": "John Doe",
  "reportedAt": "2024-01-15T10:30:00"
}
```

#### Report New Animal
```http
POST /api/animals/report
```

**Request Body:**
```json
{
  "name": "Buddy",
  "breed": "Golden Retriever",
  "location": "Central Park, New York",
  "lat": 40.7829,
  "lng": -73.9654,
  "imageUrl": "https://example.com/image.jpg",
  "reportedBy": "John Doe"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Buddy",
  "breed": "Golden Retriever",
  "location": "Central Park, New York",
  "lat": 40.7829,
  "lng": -73.9654,
  "imageUrl": "https://example.com/image.jpg",
  "fedToday": false,
  "lastFed": null,
  "status": "reported",
  "reportedBy": "John Doe",
  "reportedAt": "2024-01-15T10:30:00"
}
```

#### Update Feeding Status
```http
PUT /api/feed/{id}
```

**Parameters:**
- `id` (path): Animal ID

**Request Body:**
```json
{
  "fedToday": true,
  "lastFed": "2024-01-15T14:30:00"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Buddy",
  "fedToday": true,
  "lastFed": "2024-01-15T14:30:00",
  ...
}
```

#### Update Adoption Status
```http
PUT /api/adopt/{id}
```

**Parameters:**
- `id` (path): Animal ID

**Response:**
```json
{
  "id": 1,
  "name": "Buddy",
  "status": "pending",
  ...
}
```

#### Update Animal Status
```http
PUT /api/animals/{id}/status
```

**Parameters:**
- `id` (path): Animal ID

**Request Body:**
```json
{
  "status": "adopted"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Buddy",
  "status": "adopted",
  ...
}
```

#### Get Animals by Status
```http
GET /api/animals/status/{status}
```

**Parameters:**
- `status` (path): Animal status (`reported`, `available`, `pending`, `adopted`)

**Response:**
```json
[
  {
    "id": 1,
    "name": "Buddy",
    "status": "reported",
    ...
  }
]
```

#### Get Animals by Feeding Status
```http
GET /api/animals/feeding/{fedToday}
```

**Parameters:**
- `fedToday` (path): Boolean (`true` or `false`)

**Response:**
```json
[
  {
    "id": 1,
    "name": "Buddy",
    "fedToday": false,
    ...
  }
]
```

#### Search Animals
```http
GET /api/animals/search?location={location}&term={term}
```

**Query Parameters:**
- `location` (optional): Search by location
- `term` (optional): Search by name or breed

**Response:**
```json
[
  {
    "id": 1,
    "name": "Buddy",
    "breed": "Golden Retriever",
    "location": "Central Park, New York",
    ...
  }
]
```

#### Delete Animal
```http
DELETE /api/animals/{id}
```

**Parameters:**
- `id` (path): Animal ID

**Response:** `204 No Content`

## Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `204 No Content`: Request successful, no content returned
- `400 Bad Request`: Invalid request data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Error Response Format

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/animals/report"
}
```

## Animal Status Values

- `reported`: Newly reported animal
- `available`: Available for adoption
- `pending`: Adoption in progress
- `adopted`: Successfully adopted

## Data Validation

### Required Fields for Animal Creation
- `name`: Must not be blank
- `location`: Must not be blank
- `lat`: Must be a valid latitude
- `lng`: Must be a valid longitude
- `reportedBy`: Must not be blank

### Optional Fields
- `breed`: Defaults to empty string
- `imageUrl`: URL to animal image
- `fedToday`: Defaults to `false`
- `lastFed`: Defaults to `null`
- `status`: Defaults to `"reported"`

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## CORS Configuration

The API allows cross-origin requests from:
- `http://localhost:3000`
- `http://127.0.0.1:5500`
- `http://localhost:5500`

Additional origins can be configured in the `WebConfig` class.