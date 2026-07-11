#!/usr/bin/env bash
# Usage: scaffold.sh <project-dir> "<description>" <default-port>
set -euo pipefail

PROJECT_DIR="${1:?project dir required}"
DESCRIPTION="${2:-A new local-first tool.}"
DEFAULT_PORT="${3:-3000}"

if [ -e "$PROJECT_DIR" ]; then
  echo "Error: $PROJECT_DIR already exists. Refusing to overwrite." >&2
  exit 1
fi

mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"
mkdir -p packages/shared-types/src packages/server/src packages/web/src rules

########################################
# Root package.json
########################################
cat > package.json <<EOF
{
  "name": "$(basename "$PROJECT_DIR")",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "dev": "npm run dev --workspace packages/server & npm run dev --workspace packages/web",
    "build": "npm run build --workspace packages/shared-types && npm run build --workspace packages/web && npm run build --workspace packages/server",
    "start": "npm run build && npm run start --workspace packages/server",
    "test": "npm run test --workspace packages/server && npm run test --workspace packages/web"
  }
}
EOF

########################################
# shared-types package
########################################
cat > packages/shared-types/package.json <<'EOF'
{
  "name": "shared-types",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "^5.5.0"
  }
}
EOF

cat > packages/shared-types/tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
EOF

cat > packages/shared-types/src/index.ts <<'EOF'
// The single source of truth for API request/response shapes.
// Both packages/server and packages/web import from here — never
// redefine these interfaces independently on either side.

export interface HelloResponse {
  message: string;
}
EOF

########################################
# server package
########################################
cat > packages/server/package.json <<'EOF'
{
  "name": "server",
  "version": "0.1.0",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.19.0",
    "shared-types": "*"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/jest": "^29.5.0",
    "@types/node": "^20.0.0",
    "@types/supertest": "^6.0.0",
    "jest": "^29.7.0",
    "supertest": "^7.0.0",
    "ts-jest": "^29.1.0",
    "tsx": "^4.16.0",
    "typescript": "^5.5.0"
  }
}
EOF

cat > packages/server/tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src"]
}
EOF

cat > packages/server/jest.config.js <<'EOF'
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
EOF

cat > packages/server/src/index.ts <<'EOF'
import express from "express";
import path from "path";
import type { HelloResponse } from "shared-types";

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.get("/api/hello", (_req, res) => {
  const body: HelloResponse = { message: "Hello, world!" };
  res.json(body);
});

// Serve the built frontend on the SAME port as the API.
const webDist = path.join(__dirname, "../../web/dist");
app.use(express.static(webDist));
app.get("*", (_req, res) => {
  res.sendFile(path.join(webDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
EOF

cat > packages/server/src/index.test.ts <<'EOF'
describe("server smoke test", () => {
  it("placeholder passes", () => {
    expect(1 + 1).toBe(2);
  });
});
EOF

########################################
# web package
########################################
cat > packages/web/package.json <<'EOF'
{
  "name": "web",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "jest"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "shared-types": "*"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "dotenv": "^16.4.0",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "ts-jest": "^29.1.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0"
  }
}
EOF

cat > packages/web/tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
EOF

cat > packages/web/jest.config.js <<'EOF'
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
EOF

cat > packages/web/index.html <<'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

cat > packages/web/vite.config.ts <<'EOF'
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Reads PORT from the repo-root .env so dev-mode proxy matches the
  // single-port target the built app will actually run on.
  const env = loadEnv(mode, process.cwd() + "/../..", "");
  const apiPort = env.PORT || "3000";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": `http://localhost:${apiPort}`,
      },
    },
  };
});
EOF

cat > packages/web/src/main.tsx <<'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

cat > packages/web/src/App.tsx <<'EOF'
export default function App() {
  return <h1>Hello, world!</h1>;
}
EOF

cat > packages/web/src/App.test.tsx <<'EOF'
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders hello world", () => {
  render(<App />);
  expect(screen.getByText("Hello, world!")).toBeInTheDocument();
});
EOF

########################################
# Docker
########################################
cat > Dockerfile <<'EOF'
# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
COPY packages/shared-types/package.json packages/shared-types/package.json
COPY packages/server/package.json packages/server/package.json
COPY packages/web/package.json packages/web/package.json
RUN npm install
COPY . .
RUN npm run build

# --- Runtime stage ---
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages/server/dist ./packages/server/dist
COPY --from=build /app/packages/web/dist ./packages/web/dist
COPY --from=build /app/packages/shared-types/dist ./packages/shared-types/dist
EXPOSE 3000
CMD ["node", "packages/server/dist/index.js"]
EOF

cat > docker-compose.yml <<EOF
services:
  app:
    build: .
    ports:
      - "\${PORT:-${DEFAULT_PORT}}:\${PORT:-${DEFAULT_PORT}}"
    environment:
      - PORT=\${PORT:-${DEFAULT_PORT}}
EOF

cat > .env.example <<EOF
# Copy to .env and change per-project to avoid port collisions with
# other local-first tools running at the same time.
PORT=${DEFAULT_PORT}
EOF
cp .env.example .env

########################################
# Misc
########################################
cat > .gitignore <<'EOF'
node_modules/
dist/
.env
*.log
EOF

cat > README.md <<EOF
# $(basename "$PROJECT_DIR")

${DESCRIPTION}

Single-port local-first app: one server serves both the API and the UI.

## Dev (hot reload, two processes, still single logical port via proxy)

\`\`\`bash
cp .env.example .env   # adjust PORT if it collides with another running tool
npm install
npm run dev
\`\`\`

## Production-style run (single port, single process)

\`\`\`bash
npm run start
\`\`\`

## Docker

\`\`\`bash
docker compose up --build
\`\`\`

## Test

\`\`\`bash
npm run test
\`\`\`
EOF

cat > rules/README.md <<'EOF'
# Rules / Lessons Log

Debugging-loop entries go here, per the standing rule in ~/.claude/CLAUDE.md.
Append `YYYY-MM-DD-short-slug.md` files as real issues get resolved.
EOF

cp /mnt/skills/user/init-local-first-node-project/assets/CLAUDE.md.template CLAUDE.md
sed -i "s/{{DESCRIPTION}}/${DESCRIPTION}/g" CLAUDE.md
sed -i "s/{{DEFAULT_PORT}}/${DEFAULT_PORT}/g" CLAUDE.md

########################################
# Install + git init
########################################
npm install --silent
git init -q
git add -A

echo "Local-first Node project scaffolded at $(pwd)"
