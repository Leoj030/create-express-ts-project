# 🚀 Express Project Boilerplate

A simple, modern Express.js backend boilerplate using TypeScript, Jest, Babel, and best practices for rapid backend development and easy integration.

## ✨ Features

- **Express.js** with TypeScript for type safety
- **Jest** for testing
- **Babel** for transpilation
- **ESLint** and **Prettier** for code quality and formatting
- **Ready-to-use project structure** (controllers, routes, tests)
- **Common backend utilities**: dotenv, cors, cookie-parser, mongoose, jsonwebtoken, bcryptjs, uuid, and more

## 🗂️ Project Structure

```txt

src/
  index.ts                # Entry point
  controllers/
    getter.controller.ts  # Example controller
  routes/
    getter.route.ts       # Example route
tests/
  getHello.test.ts        # Example test
```

## 🏁 Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/Leoj030/express-project-boilerplate.git
cd express-backend-boilerplate
```

### 2. Install dependencies

```sh
npm install
```

### 3. Development

Start the development server with hot-reloading:

```sh
npm run dev:start
```

Type-check in watch mode:

```sh
npm run dev:type-check
```

### 4. Build and Run

Build the project:

```sh
npm run build
```

Start the production server (after build):

```sh
npm start
```

Or build and start in one step:

```sh
npm run build-start
```

### 5. Linting and Formatting

Check linting errors:

```sh
npm run lint
```

Fix linting errors:

```sh
npm run lint:fix
```

Format code with Prettier:

```sh
npm run format
```

Check formatting:

```sh
npm run format:check
```

### 6. Testing

Run all tests:

```sh
npm test
```

## 📡 Example Endpoint

- `GET /` — Returns `"Hello World"`

## 🛠️ Customization

- Add new routes in `src/routes/`
- Add new controllers in `src/controllers/`
- Add tests in `tests/`

## 📦 Dependencies

- express, mongoose, dotenv, cors, cookie-parser, jsonwebtoken, bcryptjs, uuid, date-fns, express-validator
- TypeScript, tsx, ts-node, jest, babel, eslint, prettier, supertest (dev)

## 📝 License

MIT
