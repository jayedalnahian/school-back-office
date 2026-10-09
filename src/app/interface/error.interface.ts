export type TErrorSource = {
  path: string | number;
  message: string;
};

export type TErrorSources = TErrorSource[];

export type TErrorResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  errorSources: TErrorSources;
  stack?: string | null;
  error?: unknown;
};
