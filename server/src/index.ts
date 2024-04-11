import App from "./server";
import envConfig from "./config/env.config";

const serverPort = envConfig.serverPort;
const app = new App(serverPort);

app.listen();
