# HARVIZY
HARVIZX — A futuristic personal AI assistant inspired by Iron Man's J.A.R.V.I.S., featuring AI, voice interaction, automation, and intelligent system management.



# HARVIZ — AI Personal Assistant

HARVIZ is a personal AI assistant project inspired by futuristic
virtual assistants. Its goal is to integrate artificial intelligence,
voice interaction, desktop automation, and mobile access.

## Project Status

Early development — Sprint 0.

## Objectives

- Provide an AI-powered conversational interface.
- Build a modular backend API.
- Support desktop and mobile access.
- Persist conversations using PostgreSQL.
- Add voice interaction and local automation in future releases.
- Apply secure software development and DevOps practices.

## Planned Technology Stack

- Frontend: React, TypeScript, Vite
- Backend: NestJS, TypeScript
- Database: PostgreSQL
- Infrastructure: Docker Compose
- Version control: Git and GitHub
- AI: Configurable external AI provider
- Mobile: Android support, initially through a responsive web interface

## Architecture

HARVIZ will use a modular architecture with a client application,
a backend API, a database, and an AI integration layer.

See [Architecture Documentation](docs/architecture.md).

## Development Methodology

The project follows an iterative workflow combining Scrum planning
with a Kanban board.

Work is tracked through GitHub Issues, GitHub Projects,
feature branches, code reviews, and acceptance criteria.

## Security

- Never commit API keys, passwords, or `.env` files.
- Keep AI provider credentials on the backend.
- Validate user input and protect sensitive endpoints.
- Require explicit authorization for local computer actions.

## Roadmap

1. Define the architecture and MVP scope.
2. Configure the development environment.
3. Build the backend foundation.
4. Integrate AI conversations and persistence.
5. Develop the desktop interface.
6. Add voice interaction and controlled local tools.
7. Integrate Android access.
8. Add automated tests and CI/CD.

## Project Status Disclaimer

All features listed in the roadmap are planned and may not yet
be implemented.

## License

To be defined.
