import express, { Application } from "express";
import cors from "cors";

class App {
  public expressApplication: Application;
  public serverPort: number;

  constructor(serverPort: number) {
    this.expressApplication = express();
    this.serverPort = serverPort;
    this.initializeMiddlewares();
  }

  private initializeDatabaseConnection(): void {
    console.log("Initialized db connection !");
  }

  private initializeMiddlewares(): void {
    this.expressApplication.use(express.json());
    this.expressApplication.use(cors());
  }

  public listen(): void {
    this.expressApplication.listen(this.serverPort, () => {
      this.initializeDatabaseConnection();
      console.log(`App listening on port ${this.serverPort}...`);
    });
  }
}

export default App;
