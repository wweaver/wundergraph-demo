import { configureWunderGraphApplication, cors, EnvironmentVariable, templates } from '@wundergraph/sdk';
import operations from './wundergraph.operations';
import server from './wundergraph.server';

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
    apis: [],
    server,
    operations,
    generate: {
        codeGenerators: [
            {
                templates: [
                    // use all the typescript react templates to generate a client
                    ...templates.typescript.all,
                ],
            },
        ],
    },
    cors: {
        ...cors.allowAll,
        allowedOrigins:
            process.env.NODE_ENV === 'production'
                ? [
                    // change this before deploying to production to the actual domain where you're deploying your app
                    'http://localhost:3000',
                ]
                : ['http://localhost:3000', new EnvironmentVariable('WG_ALLOWED_ORIGIN')],
    },
    security: {
        enableGraphQLEndpoint: process.env.NODE_ENV !== 'production' || process.env.GITPOD_WORKSPACE_ID !== undefined,
    },
});
