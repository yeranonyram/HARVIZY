# HARVIZ — Architecture Document

## 1. Purpose

Define the initial architecture of HARVIZ, a personal AI assistant for Windows and Android, using a hybrid local and cloud strategy.

This document records the main architectural decisions, component responsibilities, development conventions, and planned extensions.

## 2. MVP Scope

The initial MVP will include:

- A responsive web interface.
- A NestJS REST API.
- AI conversation through a configurable provider.
- PostgreSQL persistence for conversations and messages.
- Local development using Docker Compose.
- Environment-based configuration and basic security controls.
- A health-check endpoint for service availability.

Voice interaction, native Android, and desktop automation are planned for later iterations.

## 3. System Components

### 3.1 Frontend

**Technology:** React, TypeScript, and Vite.

Responsibilities:

- Render the chat interface.
- Send requests to the backend API.
- Display AI responses and conversation history.
- Handle loading, validation, and error states.

### 3.2 Backend API

**Technology:** NestJS and TypeScript.

Responsibilities:

- Expose REST endpoints.
- Validate incoming requests.
- Execute application and business logic.
- Coordinate AI provider integrations.
- Access persistent data through repositories and services.
- Enforce authentication and authorization when implemented.

### 3.3 Database

**Technology:** PostgreSQL with TypeORM.

Responsibilities:

- Store conversations and messages.
- Support future user, role, and settings data.
- Enforce data relationships and database constraints.

Database schema synchronization is disabled in the application configuration. Schema changes should be managed through migrations when database entities are introduced.

### 3.4 AI Integration

A dedicated backend module will communicate with the selected AI provider.

Responsibilities:

- Isolate provider-specific implementation details.
- Keep provider credentials on the server.
- Normalize provider responses for the application.
- Handle provider errors and timeouts.

The AI provider must be configurable without exposing secrets to the frontend.

### 3.5 Infrastructure

Docker Compose provides the local PostgreSQL service. The NestJS API runs in the local development environment, and the frontend can initially run through Vite.

Environment variables configure service connections and other environment-specific values.

## 4. Backend Architecture

The backend follows NestJS modular architecture, separating HTTP handling, business logic, configuration, and infrastructure concerns.

### 4.1 Directory Structure

The initial backend structure is:

```text
apps/api/src/
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   └── pipes/
├── config/
├── modules/
│   └── health/
│       ├── health.controller.ts
│       ├── health.controller.spec.ts
│       └── health.module.ts
├── app.controller.ts
├── app.controller.spec.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

The `common` and `config` directories provide initial organizational boundaries. Additional files will be introduced when their functionality is implemented.

### 4.2 Modules

Modules group related functionality and define their dependencies.

Examples planned for future iterations:

- `HealthModule`: service health checks.
- `AuthModule`: authentication and token management.
- `UsersModule`: user management.
- `ConversationsModule`: conversations and messages.
- `AiModule`: AI provider integration.

Only modules that have been implemented should be treated as available application functionality.

### 4.3 Controllers

Controllers handle HTTP requests and responses.

Responsibilities:

- Define endpoint routes and HTTP methods.
- Receive validated request data.
- Delegate application work to services when appropriate.
- Return suitable response data.

Controllers should not contain complex business logic or direct database operations.

### 4.4 Services

Services contain application logic and coordinate operations required by a use case.

Responsibilities:

- Apply business rules.
- Coordinate integrations and persistence.
- Handle application-level errors.
- Remain independent of HTTP-specific concerns whenever practical.

### 4.5 Common Components

- `common/decorators/`: reusable metadata and parameter decorators.
- `common/filters/`: centralized exception handling.
- `common/guards/`: route access and authorization checks.
- `common/pipes/`: request transformation and validation.

These components will be implemented as the corresponding requirements arise.

### 4.6 Configuration

Application configuration is managed through environment variables and NestJS configuration services.

Rules:

- Do not commit `.env` files or credentials.
- Keep `.env.example` updated with required variable names and safe example values.
- Validate required configuration when appropriate.
- Never expose database passwords, JWT secrets, or AI provider keys to the frontend.

## 5. Health Check

The initial health endpoint is:

`GET /health`

A successful response reports:

- `status`: service status.
- `service`: application identifier.
- `timestamp`: response generation time in ISO 8601 format.

This endpoint verifies that the API is responding. It does not, by itself, guarantee that every external dependency is healthy.

## 6. Data Access and Persistence

PostgreSQL is the primary relational database.

TypeORM provides database integration. When persistence features are implemented:

- Entities will represent persisted domain data.
- Services will coordinate application operations.
- Repositories or appropriate TypeORM data-access mechanisms will handle database queries.
- Migrations will manage schema changes.
- Sensitive data will be handled according to its security requirements.

The application currently has database connection configuration, but conversation and message persistence remain future work.

## 7. Communication Flow

The planned AI conversation flow is:

1. The user submits a message through the frontend.
2. The frontend sends an HTTP request to the backend.
3. The backend validates the request and checks access permissions when authentication is implemented.
4. The conversation service coordinates the request.
5. The AI integration module requests a response from the configured provider.
6. The backend returns the response to the frontend.
7. Conversation and message data are persisted when that functionality is implemented.

## 8. Security Principles

- Store secrets in environment variables.
- Exclude `.env` files from version control.
- Validate incoming requests.
- Apply authentication and authorization to protected endpoints.
- Use appropriate password hashing when user authentication is implemented.
- Apply request limits and error handling where appropriate.
- Use HTTPS for production communication.
- Restrict local automation to explicitly approved actions.
- Never expose unrestricted shell execution to the AI model.
- Avoid returning secrets or sensitive internal details in error responses.

## 9. Development Conventions

### Naming

- Use descriptive English names for files, classes, methods, and variables.
- Use PascalCase for classes and NestJS modules.
- Use camelCase for variables and methods.
- Follow NestJS file suffix conventions, such as `.module.ts`, `.controller.ts`, `.service.ts`, and `.spec.ts`.

### Code Organization

- Group functionality by module.
- Keep controllers focused on HTTP concerns.
- Keep business rules in services or appropriate domain components.
- Reuse common components when they provide a clear benefit.
- Avoid introducing abstractions before they are needed.

### Quality and Version Control

- Build the backend before submitting changes for review.
- Run relevant automated tests.
- Use descriptive commits.
- Develop features in dedicated Git branches.
- Open Pull Requests for review before merging into `main`.
- Track work through GitHub Issues and GitHub Projects.
- Update documentation when architectural decisions change.

## 10. Architectural Decisions

| Decision | Rationale |
|---|---|
| NestJS with TypeScript | Modular backend structure and strong typing |
| PostgreSQL | Relational persistence for conversations and future user data |
| TypeORM | Integration between the NestJS application and PostgreSQL |
| Docker Compose | Reproducible local database environment |
| Environment-based configuration | Separation of configuration and source code |
| Dedicated AI integration module | Isolation of provider-specific code |
| Feature branches and Pull Requests | Reviewable, traceable changes |
| Database migrations | Controlled evolution of the database schema |

These decisions may be revised when implementation experience or new requirements justify a change.

## 11. Hybrid Strategy

Cloud services will provide AI capabilities that require Internet access. Future local capabilities may include approved Windows automation and optional local AI inference.

Cloud AI will not be available offline unless a separate local model or equivalent capability is configured.

## 12. Development Workflow

- Track requirements through GitHub Issues.
- Organize work through GitHub Projects.
- Implement changes on feature branches.
- Build and test before requesting review.
- Review Pull Requests before merging.
- Keep architectural documentation synchronized with the implementation.

## 13. Future Extensions

- Voice input and speech synthesis.
- Windows desktop agent.
- Native Android application.
- Optional local AI inference.
- Notifications and workflow automation.
- Continuous integration and deployment.

## 14. Current Implementation Status

Implemented:

- Initial NestJS application.
- Environment-based configuration.
- PostgreSQL connection configuration.
- Health module and `GET /health` endpoint.
- Initial health controller test.

Planned or not yet implemented:

- Authentication and user management.
- Conversation and message persistence.
- AI provider integration.
- Frontend integration.
- Voice interaction and local desktop automation.

This document describes the current architecture and intended direction. Implementation details may change as technical decisions are validated.