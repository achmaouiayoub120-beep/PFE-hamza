export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errors = {
  unauthorized: () =>
    new AppError(401, 'Unauthorized. Please log in first.', 'UNAUTHORIZED'),
  forbidden: () =>
    new AppError(403, 'You do not have permission to perform this action.', 'FORBIDDEN'),
  notFound: (resource: string) =>
    new AppError(404, `${resource} not found.`, 'NOT_FOUND'),
  badRequest: (message: string) =>
    new AppError(400, message, 'BAD_REQUEST'),
  conflict: (message: string) =>
    new AppError(409, message, 'CONFLICT'),
  serverError: (message: string = 'Internal server error') =>
    new AppError(500, message, 'SERVER_ERROR'),
  validationError: (message: string) =>
    new AppError(422, message, 'VALIDATION_ERROR'),
  rateLimitError: () =>
    new AppError(429, 'Too many requests. Please try again later.', 'RATE_LIMIT'),
};

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    // Handle Prisma errors
    if (error.message.includes('Unique constraint failed')) {
      return new AppError(409, 'This record already exists.', 'UNIQUE_VIOLATION');
    }
    if (error.message.includes('Foreign key constraint failed')) {
      return new AppError(400, 'Related record not found.', 'FK_VIOLATION');
    }
    return new AppError(500, error.message, 'INTERNAL_ERROR');
  }

  return new AppError(500, 'An unexpected error occurred.', 'UNKNOWN_ERROR');
}
