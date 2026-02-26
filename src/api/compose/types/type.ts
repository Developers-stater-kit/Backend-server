export type FileType = {
    path: string;
    content: string;
    renameto: string;
};


export interface BuildStep {
    type: "framework" | "ui" | "db-orm" | "authentication" | "payments";
    key: string;
    repoName?: string;  // for framework 
    order: number;
    dependencies?: string[];
    devDependencies?: string[];
    envVars?: string[];
    commands?: any;    // for shadcn 
    files?: FileType[];    // for db, auth 
}

/**
 * Final build plan sent to CLI
 */
export interface ComposeResponse {
    layers: {
        ui: {
            shadcn: boolean;
        };
        database?: {
            orm: string;
            dbEngine: string;
            dbProvider: string;
        };
        authentication?: {
            providerName: string;
            methods: string[];
            socialProviders?: string[];
        };
        payments?: {
            provider: string;
        };
    };
    workflow: BuildStep[];
    metadata: {
        envVars: string[];
        dependencies: string[];
        devDependencies: string[];
    };
}


export const Command = {
    shadcn: {
        bun: {
            init: "bunx --bun shadcn@latest init",
            addComponent: "bunx --bun shadcn@latest add "
        },

        npm: {
            init: "npx shadcn@latest init",
            addComponent: "npx shadcn@latest add "
        },

        pnpm: {
            init: "pnpm dlx shadcn@latest init",
            addComponent: "pnpm dlx shadcn@latest add "
        }
    }
}
