import App from "./app";
import envConfig from "./config/env.config";

const app = new App(5000);
console.log(envConfig.serverPort);

app.listen();
