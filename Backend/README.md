# Backend API Documentation

## `api/v1/auth/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullName` (object):
    - `firstName` (string, required): User's first name (minimum 3 characters).
    - `lastName` (string, optional)
    : User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required):
User's password (minimum 6 characters).


### Example Response

- `statusCode` (number): 
- `success` (boolean):
- `message` (string):
- `details` (object):
    - `token` (string): JWT token
    - `user` (object):
        - `fullName` (object):
            - `firstName` (string): User's first name (minimum 3 characters).
            - `lastName` (string)
    : User's last name (minimum 3 characters).
        - `email` (string): User's email address (must be a valid email).
        - `password` (string):
User's password (minimum 6 characters).
 

## `api/v1/auth/login` Endpoint

### Description

Authenticates a user using their email and password, returning a JWT token upon access

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required):
User's password (minimum 6 characters).

### Example Response

- `statusCode` (number): 
- `success` (boolean):
- `message` (string):
- `details` (object):
    - `token` (string): JWT token
    - `user` (object):
        - `fullName` (object):
            - `firstName` (string): User's first name (minimum 3 characters).
            - `lastName` (string)
    : User's last name (minimum 3 characters).
        - `email` (string): User's email address (must be a valid email).
        - `password` (string):
User's password (minimum 6 characters).

## `api/v1/auth/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:

### Example Response

- `statusCode` (number) 
- `success` (boolean)
- `message` (string)
- `details` (object)    
    - `fullName` (object)
        - `firstName` (string): User's first name (minimum 3 characters).
        - `lastName` (string)
    : User's last name (minimum 3 characters).
    - `email` (string): User's email address (must be a valid email).    
User's password (minimum 6 characters).


## `api/v1/auth/logout` Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header or cookie:

### Example Response

- `statusCode` (number)
- `success` (boolean)
- `message` (string)



## `api/v1/captains/register` Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header or cookie:

### Request Body

The request body should be in JSON format and include the following fields:

 - `fullName` (object)
    - `firstName` (string, required): User's first name (minimum 3 characters).
    - `lastName` (string, optional) : User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).    
- `password` (string, required): User's password (minimum 6 characters).
- `status` (string, required)
- `vehicle` (object):
    - `color` (string, required)
    - `plate` (string, required)
    - `capacity` (number, required)
    - `vehicleType` (string, required)

### Example Response

- `statusCode` (number) 
- `success` (boolean)
- `message` (string)
- `details` (object)
    - `token` (string): JWT Token
    - `captain` (object)    
        - `fullName` (object)
            - `firstName` (string): 
            - `lastName` (string) : 
        - `email` (string): 
        - `password` (string, password):
        - `status` (string)
        - `vehicle` (object)
            - `color` (string): vehicle color
            - `plate` (string): vehicle plate
            - `capacity` (number): vehicle capacity
            - `vehicleType` (string): vehicle type

