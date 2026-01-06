// Simple centralized logger to keep console noise consistent.
export const logError = (context: string, error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(`[${context}]`, error);
};
