
# HARVIZ — Architecture Document

## 1. Purpose

Define the initial architecture of HARVIZ, a personal AI assistant
for Windows and Android, with a hybrid local and cloud strategy.

## 2. MVP Scope

The initial MVP will include:

- A responsive web interface.
- A NestJS REST API.
- AI conversation through a configurable provider.
- PostgreSQL persistence for conversations.
- Local development using Docker Compose.
- Environment-based configuration and basic security controls.

Voice interaction, native Android, and desktop automation are
planned for later iterations.

## 3. System Components

### Frontend

React, TypeScript, and Vite.

Responsibilities:
- Render the chat interface.
- Send requests to the backend.
- Display responses and conversation history.

### Backend API

NestJS and TypeScript.

Responsibilities:
- Validate requests.
- Apply business logic.
- Communicate with the AI provider.
- Access persistent data.
- Enforce authentication and authorization when implemented.

### Database

PostgreSQL.

Responsibilities:
- Store conversations and messages.
- Support future user and settings data.

### AI Integration

A dedicated backend module will communicate with the selected
AI provider. Provider credentials must remain on the server.

### Infrastructure

Docker Compose will support local development of the backend
and database. The frontend can initially run through Vite.

## 4. Communication Flow

1. The user submits a message through the frontend.
2. The frontend sends a request to the backend API.
3. The backend validates the request.
4. The AI integration module requests a response.
5. The backend returns the response to the frontend.
6. Conversation data is persisted when the relevant feature
   is implemented.

## 5. Hybrid Strategy

Cloud capabilities will provide AI services requiring Internet
access. Future local capabilities may include approved Windows
automation and optional local AI inference.

Cloud AI will not be available offline unless a separate local
model or equivalent capability is configured.

## 6. Security Principles

- Store secrets in environment variables.
- Exclude `.env` files from version control.
- Validate all incoming requests.
- Protect endpoints with authentication when required.
- Restrict local automation to explicitly approved actions.
- Never expose unrestricted shell execution to the AI model.
- Use HTTPS for production communication.

## 7. Development Workflow

- Track work using GitHub Issues.
- Organize tasks in GitHub Projects.
- Use feature branches and descriptive commits.
- Review and test changes before merging.
- Document architectural decisions as the project evolves.

## 8. Future Extensions

- Voice input and speech synthesis.
- Desktop agent for Windows.
- Native Android application.
- Optional local AI inference.
- Notifications and workflow automation.
- Continuous integration and deployment.

## 9. Status

This document describes the proposed initial architecture.
Implementation details may change as technical decisions
are validated during development.
