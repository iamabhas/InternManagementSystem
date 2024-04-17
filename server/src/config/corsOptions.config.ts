import envConfig from "./env.config";

export const corsOptionsConfig = {
  origin: `http://localhost:5173/cl${envConfig.clientPort}`,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
