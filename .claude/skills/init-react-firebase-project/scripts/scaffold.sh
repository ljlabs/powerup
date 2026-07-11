#!/usr/bin/env bash
# Usage: scaffold.sh <project-dir> "<description>"
set -euo pipefail

PROJECT_DIR="${1:?project dir required}"
DESCRIPTION="${2:-A new website.}"

if [ -e "$PROJECT_DIR" ]; then
  echo "Error: $PROJECT_DIR already exists. Refusing to overwrite." >&2
  exit 1
fi

mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"
mkdir -p functions/src web/src e2e/tests rules

########################################
# Root package.json (npm workspaces)
########################################
cat > package.json <<'EOF'
{
  "name": "root",
  "private": true,
  "workspaces": ["web", "functions"],
  "scripts": {
    "dev": "npm run dev --workspace web",
    "emulators": "firebase emulators:start",
    "test": "npm run test --workspace web && npm run test --workspace functions",
    "test:e2e": "playwright test --config e2e/playwright.config.ts",
    "build": "npm run build --workspace web && npm run build --workspace functions"
  },
  "devDependencies": {
    "@playwright/test": "^1.46.0",
    "firebase-tools": "^13.0.0"
  }
}
EOF

########################################
# Firebase config
########################################
cat > firebase.json <<'EOF'
{
  "hosting": {
    "public": "web/dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  },
  "functions": {
    "source": "functions",
    "predeploy": ["npm --prefix functions run build"]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 8080 },
    "functions": { "port": 5001 },
    "hosting": { "port": 5000 },
    "ui": { "enabled": true, "port": 4000 },
    "singleProjectMode": true
  }
}
EOF

cat > .firebaserc <<'EOF'
{
  "projects": {
    "default": "CHANGE-ME-project-id"
  }
}
EOF

cat > firestore.rules <<'EOF'
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Default deny. Open up per-collection rules as the app needs them.
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
EOF

cat > firestore.indexes.json <<'EOF'
{
  "indexes": [],
  "fieldOverrides": []
}
EOF

########################################
# functions/ (Firebase Functions, TS, Jest)
########################################
cat > functions/package.json <<'EOF'
{
  "name": "functions",
  "private": true,
  "main": "lib/index.js",
  "scripts": {
    "build": "tsc",
    "test": "jest"
  },
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0"
  },
  "devDependencies": {
    "@types/jest": "^29.5.0",
    "@types/node": "^20.0.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.0",
    "typescript": "^5.5.0"
  }
}
EOF

cat > functions/tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "lib",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src"]
}
EOF

cat > functions/jest.config.js <<'EOF'
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
};
EOF

cat > functions/src/index.ts <<'EOF'
import * as functions from "firebase-functions";

export const helloWorld = functions.https.onRequest((_req, res) => {
  res.send("Hello, world!");
});
EOF

cat > functions/src/index.test.ts <<'EOF'
describe("functions smoke test", () => {
  it("placeholder passes", () => {
    expect(1 + 1).toBe(2);
  });
});
EOF

########################################
# web/ (Vite + React + TS, Jest + Testing Library)
########################################
cat > web/package.json <<'EOF'
{
  "name": "web",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "jest"
  },
  "dependencies": {
    "firebase": "^10.12.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "ts-jest": "^29.1.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0"
  }
}
EOF

cat > web/tsconfig.json <<'EOF'
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

cat > web/jest.config.js <<'EOF'
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
EOF

cat > web/index.html <<'EOF'
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

cat > web/vite.config.ts <<'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
EOF

cat > web/src/main.tsx <<'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

cat > web/src/App.tsx <<'EOF'
export default function App() {
  return <h1>Hello, world!</h1>;
}
EOF

cat > web/src/App.test.tsx <<'EOF'
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders hello world", () => {
  render(<App />);
  expect(screen.getByText("Hello, world!")).toBeInTheDocument();
});
EOF

########################################
# e2e/ (Playwright)
########################################
cat > e2e/playwright.config.ts <<'EOF'
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  webServer: {
    command: "npm run dev --workspace web",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:5173",
  },
});
EOF

cat > e2e/tests/example.spec.ts <<'EOF'
import { test, expect } from "@playwright/test";

test("home page shows hello world", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Hello, world!")).toBeVisible();
});
EOF

########################################
# Misc
########################################
cat > .gitignore <<'EOF'
node_modules/
dist/
lib/
.firebase/
firebase-debug.log
firestore-debug.log
ui-debug.log
.env
EOF

cat > README.md <<EOF
# $(basename "$PROJECT_DIR")

${DESCRIPTION}

## Dev

\`\`\`bash
npm install
npm run dev          # Vite dev server
npm run emulators     # Firebase emulator suite (separate terminal)
\`\`\`

## Test

\`\`\`bash
npm run test          # Jest: web + functions
npm run test:e2e      # Playwright, boots dev server automatically
\`\`\`
EOF

cat > rules/README.md <<'EOF'
# Rules / Lessons Log

Debugging-loop entries go here, per the standing rule in ~/.claude/CLAUDE.md.
Append `YYYY-MM-DD-short-slug.md` files as real issues get resolved.
EOF

cp /mnt/skills/user/init-react-firebase-project/assets/CLAUDE.md.template CLAUDE.md
sed -i "s/{{DESCRIPTION}}/${DESCRIPTION}/g" CLAUDE.md

########################################
# Install + git init
########################################
npm install --silent
npx --yes playwright install --with-deps chromium || true
git init -q
git add -A

echo "React+Firebase project scaffolded at $(pwd)"
