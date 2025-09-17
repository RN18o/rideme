# User API Endpoints Documentation

## Endpoints

### 1. Register User

**URL:** `/users/register`

**Method:** `POST`

**Description:**
Registers a new user in the system. Requires first name, last name, email, and password. Returns an authentication token and user data on success.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Validation:**
- `fullname.firstname`: Required, minimum 3 characters
- `fullname.lastname`: Optional, minimum 3 characters
- `email`: Required, must be a valid email
- `password`: Required, minimum 6 characters

**Responses:**
- `201 Created`: Registration successful
  - Body: `{ "token": "<jwt>", "user": { ... } }`
- `400 Bad Request`: Validation failed or user already exists
  - Body: `{ "errors": [ ... ] }` or `{ "message": "User Already Exist" }`

---


### 2. Login User

**URL:** `/users/login`

**Method:** `POST`

**Description:**
Authenticates an existing user. Requires email and password. Returns an authentication token and user data on success.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Validation:**
- `email`: Required, must be a valid email
- `password`: Required, minimum 6 characters

**Responses:**
- `200 OK`: Login successful
  - Body: `{ "message": "User Logging SuccessFully", "token": "<jwt>", "user": { ... } }`
- `400 Bad Request`: Validation failed
  - Body: `{ "errors": [ ... ] }`
- `401 Unauthorized`: Invalid email or password
  - Body: `{ "message": "Invalid Email or Password" }`

---


### 3. Get User Profile

**URL:** `/users/profile`

**Method:** `GET`

**Description:**
Returns the authenticated user's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

**Example Request:**
```http
GET /users/profile HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <jwt>
```

**Example Response:**
```json
{
  "user": {
    "_id": "1234567890",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other fields
  }
}
```

**Error Response:**
```json
{
  "message": "Unauthorized User"
}
```
or
```json
{
  "message": "Token is Blacklisted"
}
```

---

---


### 4. Logout User

**URL:** `/users/logout`

**Method:** `GET`

**Description:**
Logs out the authenticated user by blacklisting the JWT token and clearing the cookie. Requires a valid JWT token in the `Authorization` header or as a cookie.

**Example Request:**
```http
GET /users/logout HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <jwt>
```

**Example Response:**
```json
{
  "message": "Logged out"
}
```

**Error Response:**
```json
{
  "message": "Unauthorized User"
}
```
or
```json
{
  "message": "Token is Blacklisted"
}
```

---

---

## Notes
- All responses are in JSON format.
- The authentication token is a JWT valid for 24 hours.
- Passwords must be at least 6 characters long.
- First name must be at least 3 characters long.
