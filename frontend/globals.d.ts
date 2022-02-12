declare namespace NodeJS {
  // Environment variable name definition
  interface ProcessEnv {
    /** Current Node.js runtime environment */
    readonly NODE_ENV: 'development' | 'production' | 'test';

    readonly DEV_API_BASE_URL: string;
    readonly TEST_API_BASE_URL: string;
    readonly PROD_API_BASE_URL: string;
  }
}