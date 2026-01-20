import { BaseProvider } from '@omss/framework';
import type { ProviderCapabilities, ProviderMediaObject, ProviderResult } from '@omss/framework';

export class ExampleProvider extends BaseProvider {
    readonly id = 'example-provider';
    readonly name = 'Example Provider';
    readonly enabled = true;
    readonly BASE_URL = 'https://example.com';
    readonly HEADERS = {
        Referer: 'https://example.com',
        'User-Agent': 'Mozilla/5.0',
    };

    readonly capabilities: ProviderCapabilities = {
        supportedContentTypes: ['movies', 'tv'],
    };

    async getMovieSources(media: ProviderMediaObject): Promise<ProviderResult> {
        try {
            /*const response = await axios.get(`${this.BASE_URL}/movie/${media.tmdbId}`, {
                headers: this.HEADERS,
            });
            */
            // Your implementation here

            return {
                sources: [],
                subtitles: [],
                diagnostics: [],
            };
        } catch (error) {
            return {
                sources: [],
                subtitles: [],
                diagnostics: [
                    {
                        code: 'PROVIDER_ERROR',
                        message: `${this.name} failed`,
                        field: '',
                        severity: 'error',
                    },
                ],
            };
        }
    }

    async getTVSources(media: ProviderMediaObject): Promise<ProviderResult> {
        // Your implementation here

        return {
            sources: [],
            subtitles: [],
            diagnostics: [],
        };
    }
}
