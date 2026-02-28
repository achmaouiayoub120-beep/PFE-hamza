import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './auth';
import { AppError, handleError } from './errors';
import { ZodSchema } from 'zod';

export async function withAuth(req: NextRequest, handler: (session: any) => Promise<Response>) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return await handler(session);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function withValidation(
  req: NextRequest,
  schema: ZodSchema,
  handler: (data: any, req: NextRequest) => Promise<Response>
) {
  try {
    const body = await req.json();
    const parsed = schema.parse(body);
    return await handler(parsed, req);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function withAuthAndValidation(
  req: NextRequest,
  schema: ZodSchema,
  handler: (session: any, data: any, req: NextRequest) => Promise<Response>
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = schema.parse(body);
    return await handler(session, parsed, req);
  } catch (error) {
    return handleApiError(error);
  }
}

export function handleApiError(error: unknown): NextResponse {
  const appError = handleError(error);
  return NextResponse.json(
    {
      error: appError.message,
      code: appError.code,
    },
    { status: appError.statusCode }
  );
}

export function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}
