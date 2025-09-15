// Logger component/service
const logger = {
  info: (message, data) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message, data) => {
    console.error(`[ERROR] ${message}`, data);
  },
  warn: (message, data) => {
    console.warn(`[WARN] ${message}`, data);
  }
};

export { logger };
export default logger;
