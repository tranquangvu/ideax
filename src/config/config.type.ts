export type AppConfig = {
  env: {
    name: string;
    isDevelopment: boolean;
    isProduction: boolean;
    isTest: boolean;
  };
  port: number;
};

export type DatabaseConfig = {
  mongodbUri: string;
};

export type RootConfig = {
  app: AppConfig;
  database: DatabaseConfig;
};
