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


## Map Endpoints

These endpoints use Google Maps APIs to resolve addresses, compute distance/time between two points, and return place autocomplete suggestions. All map routes are protected — they require a valid JWT token either in the `Authorization: Bearer <jwt>` header or as a cookie named `token`.

### 1. Get Coordinates

**URL:** `/maps/get-coordinates`

**Method:** `GET`

**Query Parameters:**
- `address` (string, required) — address or place name (minimum length 3)

**Description:**
Returns latitude and longitude for the given address using the Google Geocoding API.

**Example Request:**
```http
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <jwt>
```

**Example Successful Response (200):**
```json
{
  "coordinates": {
    "lat": 37.4224764,
    "lng": -122.0842499
  }
}
```

**Error Responses:**
- `400 Bad Request` — validation error, e.g. missing/short `address`
  - Body: `{ "errors": [ ... ] }`
- `404 Not Found` — address could not be resolved
  - Body: `{ "error": "...", "message": "Coordinate not Found" }`
- `401 Unauthorized` — missing/invalid/blacklisted token
  - Body: `{ "message": "Unauthorized User" }` or `{ "message": "Token is Blacklisted" }`

---

### 2. Get Distance & Time

**URL:** `/maps/get-distance-time`

**Method:** `GET`

**Query Parameters:**
- `origin` (string, required) — origin address/place (min length 3)
- `destination` (string, required) — destination address/place (min length 3)

**Description:**
Uses the Google Distance Matrix API to compute the travel distance and duration between `origin` and `destination`.

**Example Request:**
```http
GET /maps/get-distance-time?origin=Times+Square&destination=Central+Park HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <jwt>
```

**Example Successful Response (200):**
```json
{
  "distance": {
    "text": "4.5 km",
    "value": 4500
  },
  "duration": {
    "text": "12 mins",
    "value": 720
  },
  "status": "OK"
}
```

Note: the service returns the first element from the Distance Matrix result (the most relevant route between the provided origin and destination).

**Error Responses:**
- `400 Bad Request` — validation error or missing parameters
  - Body: `{ "errors": [ ... ] }` or `{ "message": "Origin and destination are required" }`
- `500 Internal Server Error` — API/network error
  - Body: `{ "message": "Internal server error" }`
- `401 Unauthorized` — missing/invalid/blacklisted token

---

### 3. Get Autocomplete Suggestions

**URL:** `/maps/get-suggestions`

**Method:** `GET`

**Query Parameters:**
- `input` (string, required) — partial place or address input (min length 3)

**Description:**
Returns an array of place prediction strings using the Google Places Autocomplete API.

**Example Request:**
```http
GET /maps/get-suggestions?input=1600+Amph HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <jwt>
```

**Example Successful Response (200):**
```json
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
```

**Error Responses:**
- `400 Bad Request` — validation error or missing `input`
  - Body: `{ "errors": [ ... ] }` or `{ "message": "query is required" }`
- `500 Internal Server Error` — API/network error
  - Body: `{ "message": "Internal server error" }`
- `401 Unauthorized` — missing/invalid/blacklisted token


---

---

## Ride Endpoints

These endpoints let authenticated users create rides and estimate fares. Both routes require a valid JWT token in the `Authorization: Bearer <jwt>` header or a cookie named `token`.

### 1. Create Ride

**URL:** `/rides/createride`

**Method:** `POST`

**Description:**
Creates a new ride request for an authenticated user. Requires pickup and destination addresses plus a vehicle type.

**Request Body:**
```json
{
  "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
  "destination": "1 Infinite Loop, Cupertino, CA",
  "vehicleType": "car" // one of ["auto", "car", "moto"]
}
```

**Validation:**
- `pickup`: required, string, min length 3
- `destination`: required, string, min length 3
- `vehicleType`: required, one of `auto`, `car`, `moto`

**Example Request:**
```http
POST /rides/createride HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
  "destination": "1 Infinite Loop, Cupertino, CA",
  "vehicleType": "car"
}
```

**Example Successful Response (201):**
```json
{
  "_id": "607d1b2f5f3b2c0015b7c0a1",
  "user": "60fc7f9b9b1e8a00123abcd4",
  "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
  "destination": "1 Infinite Loop, Cupertino, CA",
  "fare": 120,
  "status": "pending",
  "otp": "<hidden>",
  "createdAt": "2025-09-25T12:34:56.789Z",
  "updatedAt": "2025-09-25T12:34:56.789Z"
}
```

**Error Responses:**
- `400 Bad Request` — validation errors
  - Body: `{ "errors": [ ... ] }`
- `500 Internal Server Error` — server error when creating ride
  - Body: `{ "message": "..." }`

---

### 2. Get Fare

**URL:** `/rides/get-fare`

**Method:** `GET`

**Description:**
Returns estimated fares for supported vehicle types between two addresses. Uses the distance and duration computed from the Maps service.

**Query Parameters:**
- `pickup` (string, required)
- `destination` (string, required)

**Example Request:**
```http
GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway&destination=1+Infinite+Loop HTTP/1.1
Host: yourdomain.com
Authorization: Bearer <jwt>
```

**Example Successful Response (200):**
```json
{
  "auto": 85,
  "car": 120,
  "moto": 60
}
```

**Error Responses:**
- `400 Bad Request` — validation errors or missing params
  - Body: `{ "errors": [ ... ] }`
- `500 Internal Server Error` — API or computation error
  - Body: `{ "message": "..." }`


## Notes
- All responses are in JSON format.
- The authentication token is a JWT valid for 24 hours.
- Passwords must be at least 6 characters long.
- First name must be at least 3 characters long.

