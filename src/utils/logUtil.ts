import { Request, Response, NextFunction } from "express";
import config from "../config";
import bunyan from "bunyan";

export const getLogger = () => {
  return bunyan.createLogger({
    name: config.log.name,
    stream: process.stdout,
    level: config.log.level
  });
};

export default {
  getLogger
};
