<div align="center">

# Your OMSS Compliant Streaming Backend Template 🚀

**Production‑ready starter template** for building OMSS‑compliant streaming backends. Includes server setup, provider system, linting, and an example provider.

</div>

## Features ✅

- 🚀 **Ready in 5 minutes** – install, set TMDB key, run
- 📦 **@omss/framework** – official OMSS implementation
- 🔌 **Auto‑discovery** – drop provider files into `providers/`
- 🛡️ **Type safety & formatting** – Prettier + TypeScript
- 📊 **Production‑ready** – Redis cache, Docker support
- 🎭 **Example provider** – fully commented reference implementation
- 🔄 **Hot reload** – `npm run dev` for development

## Quick Start ⏱️

```bash
# Clone & install
git clone https://github.com/omss-spec/template.git my-streaming-backend
cd my-streaming-backend
npm install

# Copy env template
cp .env.example .env
# !Add your TMDB API key!

# Run dev server (auto-reload)
npm run dev
```

**✅ Server running at http://localhost:3000**

Great! You can now add your providers!

## 📁 Structure

```
template/
├── src/
│   ├── server.ts           # Main server entrypoint
│   ├── providers/          # Auto-discovered providers
│   │   └── example.ts      # Reference provider
├── .env.example            # Environment template
├── .prettierrc             # Prettier config
├── tsconfig.json           # TypeScript config
├── package.json            # Dependencies + scripts
```

---

## 🛠️ Scripts

```bash
npm run dev      # Dev server with hot reload (tsx watch)
npm run main     # Run server (production mode)
```

---

## 🔌 Adding Providers

**1. Create a provider** (extends `BaseProvider`):

```ts
// src/providers/my-site.ts
import { BaseProvider } from '@omss/framework';

export class MySiteProvider extends BaseProvider {
    readonly id = 'my-site';
    readonly name = 'My Site';
    readonly BASE_URL = 'https://my-site.com';
    readonly capabilities = { supportedContentTypes: ['movies', 'tv'] };

    // Implement getMovieSources() & getTVSources()
}
```

**2. Auto‑discovered** – restart server or use `npm run dev` (watches for changes)

**3. Register manually** (in `server.ts`):

```ts
server.getRegistry().register(new MySiteProvider());
```

---

## ⚙️ Environment

Copy `.env.example` → `.env` and set:

```env
# Required
TMDB_API_KEY=your_tmdb_api_key_here

# Optional
PORT=3000
HOST=localhost
NODE_ENV=development
PUBLIC_URL=http://localhost:3000

# Redis (for production)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

---

## 🚀 Production Deployment

### Docker Compose (dev/prod)

```bash
# Start Redis + server
docker-compose up -d

# Or just Redis
docker-compose up redis -d
npm run start
```

### Docker (single container)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 🔧 Development Workflow

```bash
# 1. Install
npm install

# 3. Add providers to src/providers/

# 2. Dev server (auto-reload + type checking)
npm run dev

# 4. Format code
npm run format

# 5. Build for prod
npm run build
npm run start
```

---

## 📚 Reference

- **OMSS Framework**: [`@omss/framework` on npm](https://www.npmjs.com/package/@omss/framework) [github](https://github.com/ossf/model-signing-spec)
- **OMSS Spec**: [github.com/omss-spec/omss-spec](https://github.com/omss-spec/omss-spec)
- **Example Provider**: `src/providers/example.ts` – fully commented
- **Server Examples**: `src/server.ts` – multiple configs

**See `src/providers/example.ts`** for a complete provider implementation with error handling, logging, proxying, and type safety.

---

## 🤝 Contributing

Contributions are welcome! Please read [our contributing guidelines](https://github.com/omss-spec/omss-spec/blob/main/CONTRIBUTING.md) before submitting PRs.

---

## 📄 License

MIT © OMSS Foundation

---

**⭐ Star this repo** | **[Click on 'Use this template' & customize]** | **[OMSS Spec](https://github.com/omss-spec/omss-spec)**
