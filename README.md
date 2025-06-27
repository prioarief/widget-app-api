# Widget App API

A robust and scalable RESTful API for retrieving posts for content creators' widgets. This API provides the latest public posts from various communities that can be embedded on websites.

## 📋 Requirements

- Node.js (version 16.0.0 or higher)
- npm (comes with Node.js)

## 🔧 Installation & Setup

### 1. Clone this repository

```bash
```

### 2. Install Dependencies

```bash
npm install 
```

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file with your preferred settings
# Default values are already suitable for development
```

### 4. Start the Server

```bash
# For development (with auto-restart)
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your .env file).

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Get Posts for Community Widget
```http
GET /v1/widget/:communityId/posts
```

**Parameters:**
- `communityId` (int, required): The community identifier

**Response Format:**
```json
{
  "code": 1,
  "message": "Success get posts",
  "data": [
    {
      "id": 12,
      "communityId": 101,
      "title": "Machine Learning Basics",
      "content": "Getting started with ML? Begin with understanding supervised vs unsupervised learning, then explore popular libraries like TensorFlow and PyTorch.",
      "author": {
        "id": 1012,
        "name": "Ivy Martinez",
        "avatar": "https://example.com/avatars/ivy.jpg"
      },
      "isPublic": true,
      "createdAt": "2025-06-25 18:00:00",
      "tags": [
        "machine-learning",
        "ai",
        "beginners"
      ]
    }
  ]
}
```

**Status Codes:**
- `200 OK`: Posts found and returned successfully
- `400 Bad Request`: Invalid community ID format
- `404 Not Found`: No public posts found for the community
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error occurred

#### Health Check
```http
GET /v1/widget/health/check
```

## ⚙️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port number |
| `RATE_LIMIT_WINDOW_MS` | 60000 | Rate limit window in milliseconds (1 minute) |
| `RATE_LIMIT_MAX_REQUESTS` | 10 | Maximum requests per window per IP |
| `NODE_ENV` | development | Environment mode |

### Rate Limiting

The API implements rate limiting to prevent abuse:
- **Limit**: 10 requests per minute per IP address
- **Window**: 60 seconds (1 minute)
- **Response**: HTTP 429 with retry information when exceeded

## 🔒 Security Features

- **Helmet.js**: Sets security headers
- **Input Validation**: Community ID format validation
- **Rate Limiting**: Prevents API abuse
- **CORS**: Configurable cross-origin resource sharing
- **Error Handling**: Prevents information leakage in error messages