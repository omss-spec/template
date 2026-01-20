import { OMSSServer } from '@omss/framework';
import 'dotenv/config';

async function main() {
    const server = new OMSSServer({
        name: 'OMSS Backend',
        version: '1.0.0',

        // Network
        host: process.env.HOST ?? 'localhost',
        port: Number(process.env.PORT ?? 3000),
        publicUrl: process.env.PUBLIC_URL,

        // Cache (memory for dev, Redis for prod)
        cache: {
            type: process.env.CACHE_TYPE as 'memory' | 'redis' ?? 'memory',
            ttl: {
                sources: 60 * 60,
                subtitles: 60 * 60 * 24,
            },
            redis: {
                host: process.env.REDIS_HOST ?? 'localhost',
                port: Number(process.env.REDIS_PORT ?? 6379),
                password: process.env.REDIS_PASSWORD,
            },
        },

        // TMDB (required)
        tmdb: {
            apiKey: process.env.TMDB_API_KEY!,
            cacheTTL: 24 * 60 * 60, // 24h
        },
    });

    // Register providers
    const registry = server.getRegistry();

    // Your custom providers (auto-discovered from ./src/providers/)
    await registry.discoverProviders('./src/providers');

    await server.start();
}

main().catch(() => {
    process.exit(1);
});
