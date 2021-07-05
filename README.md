# PERN auth

This app is boilerplate for PERN stack with basic authentication built in.

## Features

1. User can register/login
2. Users password is hashed with bcrypt
3. App uses two tokens for authentication: refresh and access
4. React app stores user to context after login so user can be accessed from anywhere

## Built With

- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [Reactjs](https://reactjs.org/)
- [Nodejs](https://nodejs.org/en/)
- [TypeORM](https://typeorm.io/#/)
- [TypeScript](https://www.typescriptlang.org/)

## Setup

### Requirements

- PostgreSQL
- Node
- Yarn or NPM

### Installation

1. Clone this repo:

```
git clone https://github.com/Muugmaster/PERN-auth.git
```

2. Set environmental variables in `server/.env` file:

```
ACCESS_TOKEN_SECRET=<secret for access token>
REFRESH_TOKEN_SECRET=<secret for refresh token>
DATABASE_URL=<Postgresql connection url>
PORT=<Port where server starts>
```

3. Install dependencies in `server` and `web`:

```
cd server
yarn
cd .. && cd web
yarn
```

### Usage

1. Start server in development `yarn run dev` in `server/`
2. Start React app `yarn start` in `web/`

- The React app will be running on: `http://localhost:3000`
- and server on: `http://localhost:<PORT WHATS IN .ENV>`

## TODO:

- [] Add basic styling
