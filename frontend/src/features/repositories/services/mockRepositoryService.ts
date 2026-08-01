export const simulateManualSync = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

export const simulateSyncRetry = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
};
