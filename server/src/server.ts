import express, { Application } from "express";
import { initializeMiddlewares } from "./middleware/server.middleware";
import { initializeRoutes } from "./routes/server.routes";
import { dbConnect } from "./database/dbConnect";
import Logger from "./lib/logger";

class App {
  public expressApplication: Application;
  public serverPort: string | undefined;

  constructor(serverPort: string | undefined) {
    this.expressApplication = express();
    this.serverPort = serverPort;
    initializeMiddlewares(this.expressApplication);
    initializeRoutes(this.expressApplication);
  }

  private async initializeDatabaseConnection(): Promise<void> {
    await dbConnect();
  }

  public async listen(): Promise<void> {
    try {
      await this.initializeDatabaseConnection();
      this.expressApplication.listen(this.serverPort, () => {
        Logger.http(`Server running on port ${this.serverPort}...`);
      });
    } catch (error) {
      Logger.error(`Error starting the server: ${error}`);
    }
  }
}

export default App;
