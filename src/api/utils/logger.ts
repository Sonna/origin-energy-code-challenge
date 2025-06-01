export const defaultLogger = () => ({
  info: console.info,
  error: console.error,
  warn: console.warn,
});

export const logger = defaultLogger();
