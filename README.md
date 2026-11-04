# HARVIZY

**A personal AI assistant inspired by Iron Man's J.A.R.V.I.S.**

HARVIZY is a personal AI assistant project designed to integrate artificial intelligence, voice interaction, desktop automation, and mobile access through a modular hybrid architecture.

The project aims to provide an extensible platform combining cloud capabilities with controlled local execution.

## Project Status

**Active development — Backend foundation and infrastructure.**

The initial NestJS API and PostgreSQL infrastructure are implemented and run together through Docker Compose.

## Objectives

- Provide an AI-powered conversational interface.
- Build a modular backend API.
- Support desktop and mobile access.
- Persist conversations and messages using PostgreSQL.
- Add voice interaction and local automation in future releases.
- Apply secure software development and DevOps practices.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, TypeScript, Vite (planned) |
| Backend | NestJS, TypeScript |
| Database | PostgreSQL |
| ORM | TypeORM |
| Infrastructure | Docker, Docker Compose |
| Testing | Jest, Supertest |
| Version Control | Git, GitHub |
| AI | Configurable external AI provider (planned) |
| Mobile | Android support (planned) |

## Architecture

HARVIZY follows a modular architecture composed of:

- **Frontend:** User interface and communication with the backend.
- **Backend API:** Application logic, REST endpoints, and integrations.
- **Database:** Persistent storage using PostgreSQL.
- **AI Integration:** Dedicated backend layer for AI provider communication.
- **Infrastructure:** Containerized local development environment.

See [Architecture Documentation](docs/architecture.md).

## Implemented Features

- Initial NestJS application.
- Environment-based configuration.
- PostgreSQL connection through TypeORM.
- Dockerized NestJS API.
- PostgreSQL and API orchestration through Docker Compose.
- PostgreSQL health check and service dependency management.
- `GET /health` endpoint with database connectivity verification.
- Initial automated unit tests.

## Prerequisites

Install the following tools:

- Git
- Node.js 24+
- npm
- Docker Desktop with Docker Compose

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yeranonyram/HARVIZY.git
cd HARVIZY
```

### 2. Configure environment variables

Create your local `.env` file from the example:

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**Linux/macOS:**

```bash
cp .env.example .env
```

Review the environment variables in `.env` and adjust them according to your local configuration.

Never commit `.env` files or real credentials.

### 3. Start the environment

Build and start the API and PostgreSQL services:

```bash
docker compose up -d --build
```

Docker Compose waits for PostgreSQL to become healthy before starting the API.

### 4. Verify the services

Check container status:

```bash
docker compose ps
```

Check the API health endpoint:

```bash
curl http://localhost:3000/health
```

A successful response should return HTTP 200 and include:

```json
{
  "status": "ok",
  "service": "HARVIZY API",
  "database": "connected",
  "timestamp": "2026-11-03T17:19:33.287Z"
}
```

The timestamp is generated dynamically.

### 5. View service logs

```bash
docker compose logs -f api
```

For PostgreSQL:

```bash
docker compose logs -f postgres
```

## Development Commands

Run these commands from the repository root.

### Build the API

```bash
npm run build --prefix apps/api
```

### Run unit tests

```bash
npm run test --prefix apps/api -- --runInBand
```

### Run end-to-end tests

```bash
npm run test:e2e --prefix apps/api
```

### Run tests with coverage

```bash
npm run test:cov --prefix apps/api
```

### Run the API in development mode

Start PostgreSQL first:

```bash
docker compose up -d postgres
```

Then start the NestJS development server:

```bash
npm run start:dev --prefix apps/api
```

The API will be available at `http://localhost:3000`.

## Stop the Environment

Stop and remove the containers without deleting persistent database data:

```bash
docker compose down
```

To also remove the PostgreSQL volume and permanently delete its stored data:

```bash
docker compose down -v
```

**Warning:** The second command deletes the database volume. Use it only when you intentionally want to erase the local database.

## Security

- Never commit API keys, passwords, or `.env` files.
- Keep AI provider credentials on the backend.
- Validate user input and protect sensitive endpoints.
- Require explicit authorization for local computer actions.
- Never expose unrestricted shell execution to the AI model.

## Development Methodology

HARVIZY follows an iterative workflow combining Scrum planning with Kanban.

Work is managed through:

- GitHub Issues.
- GitHub Projects.
- Feature branches.
- Descriptive commits.
- Pull Requests and reviews.
- Automated tests and acceptance criteria.

## Roadmap

1. Define architecture and MVP scope.
2. Configure development infrastructure.
3. Establish backend foundation.
4. Implement AI conversations and persistence.
5. Develop the web interface.
6. Add voice interaction and controlled local tools.
7. Integrate Android access.
8. Implement CI/CD and additional automated testing.

## License

To be defined.