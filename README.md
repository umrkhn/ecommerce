![ecommerce](https://user-images.githubusercontent.com/91739815/152681829-3882e169-62e7-42e6-b41c-47849f98a0ab.png)

## Features

- Products listing
- Prouct Details
- Login and Signup
- Cart

## What I've learned in this Project

### Frontend:

- React
- State management with Redux
- Redux middlewares
- Routing with React-routerv6
- API integration
- Form Validation

### Backend:

- Authentication using Json-web-token with Refresh-token
- RESTful API
- Mongoose ORM
- Error handling
- Server Validation using JOI
- MVC pattern

## Installation

Nodejs, npm and git must be installed on your system.

#### Clone Repository:

```
$ git clone https://github.com/umrkhn/ecommerce.git
```

#### Install Frontend:

open a new terminal session and run the follwing commands.

```
# Change Directory
$ cd client

# Install dependencies
$ npm install

# Start development server
$ npm start
```

#### Install Backend:

open a new terminal session and run the follwing commands.

```
# Change Directory
$ cd server

# Install dependencies
$ npm install

# Start development server
$ npm run server
```

## Environment Variables

### Frontend:

Create a .env file in `/client` and add the following config:

```
REACT_APP_AXIOS_BASE_URL = your_api_base_url     // ex: http://localhost:8080
```

### Backend:

Create a .env file in `/server` and add the following config:

```
PORT = 8080
CLIENT_ORIGIN = your_client_origin     // ex: http://localhost:3000
CONNECTION_URL = your_mongodb_connection_url
ACCESS_TOKEN_SECRET = your_access_token_secret
REFRESH_TOKEN_SECRET = your_refresh_token_secret
```

## Other Projects I've Built

[Quarks](https://github.com/umrkhn/quarks) - A minimalistic marketing website.
