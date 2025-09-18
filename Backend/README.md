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

## Captain Endpoints

### 1. Register Captain

**URL:** `/captains/register`

**Method:** `POST`

**Description:**
Registers a new captain (driver) with vehicle details. Requires first name, last name, email, password and vehicle information. Returns an authentication token and captain data on success.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Rider"
  },
  "email": "jane.rider@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "red",
    "plate": "ABC-123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Validation:**
- `fullname.firstname`: Required, minimum 3 characters
- `password`: Required, minimum 6 characters
- `email`: Required, must be a valid email
- `vehicle.color`: Required, minimum 3 characters
- `vehicle.plate`: Required, minimum 3 characters
- `vehicle.capacity`: Required, integer >= 1
- `vehicle.vehicleType`: Required, one of `car`, `motorcycle`, `auto`

**Responses:**
- `201 Created`: Registration successful
  - Body: `{ "token": "<jwt>", "captain": { ... } }`
- `400 Bad Request`: Validation failed or captain already exists
  - Body: `{ "errors": [ ... ] }` or `{ "message": "Captain Already Exist" }`

---

### 2. Login Captain

**URL:** `/captains/login`

**Method:** `POST`

**Description:**
Authenticates an existing captain. Requires email and password. Returns an authentication token and captain data on success.

**Request Body:**
```json
{
  "email": "jane.rider@example.com",
  "password": "securepassword"
}
```

**Validation:**
- `email`: Required, must be a valid email
- `password`: Required, minimum 6 characters

**Responses:**
- `200 OK`: Login successful
  - Body: `{ "message": "Captain Logging SuccessFully", "token": "<jwt>", "captain": { ... } }`
- `400 Bad Request`: Validation failed
  - Body: `{ "errors": [ ... ] }`
- `401 Unauthorized`: Invalid email or password
  - Body: `{ "message": "Invalid Email or Password" }`

---

### 3. Get Captain Profile

**URL:** `/captains/profile`

**Method:** `GET`

**Description:**
Returns the authenticated captain's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

**Example Request:**
```http
GET /captains/profile HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <jwt>
```

**Example Response:**
```json
{
  "captain": {
    "_id": "0987654321",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Rider"
    },
    "email": "jane.rider@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    }
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

### 4. Logout Captain

**URL:** `/captains/logout`

**Method:** `GET`

**Description:**
Logs out the authenticated captain by blacklisting the JWT token and clearing the cookie. Requires a valid JWT token in the `Authorization` header or as a cookie.

**Example Request:**
```http
GET /captains/logout HTTP/1.1
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

