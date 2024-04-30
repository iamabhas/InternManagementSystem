import envConfig from "./env.config";

export const corsOptionsConfig = {
  origin: `http://localhost:${envConfig.clientPort}`,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
