import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { registerSchema } from '@/lib/validations';
import { hashPassword, createSession } from '@/lib/auth';
import { handleApiError, json } from '@/lib/api-helpers';
import { errors } from '@/lib/errors';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Parse and validate input with Zod
    const body = await request.json();
    const { name, email, password, studentId, major } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { studentId },
        ],
      },
    });

    if (existingUser) {
      throw errors.conflict(
        existingUser.email === email.toLowerCase()
          ? 'Email already registered'
          : 'Student ID already registered'
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        studentId,
        major,
        password: hashedPassword,
      },
    });

    // Auto-login after registration
    await createSession(user.id);

    return json({ success: true, userId: user.id, message: 'Account created successfully' }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
