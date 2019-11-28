import Logger from 'bunyan';

declare global {
  namespace NodeJS {
    interface Global {
      logger: Logger;
    }
  }
}
