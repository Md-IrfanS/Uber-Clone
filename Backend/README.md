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
 

