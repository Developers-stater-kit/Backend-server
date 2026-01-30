
export interface BuildRepo {
    type: "framework" | "authentication" | "database" | "payments";
    key: string;          
    repoName: string;     
    order: number;        
    meta?: Record<string, any>; 
}

/**
 * Final build plan sent to CLI
 */
export interface ComposeResponse {
    framework: {
        key: string;
        repoName: string;
    };
    repos: BuildRepo[];
}
