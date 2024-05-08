import envConfig from "./env.config";

export const corsOptionsConfig = {
    origin: `http://172.20.0.3:3000/${envConfig.clientPort}`,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
