import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { loginSchema } from '@/lib/validations';
import { verifyPassword, createSession } from '@/lib/auth';
import { handleApiError, json } from '@/lib/api-helpers';
import { errors } from '@/lib/errors';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Parse and validate input with Zod
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Find user by email (case-insensitive)
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        password: true,
        isActive: true,
        name: true,
      },
    });

    if (!user) {
      // Don't reveal if email exists for security
      throw errors.badRequest('Invalid email or password');
    }

    if (!user.isActive) {
      throw errors.badRequest('This account has been deactivated');
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      throw errors.badRequest('Invalid email or password');
    }

    // Create session
    await createSession(user.id);

    return json({ success: true, userId: user.id, name: user.name });
  } catch (error) {
    return handleApiError(error);
  }
}
