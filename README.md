# Galli Agent

Galli Agent is a full-stack logistics intelligence platform that combines a React frontend with a Go backend to analyze delivery requests, evaluate operational conditions, and generate actionable dispatch insights.

The platform uses a deterministic multi-agent decision engine to assess routes, weather, traffic, operational risk, and delivery partner suitability. AI-generated planning, operational explanations, and safety reflections complement the deterministic workflow, providing additional context without replacing core business logic.

The project is organized as a monorepo containing independent frontend and backend applications, allowing both components to evolve together while remaining modular and maintainable.

---

## Live Demo

The application is available online at:

**Website:** <https://galli-agent-frontend.vercel.app/>

> The deployed application communicates with the production backend and relies on external services for routing, traffic, weather, and AI-generated insights. Availability may vary depending on third-party service uptime and API quotas.

---

## Repository Structure

```text
.
├── frontend/    # React web application
└── backend/     # Go backend and multi-agent decision engine
```

Each module contains its own documentation.

| Module                   | Description                                                                   |
| :----------------------- | :---------------------------------------------------------------------------- |
| [`frontend`](./frontend) | React application, UI architecture, setup instructions, and development guide |
| [`backend`](./backend)   | Go backend, multi-agent architecture, API documentation, and deployment guide |

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- Zustand
- React Hook Form
- Leaflet
- OpenStreetMap

### Backend

- Go
- Chi
- Gin
- PostgreSQL
- Multi-Agent Decision Engine
- Gemini API
- OpenRouteService API
- TomTom Traffic API
- OpenWeather API

---

## Core Capabilities

- Analyze delivery requests using a deterministic multi-agent workflow.
- Evaluate route conditions, weather, traffic, and operational risk.
- Recommend suitable delivery partners based on operational criteria.
- Generate AI-assisted mission planning and operational summaries.
- Present delivery intelligence through a responsive web dashboard.

---

## Features

- Delivery request analysis
- Multi-agent decision engine
- Route intelligence
- Live weather analysis
- Traffic analysis
- Operational risk assessment
- Delivery partner evaluation
- AI mission planning
- AI operational explanations
- AI safety reflections
- Interactive route visualization
- Modern responsive web interface

---

## Project Architecture

The platform separates deterministic operational decisions from AI-assisted reasoning.

The backend executes a multi-agent workflow that analyzes delivery conditions using independent specialized agents. Once the deterministic decision has been produced, AI services generate mission planning, operational explanations, and safety reflections without influencing the final outcome.

This approach maintains predictable business logic while enriching the user experience with contextual insights.

---

## Getting Started

Clone the repository.

```bash
git clone https://github.com/Gautam2920/galli-agent.git
cd galli-agent
```

Choose the component you want to run.

- **Frontend:** See the [Frontend README](./frontend/README.md)
- **Backend:** See the [Backend README](./backend/README.md)

Each module contains its own installation, configuration, and development instructions.

---

## Repository Layout

```text
galli-agent/
├── frontend/
│   └── React application
│
├── backend/
│   └── Go backend
│
└── README.md
```

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
