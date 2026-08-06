# Agent Guidelines

Use the Docker Compose environment for all development, builds, checks, and tests. Do not rely on a host-installed Hugo or other host tooling, because the container defines the supported tool versions and dependencies.

- Start the development server with `docker compose up --build`.
- Run one-off commands with `docker compose run --rm app <command>`.
- Create content with `docker compose run --rm app hugo new <path>`.
- Validate changes with `docker compose run --rm app hugo --verbose --minify`.
- If dependencies or the Docker image change, rebuild with `docker compose build` before validating.

The site is mounted at `/src` inside the `app` service, so edits made in the working tree are immediately available in the container.
