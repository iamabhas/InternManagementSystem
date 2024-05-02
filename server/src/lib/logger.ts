import winston from "winston";
import {
  colorConstants,
  typeConstants,
  levelConstants as levels,
} from "../constants/loggerConstants";
import { nodeEnvironmentConstants } from "../constants/nodeEnvironmentConstants";

const { DEBUG, WARN } = typeConstants;
const { DEVELOPMENT } = nodeEnvironmentConstants;

const level = () => {
  const env = process.env.NODE_ENV || DEVELOPMENT;
  const isDevelopment = env === DEVELOPMENT;
  return isDevelopment ? DEBUG : WARN;
};

winston.addColors(colorConstants);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => ` ${info.level}: ${info.message}`)
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({ filename: "logs/all.log" }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
